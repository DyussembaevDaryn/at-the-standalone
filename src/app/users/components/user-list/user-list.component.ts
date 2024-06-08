import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../interface/Users";
import {Observable} from "rxjs";


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    NgForOf,
    MatButton
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  public readonly users:Observable<User[]> = this.usersService.users$

  constructor(private usersService: UsersService,private dialog: MatDialog,) {
  }
  ngOnInit() {
    this.usersService.loadUsers()
  }

  deleteUsers(userId:number) {
    this.usersService.deleteUser(userId)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width:'30%',
      height:'90%',
      data: {
        title: "hello world",
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      this.usersService.addUser(result);
      }
    });
  }
  openEditUser(user:User) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '40%',
      height:'80%',
      data: {
        isEdit: true,
        user:user,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.usersService.updateUser(result);
      }
    })
  }

}
