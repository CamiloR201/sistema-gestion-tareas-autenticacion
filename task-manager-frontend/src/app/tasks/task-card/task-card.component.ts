import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '../../core/models/task.model';

@Component({
    selector: 'app-task-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
    @Input() task!: Task;
    @Output() onToggle = new EventEmitter<Task>();
    @Output() onEdit = new EventEmitter<Task>();
    @Output() onDelete = new EventEmitter<Task>();

    get statusLabel(): string {
        const map: Record<string, string> = {
            pending: 'Pendiente',
            in_progress: 'En progreso',
            completed: 'Completada',
        };
        return map[this.task.status] ?? this.task.status;
    }

    get priorityLabel(): string {
        const map: Record<string, string> = {
            low: 'Baja',
            medium: 'Media',
            high: 'Alta',
        };
        return map[this.task.priority] ?? this.task.priority;
    }

    get statusColor(): string {
        const map: Record<string, string> = {
            pending: 'status-pending',
            in_progress: 'status-progress',
            completed: 'status-done',
        };
        return map[this.task.status] ?? '';
    }

    get priorityColor(): string {
        const map: Record<string, string> = {
            low: 'priority-low',
            medium: 'priority-medium',
            high: 'priority-high',
        };
        return map[this.task.priority] ?? '';
    }
}
