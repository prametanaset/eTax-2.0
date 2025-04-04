<template>
  <div class="cli-output w-[100%]">
    <pre >{{ cliText }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cliText = ref('Loading...')

onMounted(async () => {
  try {
    const res = await fetch('/invoice.xml')
    const xmlText = await res.text()
    const parser = new DOMParser()
    const xml = parser.parseFromString(xmlText, 'application/xml')

    const ns = {
      rsm: 'urn:etda:uncefact:data:standard:TaxInvoice_CrossIndustryInvoice:2',
      ram: 'urn:etda:uncefact:data:standard:TaxInvoice_ReusableAggregateBusinessInformationEntity:2',
    }

    const $ = (xpath, ctx = xml) =>
      xml.evaluate(xpath, ctx, prefix => ns[prefix], XPathResult.STRING_TYPE, null).stringValue || '-'

    cliText.value = `
ใบกำกับภาษี: ${$('//ram:ID')}
ชื่อ: ${$('//ram:Name')}
ประเภท: ${$('//ram:TypeCode')}
วันที่ออกเอกสาร: ${$('//ram:IssueDateTime')}

ผู้ขาย:
  ชื่อ: ${$('//ram:SellerTradeParty/ram:Name')}
  เลขประจำตัวผู้เสียภาษี: ${$('//ram:SellerTradeParty/ram:SpecifiedTaxRegistration/ram:ID')}
  อีเมล: ${$('//ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID')}
  โทร: ${$('//ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber')}

ผู้ซื้อ:
  ชื่อ: ${$('//ram:BuyerTradeParty/ram:Name')}
  หมายเลขประจำตัวประชาชน/นิติบุคคล: ${$('//ram:BuyerTradeParty/ram:SpecifiedTaxRegistration/ram:ID')}

สินค้า:
  รายการที่ 1:
    ชื่อสินค้า: ${$('//ram:SpecifiedTradeProduct/ram:Name')}
    จำนวน: ${$('//ram:BilledQuantity')}
    ราคาต่อหน่วย: ${$('//ram:ChargeAmount')}
    ส่วนลด: ${$('//ram:SpecifiedTradeAllowanceCharge/ram:ActualAmount')}
    ราคารวมสุทธิ: ${$('//ram:NetLineTotalAmount')}
    ราคารวมภาษี: ${$('//ram:NetIncludingTaxesLineTotalAmount')}

สรุปยอดเงิน:
  มูลค่าก่อนภาษี: ${$('//ram:BasisAmount')}
  ภาษีมูลค่าเพิ่ม (${$('//ram:CalculatedRate')}%): ${$('//ram:CalculatedAmount')}
  มูลค่ารวมทั้งสิ้น: ${$('//ram:GrandTotalAmount')}
  สกุลเงิน: ${$('//ram:InvoiceCurrencyCode')}
`.trim()
  } catch (err) {
    cliText.value = '❌ Error loading or parsing XML:\n' + err.message
  }
})
</script>

<style scoped>
.cli-output {
  background-color: #000;
  color: #00ff00;
  padding: 20px;
  font-family: 'Courier New', monospace;
  border-radius: 8px;
  white-space: pre-wrap;
}
</style>
