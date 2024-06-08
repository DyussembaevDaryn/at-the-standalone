import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from "rxjs";
import {User} from "../interface/Users";
import {UsersApiService} from "./users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService{
  private usersSubject = new BehaviorSubject<User[]>([])
  public users$:Observable<User[]> = this.usersSubject.asObservable()
  constructor(private usersApiService: UsersApiService) { }




  loadUsers() {
    this.usersApiService.getUsers().subscribe(
      (data) => {
      this.usersSubject.next(data)
    }
    )
  };
  deleteUser(userId:number) {
    this.usersSubject.next(this.usersSubject.value.filter(user => user.id !== userId))
  }
  private getNextId(): number {
    const currentUsers = this.usersSubject.value;
    const maxId = currentUsers.reduce((max, user) => user.id > max ? user.id : max, 0);
    return maxId + 1;
  }
  addUser(user: User): void {
    const currentUsers = this.usersSubject.value;
    const newUser = { ...user, id: this.getNextId() }; // Присваиваем новый уникальный ID
    this.usersSubject.next([...currentUsers, newUser]);
  }
  updateUser(updatedUser: User): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user);
    this.usersSubject.next(updatedUsers);
  }
}
