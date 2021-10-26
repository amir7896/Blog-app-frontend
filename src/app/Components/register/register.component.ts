
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/UserAuth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form! : FormGroup;
  submitted =false;
  data: any;
  // For Displaying Message 
  message:any;
  messageClass:any
  constructor(private _authService: AuthService,
    private formBuilder : FormBuilder,
    private router: Router) { }


  creatForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
        this.validateUsername
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        this.validatePassword
      ])],
    });
  }
  ngOnInit(): void {
    this.creatForm();
  }

  // ==================================
  // Email Validate Function
  // ==================================
  validateEmail(controls:any){
    const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   if( regExp.test(controls.value)){
     return null
   }else{
     return { 'validateEmail' : true}
   }
  }

  // ==================================
  // Validate Username Function
  // ==================================
  validateUsername(controls:any){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if( regExp.test(controls.value)){
      return null
    }else{
      return { 'validateUsername' : true}
    }
  }
  // ==================================
  // Password Validate Function
  // ==================================
  validatePassword(controls:any){
    const regExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,15}$/);
    if( regExp.test(controls.value)){
      return null
    }else{
      return { 'validatePassword' : true}
    }
  }

  // Disable Form
  disableform(){
    this.form.controls['email'].disable()
    this.form.controls['username'].disable()
    this.form.controls['password'].disable() 
  }

  // Enable Form
  enableform(){
    this.form.controls['email'].enable()
    this.form.controls['username'].enable()
    this.form.controls['password'].enable() 
  }

  get f(){
    return this.form.controls;
  }

  
  registerUser(){
    this.disableform();
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this._authService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      console.log(this.data);
      if(!this.data.success){
        this.messageClass = 'alert alert-danger'
        this.message = this.data.message
        this.router.navigateByUrl('/register')
        this.enableform();
        
      }else{
        this.messageClass = 'alert alert-success'
        this.message = this.data.message
        setTimeout(() => {
          this.router.navigateByUrl('/')
        }, 2000)
        
      }
    })
  }

}
