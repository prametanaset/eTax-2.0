import { defineEventHandler, readBody, createError } from 'h3'
import ExcelJS from 'exceljs'

export default defineEventHandler(async (event) => {
  // อ่าน body เป็น array ของ Payment
  const payments = await readBody(event) as Array<{
    id: string
    amount: number
    status: 0 | 1 | 2 | 3
    email: string
    name: string
    date: string
  }>

  if (!Array.isArray(payments) || payments.length === 0) {
    throw createError({ statusCode: 400, message: 'No data to export' })
  }

  // Mapping status -> label
  const statusLabels: Record<number, string> = {
    0: 'ส่งแล้ว',
    1: 'รอดำเนินการ',
    2: 'ยกเลิก',
    3: 'รอตรวจสอบ',
  }

  // สร้าง workbook + worksheet
  const workbook  = new ExcelJS.Workbook()
  const sheet     = workbook.addWorksheet('Payments')

  // กำหนดคอลัมน์
  sheet.columns = [
    { header: 'เลขที่',      key: 'id',      width: 15 },
    { header: 'จำนวนเงิน',  key: 'amount',  width: 15 },
    { header: 'สถานะ',  key: 'status',  width: 20 },
    { header: 'อีเมล',   key: 'email',   width: 30 },
    { header: 'ชื่อลูกค้า',    key: 'name',    width: 25 },
    { header: 'วันที่สร้าง',    key: 'date',    width: 20 },
  ]

  // เติมข้อมูลลง row พร้อมแปลง status และ date
  payments.forEach((p) => {
    sheet.addRow({
      id:     p.id,
      amount: p.amount,
      status: statusLabels[p.status] || 'ไม่ทราบสถานะ',
      email:  p.email,
      name:   p.name,
      // แปลงเป็น string ตาม locale กรุงเทพฯ
      date:   new Date(p.date).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
    })
  })

  // (ออปชัน) ใส่ filter และตกแต่ง header + border
  sheet.autoFilter = 'A1:F1'
  sheet.eachRow((row, rowNumber) => {
  row.eachCell((cell) => {
    // กำหนดฟอนต์ให้ header row
    if (rowNumber === 1) {
      cell.font = {
        name:   'Arial',
        family: 2,
        size:   14,
        bold:   true,
      }
      cell.fill = {
        type:    'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F5B914' },
      }
    } else {
      // กำหนดฟอนต์ให้ data rows (ถ้าต้องการ)
      cell.font = {
        name:   'Arial',
        family: 2,
        size:   12,
      }
    }

    // ขอบทุกเซลล์
    cell.border = {
      top:    { style: 'thin' },
      left:   { style: 'thin' },
      bottom: { style: 'thin' },
      right:  { style: 'thin' },
    }
  })
  row.commit()
})

  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      if (rowNumber === 1) {
        cell.fill = {
          type:    'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F5B914' },
        }
      }
      cell.border = {
        top:    { style: 'thin' },
        left:   { style: 'thin' },
        bottom: { style: 'thin' },
        right:  { style: 'thin' },
      }
    })
    row.commit()
  })

  // ตั้ง header ให้เบราว์เซอร์ดาวน์โหลดไฟล์
  const res = event.node.res!
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="Payments.xlsx"'
  )

  // สตรีมไฟล์กลับ
  await workbook.xlsx.write(res)
  res.end()
})
