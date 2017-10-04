import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import { FormBuilder,AbstractControl, ValidatorFn,FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import{ValidationService} from '../services/validation.service'
import {ApiService} from '../services/api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder ,
              private apiService:ApiService,
              private router: Router,
              private toastr: ToastrService) {
    }

  ngOnInit() {
    
    this.createForm();
   
  }
  createForm(){
       this.registerForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email:['',[Validators.required,ValidationService.emailValidator]],
      language:['',Validators.required],
      password:['',[Validators.required,ValidationService.passwordValidator]]
    })

  }
//function to be called on submit
saveUser(){
   let requestVM=this.registerForm.value; 
   this.apiService.post('/api/users',requestVM,this.saveUserSuccessfully.bind(this));

}
saveUserSuccessfully(response){
  this.toastr.success('Registered', 'Kindly login!');
  this.router.navigate(['/login']);
}

}
