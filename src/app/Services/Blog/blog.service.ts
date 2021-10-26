import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../UserAuth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  options:any;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
    ) { }

  // ===========================================
  // Authentication Headers For Authorized User
  // ===========================================
  // For The Admin Area or The Profile Page of The User
  createAuthenticatioHeaders(){
    this.authService.loadToken();
    this.options ={
       headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    }
  }
  // ======================
  // ADD New Blog
  // =====================
  AddBlog(data:any){
    this.createAuthenticatioHeaders();
    return this.httpClient.post<any>('http://localhost:3000/blogs/newblog', data, this.options)
  }

  GetAllBlogs(){
    this.createAuthenticatioHeaders();
    return this.httpClient.get('http://localhost:3000/blogs/allblogs', this.options)

  }
}
