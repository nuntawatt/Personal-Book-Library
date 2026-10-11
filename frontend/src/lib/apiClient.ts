import axios from 'axios';
import { tokenStorage } from './tokenStorage';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptor ตอนออกจะแนบ JWT Token ไปกับ Header ทุก Request อัตโนมัติ
apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor ตอนรับ ถ้าได้ 401 Token หมดอายุ/ไม่ถูกต้อง และไม่ใช่การยิง Login ให้ลบ Token แล้ว Redirect
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // ยกเว้น /login เพื่อไม่ให้เกิด Loop redirect ตอนกรอกรหัสผ่านผิด
        const isLoginRequest = error.config?.url?.includes('/login');
        if (error.response?.status === 401 && !isLoginRequest) {
            tokenStorage.clear();
            window.location.assign('/login?expired=1');
        }
        return Promise.reject(error);
    }
);

// แปลง error เป็นข้อความที่แสดงบนหน้าจอ
export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) return 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
        const message = error.response.data?.message;
        if (Array.isArray(message)) return message.join(', ');
        if (typeof message === 'string') return message;
    }
    return 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
}
