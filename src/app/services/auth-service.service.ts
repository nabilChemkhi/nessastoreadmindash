import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientRegistrationDto} from "../../models/client-registration.dto";

@Injectable({
  providedIn: 'root'
})

  export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  registerUser(registrationDto: ClientRegistrationDto): Observable<void> {
    const url = `${this.baseUrl}/register`
    console.log(url);
    return this.http.post<void>(url, registrationDto);
  }
}
