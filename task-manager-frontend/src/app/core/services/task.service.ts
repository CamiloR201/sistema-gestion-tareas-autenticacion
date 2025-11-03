import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    Task,
    CreateTaskPayload,
    UpdateTaskPayload,
    TaskFilters,
} from '../models/task.model';

const API_URL = 'http://localhost:3000/api/tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
    constructor(private http: HttpClient) { }

    getTasks(filters?: TaskFilters): Observable<Task[]> {
        let params = new HttpParams();
        if (filters?.status) params = params.set('status', filters.status);
        if (filters?.priority) params = params.set('priority', filters.priority);
        if (filters?.search) params = params.set('search', filters.search);

        return this.http
            .get<{ tasks: Task[] }>(API_URL, { params })
            .pipe(map((res) => res.tasks));
    }

    getTask(id: string): Observable<Task> {
        return this.http
            .get<{ task: Task }>(`${API_URL}/${id}`)
            .pipe(map((res) => res.task));
    }

    createTask(payload: CreateTaskPayload): Observable<Task> {
        return this.http
            .post<{ task: Task }>(API_URL, payload)
            .pipe(map((res) => res.task));
    }

    updateTask(id: string, payload: UpdateTaskPayload): Observable<Task> {
        return this.http
            .put<{ task: Task }>(`${API_URL}/${id}`, payload)
            .pipe(map((res) => res.task));
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${API_URL}/${id}`);
    }

    toggleTask(id: string): Observable<Task> {
        return this.http
            .patch<{ task: Task }>(`${API_URL}/${id}/toggle`, {})
            .pipe(map((res) => res.task));
    }
}
