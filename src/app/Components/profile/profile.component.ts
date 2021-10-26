import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/UserAuth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




 
  data:any

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(res => {
      this.data = res
      console.log('User Data', this.data)
      console.log(res);
    })
  }

  // getUser(){
  //   this.authService.getProfile().subscribe(res => {
  //     this.camps = res,
  //     this.user=res;
  //     console.log('Data of User Is ', this.data)
  //   })
  // }

}
