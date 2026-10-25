# แผนพัฒนาแบบ Sprint

- Sprint 1–3 (2–3 วัน): ทำ World 1 ให้สมบูรณ์ทั้ง UX, บทสนทนา, animation, audio และ playtest
- Sprint 4–7 (3–5 วัน): ✅ Core game ผ่านเกณฑ์ MVP: คลังโจทย์ครบ 100 ด่าน, World 1–2 รวม 10 ด่านและฉากจบ, โปรไฟล์ชาย/หญิงและชื่อกำหนดเอง, save/progress, รางวัล, accessibility, touch target ≥44px และ fresh-save playtest ตั้งแต่สร้างโปรไฟล์จนจบ World 2 บน desktop/mobile/iPad โดยได้ 10/10 ของวิเศษ 100 ผลึก 30/30 ดาวอย่างถูกต้อง · เก็บเสียงฉลอง ข้อความรางวัล และภาพเคลื่อนไหวเปลี่ยนฉากที่รองรับ reduced motion แล้ว · พร้อมประเมินขอบเขต Sprint 8 ก่อนเพิ่ม cloud save
- Sprint 8–10 (2–4 วัน): 🔄 ฐานระบบบันทึกพร้อมแล้วด้วย save schema v3, migration/repair, timestamp และ deterministic conflict merge ที่ไม่ทำให้ progress ถอยหลัง · เพิ่มมุมผู้ปกครองสำหรับสรุปการเรียนรู้และส่งออก/นำเข้าไฟล์สำรองเพื่อย้ายเครื่องแล้ว · ขั้นถัดไปกำหนด Firebase project/config แล้วจึงเชื่อม cloud save จริง
- Platform readiness: ✅ เพิ่ม PWA manifest, install metadata, ปุ่มติดตั้ง, คู่มือ Add to Home Screen สำหรับ iPhone/iPad, offline asset cache, สถานะออนไลน์/ออฟไลน์ และข้อความแจ้งอัปเดตเวอร์ชันใหม่แล้ว
- Sprint 11–14 (3–5 วัน): AR prototype และคอลเลกชันสัตว์สามมิติ

แต่ละ Sprint ต้องจบด้วยเกมที่เปิดได้ ไม่มี JavaScript error รองรับ 390×844 และ desktop และมี commit แยกชัดเจน
