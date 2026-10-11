import axios from 'axios';
import { tokenStorage } from './tokenStorage';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// ก่อนส่งทุก Request แนบ token ใน header อัตโนมัติ
apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

// ถ้า backend ตอบ 401 จะทำการลบ token แล้วพาไปหน้า login
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
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
