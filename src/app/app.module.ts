import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http'
import { AuthService } from './Services/UserAuth/auth.service';
import { BlogService } from './Services/Blog/blog.service';
// FlashMessages
import { FlashMessagesModule } from  'flash-messages-angular'
// Auth Guard
import { AuthGuard
 } from './Guards/auth.guard';
//  Not Auth Guard
import { NotAuthGuard } from './Guards/notauth.guard';
import { BlogComponent } from './Components/blog/blog.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    DashboardComponent,
    ProfileComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
