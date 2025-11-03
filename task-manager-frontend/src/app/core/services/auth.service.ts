import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    User,
} from '../models/user.model';

const TOKEN_KEY = 'tm_token';
const USER_KEY = 'tm_user';
const API_URL = 'http://localhost:3000/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _currentUser = signal<User | null>(this.loadUser());
    readonly currentUser = this._currentUser.asReadonly();

    constructor(private http: HttpClient, private router: Router) { }

    get isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    private loadUser(): User | null {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    }

    register(payload: RegisterPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${API_URL}/register`, payload).pipe(
            tap((res) => this.saveSession(res))
        );
    }

    login(payload: LoginPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${API_URL}/login`, payload).pipe(
            tap((res) => this.saveSession(res))
        );
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this._currentUser.set(null);
        this.router.navigate(['/login']);
    }

    private saveSession(res: AuthResponse): void {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        this._currentUser.set(res.user);
    }
}
