# ใช้ Node 22 แบบเล็ก (alpine)
FROM node:22-alpine

# เปิดใช้ pnpm (มากับ Node ผ่าน corepack)
RUN corepack enable

# โฟลเดอร์ทำงานใน container
WORKDIR /app

# คัดลอกเฉพาะไฟล์ dependency ก่อน
# ถ้า package ไม่เปลี่ยน Docker จะใช้ cache ไม่ต้องติดตั้งใหม่ทุกครั้ง
COPY package.json package-lock.json ./
RUN npm ci

# คัดลอกซอร์สโค้ดทั้งหมด แล้ว build TypeScript -> JavaScript (ไปที่ dist/)
COPY . .
RUN pnpm build

# พอร์ตที่ NestJS ฟังอยู่
EXPOSE 3001

# รัน server จากโค้ดที่ build แล้ว
CMD ["node", "dist/main.js"]