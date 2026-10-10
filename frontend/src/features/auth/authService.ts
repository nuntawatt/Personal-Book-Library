import { apiClient } from "../../lib/apiClient";

export const authService = {
    async login(username: string, password: string): Promise<string> {
        const { data } = await apiClient.post('/login', { username, password });
        return data.accessToken;
    }
};