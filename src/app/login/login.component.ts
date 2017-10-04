import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx'; 
import {HttpClient} from '@angular/common/http';
import { FormBuilder,AbstractControl, ValidatorFn,FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import{ValidationService} from '../services/validation.service'
import {ApiService} from '../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  results=[];
  filename1='';
  baseUrl='http://localhost:59395/UploadFile/'
    constructor(private formBuilder: FormBuilder,
                private http:HttpClient,
                private apiService:ApiService,
                private router: Router,
                private toastr: ToastrService) { }
  
    ngOnInit() {
      this.createForm();
    }
  
  
    private createForm() {
    this.loginForm = this.formBuilder.group({
        'email': ['', [Validators.required, ValidationService.emailValidator]],
         'password': ['', [Validators.required, ValidationService.passwordValidator]],
      });
    }
  
  
  //function to be called on submit
  saveUser(){
     let requestVM=this.loginForm.value; 
     this.apiService.post('/api/login',requestVM,this.saveUserSuccessfully.bind(this));
  
  }
  saveUserSuccessfully(response){
    if(response['token']!=null){
      localStorage.token=response['token'];
      this.toastr.success('Login sucessfull!', 'wellcome!');
      
      this.router.navigate(['/dasboard']);
    }
    else{

    }
  }
}
