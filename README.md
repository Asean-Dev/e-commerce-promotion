This is my assingmemts

## My name is Sahasawat Anuchitworakan

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Visit the website ==> [Click here](https://e-commerce-promotion.up.railway.app/)


# Questions

```
- T-Shirt 350 bath
- Hoodie 700 bath
- Watch 850 bath
- Wireless Earbuds 999 bath

  1.ในกรณีที่มีสินค้าในตะกร้าหลายชิ้น
  และมีการลดราคาตามลำดับดังนี้
  1.percentage discount 10%
  2.categories clothing 15%
  3.Seasonal Promotion 300 THB ให้ 40 THB

จะนับการหักราคา total price ของ percentage discount แบบใด

Scenario 1 คิดส่วนลด จากยอดรวมทั้งหมด
คิด percentage discount จาก total price แต่ไม่ได้แยกการหักจำนวน discount 10% มาจากของแต่ละชิ้น

- percentage discount 10% = 2,899*10% = 289.9
  และลดแบบ categories clothing 15% ( ใช้ราคาตั้งต้นของ clothing = 350 + 700 = 1,050 )
- categories clothing 15% = 157.5
  Total price = 2,899 - 289.9 - 157.5 = 2451.6
- Seasonal Promotion (Get 40 THB off for every 300 THB spent)
  วิธีคิด (ราคาทั่้งหมด/300) = X เเล้วจากนั้น X * 40 = ส่่วนลด
  (2,899 / 300 = 9.66) จะได้รับ ส่วนลด seasonal 9 * 40 = 360
  Total price = 2,899 - 289.9 - 157.5 - 360  = 2,091.6 THB ซึ่ง ลดไป 807.4 THB


Scenario 2  คิดส่วนลด แยกรายชิ้น
คิด percentage discount จาก total price แต่แยกการหักจำนวน discount 10% มาจากของแต่ละชิ้น คือ (T-Shirt*10%)+(Hoodie*10%)+(Watch*10%)+(Wireless Earbuds*10%)
- percentage discount 10% = ((350 + 700)*10%)+(850*10%)+(999*10%) = 289.9
และลดแบบ categories clothing 15% ( แต่เนื่องจากมีการหัก discount 10% มาจากของแต่ละชิ้น ทำให้ราคาตั้งต้นของ categories clothing ที่จะนำมาใช้คิดเพื่อลด 15% ต่อ
 คือ (350 + 700)-10% = 945
- categories clothing 945*15% = 141.75
 Total price = 2,899 - 289.9 - 141.75 = 2,467.35
- Seasonal Promotion (Get 40 THB off for every 300 THB spent)
วิธีคิด ( Total price หลังจากลดเเล้ว/300) = X เเล้วจากนั้น X * 40 = ส่่วนลด
(2,467.35 / 300 = 8.22) จะได้รับ ส่วนลด seasonal 8 * 40 = 320
 Total price 2,899 - 289.9 - 141.75 - 320 = 2,147.35 ซึ่ง ลดไป 751.65 THB
```

#### Scenario 1 ได้ส่วนลดมากกว่า เพราะคิด 10% ทีเดียวก่อน แล้วใช้ราคาเต็มของ clothing และยอดรวมสูงสุดสำหรับ seasonal

#### Scenario 2 ได้ส่วนลดน้อยกว่า เพราะคิดส่วนลดแยกรายชิ้นตามสัดส่วน ทำให้เมื่อมีส่วนลดหลายชั้น จะลดน้อยกว่า เพราะนำยอดหลังจากการลดขั้นก่อนหน้าแล้วมาคำนวนต่อใช้ในระบบที่ต้องการ“ลดแบบยุติธรรม” หรือไม่ให้ลดซ้อนแบบ over-discount จนเกินไป

###### สรุป Scenario 1 ได้ส่วนลดมากกว่า แต่ Scenario 2 ยุติธรรมและควบคุมต้นทุนดีกว่า

## ระบบที่ทำมาใน assignment เลือกใช้ Scenario 2 ในการคำนวน
