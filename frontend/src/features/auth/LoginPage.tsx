import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getErrorMessage } from '../../lib/apiClient';
import { tokenStorage } from '../../lib/tokenStorage';
import { authService } from './authService';

export function LoginPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    let notice: string | null = null;
    if (params.get('expired')) notice = 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง';
    else if (params.get('required')) notice = 'กรุณาเข้าสู่ระบบก่อนใช้งาน';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = await authService.login(username, password);
            tokenStorage.set(token);
            navigate('/', { replace: true });
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="container narrow">
        <form className="card" onSubmit={handleSubmit}>
            <h1>📚 คลังหนังสือ</h1>
            <p className="muted" style={{ textAlign: 'center', marginTop: -8 }}>เข้าสู่ระบบเพื่อจัดการหนังสือ</p>

            {notice && <p className="notice">{notice}</p>}

            <input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading || !username || !password}>
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
        </form>
    </div>
    );

}