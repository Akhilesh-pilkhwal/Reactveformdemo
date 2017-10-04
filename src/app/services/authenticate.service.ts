import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router'
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthenticateService implements CanActivate {

  constructor(private router:Router,
              private toastr: ToastrService ) {
    
  }
  canActivate() {
    if (localStorage['token']!=null) { 
      return true;
    } else {
      this.toastr.success('Login First!', 'wellcome!');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
