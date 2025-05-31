<template>
  <div>
    <button
    @click="exportPayments"
    class="px-4 py-2 bg-green-600 text-white rounded"
  >
    Export Payments
  </button>

    <BaseExportExcelDialog></BaseExportExcelDialog>
  </div>

</template>

<script setup lang="ts">

export interface Payment {
  id: string;
  amount: number;
  status: 0 | 1 | 2 | 3;
  email: string;
  name: string;
  date: string;
}

const data: Payment[] = [
  {
    id: "INV-0001",
    amount: 321,
    status: 2,
    email: "suchintrakuulbuy@naakhphanthu-thnmphlkrang.or.th",
    name: "ปัตถพงษ์ ตระกูลไม้เรียง",
    date: "2025-05-19T20:42:00",
  },
  {
    id: "INV-0002",
    amount: 658,
    status: 0,
    email: "thnmphlkrangrathphngs@gmail.com",
    name: "ธมน ตั้งกุลงาม",
    date: "2025-05-20T03:12:00",
  },
  {
    id: "INV-0003",
    amount: 949,
    status: 1,
    email: "wthnadraksaa@namthiphy-paansuwrrn.in.th",
    name: "มณียา วะคีมัน",
    date: "2025-05-20T02:00:00",
  },
  {
    id: "INV-0004",
    amount: 417,
    status: 2,
    email: "ephchrmnii17@ymail.com",
    name: "สมนึก นวลฉวี",
    date: "2025-05-18T05:33:00",
  },
  {
    id: "INV-0005",
    amount: 733,
    status: 2,
    email: "sedchwaa@aenwphyaa-tanephaa.com",
    name: "จินต์จุฑา ทวีเดช",
    date: "2025-05-23T22:07:00",
  },
  {
    id: "INV-0006",
    amount: 980,
    status: 2,
    email: "nawamandrthitikul@yahoo.com",
    name: "รังสินี ยะผา",
    date: "2025-05-21T07:04:00",
  },
  {
    id: "INV-0007",
    amount: 482,
    status: 0,
    email: "chaachumkulpriiyaa@muulnithiaehymsiri.com",
    name: "สีหราช ดีตพันธุ์",
    date: "2025-05-18T03:27:00",
  },
  {
    id: "INV-0008",
    amount: 430,
    status: 1,
    email: "kumaarbuycchakrphanth@hcchkelkhaphanthuwiswkaar.co.th",
    name: "เทียมศักดิ์ ดวงทับทิม",
    date: "2025-05-21T19:58:00",
  },
  {
    id: "INV-0009",
    amount: 941,
    status: 0,
    email: "ethasnsuththi@bmcchdiskaprakaay.in.th",
    name: "เอกวิทย์ เตมิยะเดช",
    date: "2025-05-23T15:48:00",
  },
  {
    id: "INV-0010",
    amount: 101,
    status: 0,
    email: "ssiyaa26@thhaaraethkrup.com",
    name: "ณิชาภัทร วิลาสินี",
    date: "2025-05-22T22:50:00",
  },
  {
    id: "INV-0011",
    amount: 135,
    status: 0,
    email: "chaayaesngchayyaanunaay@haanghunswncchamkad.com",
    name: "รอกีเย๊าะ โพธิสัตย์",
    date: "2025-05-18T10:53:00",
  },
  {
    id: "INV-0012",
    amount: 206,
    status: 1,
    email: "piynuchnumkan@yahoo.com",
    name: "เกศรา นามขำ",
    date: "2025-05-22T18:18:00",
  },
  {
    id: "INV-0013",
    amount: 292,
    status: 0,
    email: "aychisthaa28@thumabutraelathngsinthu.co",
    name: "ธนวันต์ ธรรมทินนา",
    date: "2025-05-23T14:22:00",
  },
  {
    id: "INV-0014",
    amount: 881,
    status: 0,
    email: "niymechiiymecchtphinisth@protonmail.com",
    name: "บุญญามี ไทยสุชาต",
    date: "2025-05-20T23:58:00",
  },
  {
    id: "INV-0015",
    amount: 923,
    status: 0,
    email: "cthnadaawuth@hotmail.com",
    name: "เกษรา จันอ้น",
    date: "2025-05-20T09:05:00",
  },
  {
    id: "INV-0016",
    amount: 346,
    status: 1,
    email: "ssiyaanilwrrn@haanghunswncchamkad.in.th",
    name: "เอกชัย นครเทพ",
    date: "2025-05-19T06:10:00",
  },
  {
    id: "INV-0017",
    amount: 466,
    status: 2,
    email: "qophthisaty@brisath.net.th",
    name: "ทับทิม ซูสารอ",
    date: "2025-05-22T23:27:00",
  },
  {
    id: "INV-0018",
    amount: 846,
    status: 1,
    email: "siththayyaphaa@icloud.com",
    name: "ภควัฒน์ อุลหัสสา",
    date: "2025-05-19T12:29:00",
  },
  {
    id: "INV-0019",
    amount: 166,
    status: 1,
    email: "ecchtphinisth36@brisath.in.th",
    name: "กิ่งแก้ว ขอหมั่นกลาง",
    date: "2025-05-19T01:15:00",
  },
  {
    id: "INV-0020",
    amount: 451,
    status: 1,
    email: "siththaydisdain@kon.in.th",
    name: "นราวรรณ ทรงโกมล",
    date: "2025-05-18T13:25:00",
  },
  {
    id: "INV-0021",
    amount: 570,
    status: 0,
    email: "cthrrmsthitaiphsaal@smaakhmaithaichoy.go.th",
    name: "คมสัน ตันเผ่า",
    date: "2025-05-22T00:31:00",
  },
  {
    id: "INV-0022",
    amount: 257,
    status: 2,
    email: "piynuch92@bcchksaastrsilpencchieniiyring.in.th",
    name: "พงษ์นเรศ ตะละภัฏ",
    date: "2025-05-22T22:29:00",
  },
  {
    id: "INV-0023",
    amount: 294,
    status: 0,
    email: "ekrikphl31@brisath.go.th",
    name: "สมหมาย นามขำ",
    date: "2025-05-20T02:12:00",
  },
  {
    id: "INV-0024",
    amount: 433,
    status: 1,
    email: "nirandrthuwanuti@yahoo.com",
    name: "พัชรีนิษฐ์ แท่นทอง",
    date: "2025-05-21T12:37:00",
  },
  {
    id: "INV-0025",
    amount: 730,
    status: 1,
    email: "ynngkhraaythnprathiip@ymail.com",
    name: "กิติวัฒน์ ไทยแท้",
    date: "2025-05-20T13:44:00",
  },
  {
    id: "INV-0026",
    amount: 472,
    status: 0,
    email: "aariiy12@smaakhmophthisaty.in.th",
    name: "ยุลิน ไทนิยม",
    date: "2025-05-19T18:45:00",
  },
  {
    id: "INV-0027",
    amount: 224,
    status: 1,
    email: "hlakthraphy56@naamkhamechrwis.co.th",
    name: "โสภณ พรมอ่อน",
    date: "2025-05-21T04:51:00",
  },
  {
    id: "INV-0028",
    amount: 977,
    status: 2,
    email: "akhrphnth64@kon.in.th",
    name: "ไมล์ ไม้แดง",
    date: "2025-05-18T03:16:00",
  },
  {
    id: "INV-0029",
    amount: 183,
    status: 0,
    email: "rkiieyaaanilsuwrrn@ymail.com",
    name: "อนุวัช ดำริห์ชอบ",
    date: "2025-05-23T01:39:00",
  },
  {
    id: "INV-0030",
    amount: 786,
    status: 1,
    email: "chadchaa11@hcchkngaamphiechsth.or.th",
    name: "ทานตะวัน ถิรสวัสดิ์",
    date: "2025-05-22T13:59:00",
  },
  {
    id: "INV-0031",
    amount: 641,
    status: 0,
    email: "ekhiiywnethiiymsakdi@protonmail.com",
    name: "โอภาส เลิศกิ่ง",
    date: "2025-05-19T02:08:00",
  },
  {
    id: "INV-0032",
    amount: 672,
    status: 2,
    email: "sirnath27@ymail.com",
    name: "ธีร์ธวันาย ศรีเผด็จ",
    date: "2025-05-23T06:05:00",
  },
  {
    id: "INV-0033",
    amount: 509,
    status: 0,
    email: "vetmiyaedch@kon.in.th",
    name: "สุรการณ์ ตะละภัฏ",
    date: "2025-05-18T09:55:00",
  },
  {
    id: "INV-0034",
    amount: 844,
    status: 0,
    email: "nnaakknk@outlook.com",
    name: "หลักทรัพย์ เณรานุสนธิ์",
    date: "2025-05-23T21:32:00",
  },
  {
    id: "INV-0035",
    amount: 859,
    status: 0,
    email: "siththichayaithniym@ymail.com",
    name: "อธิวัตร งามพิเชษฐ์",
    date: "2025-05-23T03:56:00",
  },
  {
    id: "INV-0036",
    amount: 193,
    status: 1,
    email: "helkhaphanthu@brisath.com",
    name: "นราวรรณ นากกนก",
    date: "2025-05-22T03:51:00",
  },
  {
    id: "INV-0037",
    amount: 818,
    status: 1,
    email: "iaethmthn@ymail.com",
    name: "ภัคชัญญา เขียวอ่อน",
    date: "2025-05-23T04:39:00",
  },
  {
    id: "INV-0038",
    amount: 423,
    status: 1,
    email: "cchuthaaratn91@hcchkthumabutr.com",
    name: "เกศรา ถนัดรักษา",
    date: "2025-05-21T18:18:00",
  },
  {
    id: "INV-0039",
    amount: 116,
    status: 2,
    email: "jthiiwr@brisath.com",
    name: "พรชนก ศรทอง",
    date: "2025-05-20T18:49:00",
  },
  {
    id: "INV-0040",
    amount: 975,
    status: 0,
    email: "hrthayhiraysaalii@protonmail.com",
    name: "จันทภา บุญศล",
    date: "2025-05-18T21:50:00",
  },
  {
    id: "INV-0041",
    amount: 435,
    status: 1,
    email: "prayuththchuusaar@brisath.in.th",
    name: "วรปรัชญ์ เมืองสุข",
    date: "2025-05-19T10:31:00",
  },
  {
    id: "INV-0042",
    amount: 931,
    status: 1,
    email: "nuwachphrmn@hcchkthnadrbechrwis.com",
    name: "วีระโชติ พงศ์ฉบับนภา",
    date: "2025-05-21T08:58:00",
  },
  {
    id: "INV-0043",
    amount: 606,
    status: 1,
    email: "thaawrawrnnichaaphathr@outlook.com",
    name: "สิริ ไทไชโย",
    date: "2025-05-22T08:19:00",
  },
  {
    id: "INV-0044",
    amount: 979,
    status: 2,
    email: "rthrrmniym@kon.in.th",
    name: "สิทธัญ ตวันเยี่ยม",
    date: "2025-05-20T22:40:00",
  },
  {
    id: "INV-0045",
    amount: 821,
    status: 2,
    email: "thngsiiaiphlyulin@gmail.com",
    name: "พิมพ์สุดา พงศ์ฉบับนภา",
    date: "2025-05-23T11:47:00",
  },
  {
    id: "INV-0046",
    amount: 156,
    status: 2,
    email: "thiphywaariiecchriyramy@ymail.com",
    name: "สมเกียรติ ศรีวงค์",
    date: "2025-05-21T22:11:00",
  },
  {
    id: "INV-0047",
    amount: 415,
    status: 1,
    email: "nabenuuengnaiml@hcchktraachuuimprtekchprt.com",
    name: "เมษา ชำนาญวาด",
    date: "2025-05-20T17:13:00",
  },
  {
    id: "INV-0048",
    amount: 870,
    status: 0,
    email: "aisykicchnathwrinthr@haanghunswncchamkad.com",
    name: "นัสรุน ติระคมน์",
    date: "2025-05-18T11:52:00",
  },
  {
    id: "INV-0049",
    amount: 356,
    status: 0,
    email: "rkiieyaaa42@protonmail.com",
    name: "พิชาภพ ยางสวย",
    date: "2025-05-23T20:37:00",
  },
  {
    id: "INV-0050",
    amount: 186,
    status: 0,
    email: "thuuphmsrrephchy@brisath.com",
    name: "อาฮามัด พรรษาสกุล",
    date: "2025-05-20T00:51:00",
  },
];
async function exportPayments() {
  try {
    const res = await fetch('/api/export', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'Payments.xlsx'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Export failed', err)
  }
}
</script>
