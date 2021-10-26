import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/UserAuth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any;
  constructor(public authService: AuthService,
    private router: Router,
    private flashmessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(res => {
      this.user = res;
    })
  }
  loguotUser(){
    this.authService.logout();
    this.flashmessagesService.show('You Are Logout Succssfully', {cssClass: 'alert-info'})
    this.router.navigateByUrl('/');
    
    
  }

}
