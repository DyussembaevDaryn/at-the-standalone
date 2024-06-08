import {Component, Input, Output,EventEmitter} from '@angular/core';
import {User} from "../../interface/Users";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input({required:true}) user!: User;
  @Output() userDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<User>();
  constructor() {
  }
  deleteUser():void {
    this.userDeleted.emit(this.user.id);
  }
  editUser() {
    this.edit.emit(this.user)
  }
 }
