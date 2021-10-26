import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/UserAuth/auth.service';
import { AuthGuard } from 'src/app/Guards/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form! : FormGroup;
  submitted =false;
  data: any;
  // Redirect To Same Page In Which User Want To Go Without Login
  previousUrl:any;

    // For Displaying Message 
    message:any;
    messageClass:any
  
  constructor(private authService: AuthService,
    private router : Router,
    private formBuilder: FormBuilder, 
    private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.creatForm();
    // Redirect To The Url
    if(this.authGuard.redirectUrl){
      this.messageClass = 'alert alert-danger'
      this.message = 'You Must Be Login To View That Page!'
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined
    }
  }
  creatForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f(){
    return this.form.controls;
  }

  loginUser(){
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
    this.authService.loginUser(this.form.value).subscribe(res => {
      this.data = res
      console.log(this.data);
      if(!this.data.success){
        this.messageClass = 'alert alert-danger'
        this.message = this.data.message
      }else{
        this.messageClass = 'alert alert-success'
        this.message = this.data.message
        this.authService.storeUserData(this.data.token, this.data.user);
        setTimeout(() => {
         if(this.previousUrl){
           this.router.navigate([this.previousUrl])
         }else{
           this.router.navigate(['/dashboard'])
         }
        }, 3000)
      }
    
    })
  }

}
