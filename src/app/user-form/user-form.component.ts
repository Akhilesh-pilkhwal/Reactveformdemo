import { Component, OnInit } from '@angular/core';
import { FormControl,FormArray, FormGroup, ControlValueAccessor, FormBuilder, Validators } from '@angular/forms';
import { Usermodel } from '../usermodel';
import {ApiserviceService} from '../apiservice.service'
import{ValidationServiceService} from '../services/validation-service.service'
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  testValue: Usermodel;
  constructor(private fb: FormBuilder ,private apiService:ApiserviceService) {
    }
  // value = {
  //   firstName: 'akhilesh',
  //   lastName: 'singh'
  // }
//   writeValues(ag: Usermodel) {
//    let xyz= this.apiService.get('https://reqres.in/api/users?page=2',this.callbackfunction);
//     this.userForm.setValue(ag);
//   }
// callbackfunction(obj:any){
//   console.log(obj['data']);
// }
  ngOnInit() {
    this.createForm();
    // this.testValue = {
    //   firstName: 'akhilesh',
    //   lastName: 'pilkhwal'
    // }
    // this.writeValues(this.testValue);
  }
  createForm(){
       this.userForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email:['',[Validators.required,ValidationServiceService.emailValidator]],
      language:['',Validators.required],
      password:['',[Validators.required,ValidationServiceService.passwordValidator]]
    })

  }
//function to be called on submit
saveUser(){
   let requestVM=this.userForm.value; 
   this.apiService.post('http://localhost:59395/api/users/saveUser',requestVM,this.saveUserSuccessfully);

}
saveUserSuccessfully(response){
  this.userForm.reset();
}
}
