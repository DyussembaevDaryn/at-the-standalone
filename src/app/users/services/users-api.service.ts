import {Inject, Injectable, InjectionToken} from '@angular/core';
import {API_URL} from "../../../injectionTokens/injectionTokens";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interface/Users";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  constructor(private http: HttpClient,@Inject(API_URL) private apiUrl: string) { }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }
}
