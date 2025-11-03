import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task, TaskFilters, TaskStatus } from '../../core/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule,
        MatChipsModule,
        TaskCardComponent,
    ],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    tasks = signal<Task[]>([]);
    loading = signal(false);
    searchQuery = '';
    activeFilter: TaskStatus | '' = '';

    readonly filterTabs = [
        { label: 'Todas', value: '' },
        { label: 'Pendientes', value: 'pending' },
        { label: 'En progreso', value: 'in_progress' },
        { label: 'Completadas', value: 'completed' },
    ];

    constructor(
        private taskService: TaskService,
        public auth: AuthService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loading.set(true);
        const filters: TaskFilters = {};
        if (this.activeFilter) filters.status = this.activeFilter as TaskStatus;
        if (this.searchQuery.trim()) filters.search = this.searchQuery.trim();

        this.taskService.getTasks(filters).subscribe({
            next: (tasks) => {
                this.tasks.set(tasks);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.snackBar.open('Error al cargar las tareas', 'Cerrar', { duration: 3000 });
            },
        });
    }

    onFilterChange(value: string): void {
        this.activeFilter = value as TaskStatus | '';
        this.loadTasks();
    }

    onSearch(): void {
        this.loadTasks();
    }

    openCreateDialog(): void {
        const ref = this.dialog.open(TaskFormComponent, {
            width: '560px',
            maxWidth: '95vw',
            panelClass: 'task-dialog',
        });
        ref.afterClosed().subscribe((created) => {
            if (created) {
                this.loadTasks();
                this.snackBar.open('Tarea creada ✅', 'Cerrar', { duration: 2500 });
            }
        });
    }

    openEditDialog(task: Task): void {
        const ref = this.dialog.open(TaskFormComponent, {
            width: '560px',
            maxWidth: '95vw',
            panelClass: 'task-dialog',
            data: { task },
        });
        ref.afterClosed().subscribe((updated) => {
            if (updated) {
                this.loadTasks();
                this.snackBar.open('Tarea actualizada ✅', 'Cerrar', { duration: 2500 });
            }
        });
    }

    onToggle(task: Task): void {
        this.taskService.toggleTask(task.id).subscribe({
            next: () => this.loadTasks(),
            error: () => this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 }),
        });
    }

    onDelete(task: Task): void {
        this.taskService.deleteTask(task.id).subscribe({
            next: () => {
                this.loadTasks();
                this.snackBar.open('Tarea eliminada', 'Cerrar', { duration: 2500 });
            },
            error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 }),
        });
    }

    logout(): void {
        this.auth.logout();
    }

    get pendingCount(): number {
        return this.tasks().filter((t) => t.status === 'pending').length;
    }

    get completedCount(): number {
        return this.tasks().filter((t) => t.status === 'completed').length;
    }

    trackById(index: number, task: Task): string {
        return task.id;
    }
}
