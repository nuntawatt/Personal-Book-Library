# ใช้ Node image เดียว ไม่ต้องแยก stage
FROM node:22-alpine

# เปิดใช้ pnpm
RUN corepack enable

WORKDIR /app

# คัดลอกเฉพาะไฟล์ dependency ก่อน เพื่อให้ Docker cache ชั้นนี้ไว้
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# คัดลอกซอร์สโค้ดทั้งหมด
COPY . .

EXPOSE 5173

# host จำเป็น ไม่งั้น Vite ฟังแค่ใน container แล้วเปิดจากเครื่องเราไม่ได้
CMD ["npx", "vite", "--host", "0.0.0.0"]