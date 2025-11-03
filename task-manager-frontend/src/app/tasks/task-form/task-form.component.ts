import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    isEdit: boolean;

    statusOptions = [
        { value: 'pending', label: 'Pendiente' },
        { value: 'in_progress', label: 'En progreso' },
        { value: 'completed', label: 'Completada' },
    ];

    priorityOptions = [
        { value: 'low', label: 'Baja' },
        { value: 'medium', label: 'Media' },
        { value: 'high', label: 'Alta' },
    ];

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private dialogRef: MatDialogRef<TaskFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { task?: Task } | null
    ) {
        this.isEdit = !!data?.task;
    }

    ngOnInit(): void {
        const task = this.data?.task;
        this.form = this.fb.group({
            title: [task?.title ?? '', [Validators.required, Validators.minLength(3)]],
            description: [task?.description ?? ''],
            status: [task?.status ?? 'pending', Validators.required],
            priority: [task?.priority ?? 'medium', Validators.required],
            dueDate: [task?.dueDate ? new Date(task.dueDate) : null],
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;
        this.loading = true;

        const payload = {
            ...this.form.value,
            dueDate: this.form.value.dueDate
                ? new Date(this.form.value.dueDate).toISOString().split('T')[0]
                : null,
        };

        const obs = this.isEdit
            ? this.taskService.updateTask(this.data!.task!.id, payload)
            : this.taskService.createTask(payload);

        obs.subscribe({
            next: () => this.dialogRef.close(true),
            error: () => {
                this.loading = false;
            },
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
