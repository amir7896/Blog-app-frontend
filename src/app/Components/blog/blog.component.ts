import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validator, Validators } from '@angular/forms';

// Services
import { AuthService } from 'src/app/Services/UserAuth/auth.service';
import { BlogService } from 'src/app/Services/Blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  // Logic For Display The Messages
  messageClass:any;
  message:any;
  // Logic To Show HIde Post And Refreshing The Posts
  newPost:boolean=false;
  loadingBlogs:boolean=false
  // Form
  form:any;
  submitted =false;
  // Username
  username:any
  // added data
  data:any
  // Processing
  processing:boolean =false
  // All Blogs
  Allblogs :any;
  User:any
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
    ) { 
      this.creatForm();
    }
    // ====================
    // Create BlogForm
    // =====================
    creatForm(){
      this.form = this.formBuilder.group({
        title: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          this.alpahNumericValidation
        ])],
        body: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300)
        ])],
      })
    }
    get f(){
      return this.form.controls;
    }
    // ============================
    //Validation for the title
    // =============================
    alpahNumericValidation(controls:any){
      const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
      if(regExp.test(controls.value)){
        return null
      }else{
        return { 'alpahNumericValidation' :true}
      }
    }
    // ===============================
    // Validation For Body
    // ===============================

  // ================================
  // Enable And Disable Post Button
  // ================================
  blogPost(){
    this.newPost = true
  }

  // =================
  // Refreshing Post
  // =================
  reloadBlogs(){
    this.loadingBlogs = true
    // Get All Blogs
    this.getBlogs();
    setTimeout(() => {
      this.loadingBlogs = false
    }, 4000)
  }
  // ==================
  // Add Comment
  // =================
  dragtComment(){

  }
  // Go Back Function
  goBack(){
    window.location.reload();
  }
  ngOnInit(): void {
    this.authService.getProfile().subscribe(res => {
      this.username = res
      console.log(this.username.User.username)
      // Getting Blogs
      this.getBlogs();
    })
  }

  // ===============================
  // Add New Blog To The Data Base
  // ===============================
  onBlogSubmit(){
    this.processing = true
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    // console.log(this.form.value)
    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username.User.username
    }
    this.blogService.AddBlog(blog).subscribe(res => {
      this.data =res;
      console.log('Form Values Are',this.form.value)
      if(!this.data.success){
        this.messageClass = 'alert alert-danger',
        this.message = this.data.message
      }else{
        this.messageClass = 'alert alert-success',
        this.message      = this.data.message
        setTimeout(() => {
          this.newPost =false,
          this.messageClass =false,
          this.form.reset();
        }, 3000)
      }
    })
  }

  // ==================
  // Get All Blogs
  // ==================
  getBlogs(){
  return this.blogService.GetAllBlogs().subscribe(res => {
    this.Allblogs = res;
    console.log(this.Allblogs);
  })
}
}
