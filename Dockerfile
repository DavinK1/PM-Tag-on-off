# ใช้ Node.js image
FROM node:22

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดในโปรเจกต์
COPY . .

# กำหนดพอร์ตที่จะเปิดใช้งาน
EXPOSE 3000

# เพิ่ม environment variable เพื่อเปิดการใช้ polling
ENV CHOKIDAR_USEPOLLING=true

# คำสั่งที่จะรันแอปในโหมดการพัฒนา
CMD ["npm", "start"]