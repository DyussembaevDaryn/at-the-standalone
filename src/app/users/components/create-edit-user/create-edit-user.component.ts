import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    FormsModule,
    MatDialogClose,
    MatInput,
    MatButton,
    MatDialogTitle,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent {
  userForm!: FormGroup;
  isEdit!: boolean;
  constructor(public dialogRef: MatDialogRef<CreateEditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb :FormBuilder,) {
    this.isEdit = data.isEdit;
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username:['',Validators.required],
      phone:['',Validators.required]
    })

    if (this.isEdit && data.user) {
      this.userForm.patchValue(data.user);
    }
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (!this.isEdit) {
        delete user.id; // Удаляем id, если это создание нового пользователя
      }
      this.dialogRef.close(user);
    }
  }

}
