import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl,FormArray, FormGroup, ControlValueAccessor, FormBuilder, Validators } from '@angular/forms';
import { Usermodel } from '../usermodel';
import {ApiserviceService} from '../apiservice.service'
import{ValidationServiceService} from '../services/validation-service.service'
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  editForm: FormGroup;
  testValue: Usermodel;
  constructor(private fb: FormBuilder ,
              private apiService:ApiserviceService,
              private route: ActivatedRoute,
              private router: Router,) {
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
  userID;
  ngOnInit() {
    this.createForm();
     this.userID = this.route.snapshot.paramMap.get('id');
     console.log(this.userID);
     this.getUserById(this.userID);
    // this.testValue = {
    //   firstName: 'akhilesh',
    //   lastName: 'pilkhwal'
    // }
    // this.writeValues(this.testValue);
  }
  createForm(){
       this.editForm = this.fb.group({
      ID:[],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email:['',[Validators.required,ValidationServiceService.emailValidator]],
      language:['',Validators.required],
      password:['',[Validators.required,ValidationServiceService.passwordValidator]]
    })

  }
//get user by id 
getUserById(id){
  this.apiService.post('http://localhost:59395/api/users/getUserById?id='+id,null,this.getUserSuccessfully.bind(this));

}
getUserSuccessfully(response){
  this.editForm.setValue(response);
}
//function to be called on submit
saveUser(){
   let requestVM=this.editForm.value; 
   this.apiService.post('http://localhost:59395/api/users/editUser?id='+this.userID ,requestVM,this.saveUserSuccessfully.bind(this));

}
saveUserSuccessfully(response){
  console.log(response);
  this.router.navigate(['/userlisting']);
  //this.userForm.reset();
}
}
