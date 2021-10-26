import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { CanActivate, Router , RouterStateSnapshot,ActivatedRouteSnapshot} from "@angular/router";
import { AuthService } from "../Services/UserAuth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    redirectUrl:any;
    constructor(private authService: AuthService,
        private router:Router){}

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ){
        if(this.authService.loggedIn()){
            return true
        }else{
            this.redirectUrl = state.url;
            this.router.navigate(['/login'])
            return false
            
        }
    }
}