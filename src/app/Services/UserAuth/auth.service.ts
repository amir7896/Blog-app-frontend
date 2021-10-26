import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authToken: any;
  user:any;
  options:any;

  constructor(private httpClient: HttpClient) { }

  // ===========================================
  // Authentication Headers For Authorized User
  // ===========================================
  // For The Admin Area or The Profile Page of The User
  createAuthenticatioHeaders(){
    this.loadToken();
    this.options = {
       headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Accept': 'application/json',
        'authorization': this.authToken
      })
    }
  }

  // ===================================
  // Grabing The Token From The Browser
  // ==================================
  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
  // =====================
  // Register New User
  // =====================
  registerUser(data:any){
    return this.httpClient.post<any>('http://localhost:3000/register', data)
  }
  // ====================
  // Login User
  // ====================
  loginUser(data:any){
    return this.httpClient.post<any>('http://localhost:3000/login', data)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  // ========================
  // Logout User
  // ========================
  logout(){
    this.authToken = null
    this.user =null
    localStorage.clear()
  }
  // ========================
  // Storing Login User Data
  // ========================
  storeUserData(token:any, user:any){
    localStorage.setItem('token',token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user      =user;
  }

  // ==========================
  // Get Current User Profile
  // ==========================
  getProfile(){
    this.createAuthenticatioHeaders();
    return this.httpClient.get('http://localhost:3000/profile', this.options)
  }
}
