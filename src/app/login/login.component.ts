import { Component, OnInit } from '@angular/core';
import { FormBuilder,AbstractControl, ValidatorFn,FormGroup, FormControl, Validators } from '@angular/forms';
//import { patternValidator } from 'app/shared/pattern-validator';
import { Http, RequestOptions, Headers, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Rx'; 
import{ValidationServiceService} from '../services/validation-service.service'
import {ApiserviceService} from '../apiservice.service'
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userForm: FormGroup;
filename1='';
baseUrl='http://localhost:59395/UploadFile/'
  constructor(private formBuilder: FormBuilder,
              private http: Http,private ht:HttpClient,
              private apiService:ApiserviceService) { }

  ngOnInit() {
     this.createForm();
  }


  private createForm() {
  this.userForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationServiceService.emailValidator]],
       'password': ['', [Validators.required, ValidationServiceService.passwordValidator]],
    });
  }

 results=[];
//file upload event  
fileChange(event) {  
let fileList: FileList = event.target.files;  
if (fileList.length > 0) {  
let file: File = fileList[0];  
let formData: FormData = new FormData();  
formData.append('uploadFile', file, file.name);  
//let headers = new Headers()  
//let options = new RequestOptions({ headers: headers });  
// let apiUrl1 = "http://localhost:59395/api/users/uploadFile";  
// this.http.post(apiUrl1, formData, options)  
// .map(res => res.json())  
// .catch(error => Observable.throw(error))  
// .subscribe(  
// data => console.log('success'),  
// error => console.log(error)  
// )  
// }  
  this.ht.post('http://localhost:59395/api/users/uploadFile',formData).subscribe(data => {
      // Read the result field from the JSON response.
      this.filename1 = this.baseUrl+data['filename'];
    });
}}

//function to be called on submit
saveUser(){
   let requestVM=this.userForm.value; 
   this.apiService.post('http://localhost:59395/api/users/authenticatedUser',requestVM,this.saveUserSuccessfully);

}
saveUserSuccessfully(response){
  console.log(response);
  this.userForm.reset();
}

}
