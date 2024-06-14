import { ITask } from '../types/types';
import { config } from './config';

type TConfigApi = {
    baseUrl: string;
    headers: HeadersInit;
};

type TCreateTaskDto = Omit<ITask, 'id'>;

export class Api {
    private baseUrl;
    private headers;

    constructor({ baseUrl, headers }: TConfigApi) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    private async onResponse<T>(res: Response): Promise<T> {
        return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
    }

    private async request<T>(endpoint: string, options?: RequestInit) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            ...options,
            headers: { ...this.headers, ...options?.headers },
        });

        return this.onResponse<T>(res);
    }

    async getTasks(): Promise<ITask[]> {
        return this.request<ITask[]>('/tasks');
    }

    async updateTask(id: string, body: Partial<ITask>): Promise<ITask> {
        return this.request<ITask>(`/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }

    async createTask(body: TCreateTaskDto): Promise<ITask> {
        return this.request<ITask>('/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }

    async removeTask(id: string): Promise<boolean> {
        return this.request<boolean>(`/tasks/${id}`, {
            method: 'DELETE',
        });
    }
}

const api = new Api({
    baseUrl: config.apiUrl,
    headers: {},
});

export default api;
