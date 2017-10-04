import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder,AbstractControl, ValidatorFn,FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service'
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  results;
  editForm: FormGroup;
  profilepic='';
  userID = this.route.snapshot.paramMap.get('id');
  constructor(private apiservice: ApiService,
            private route: ActivatedRoute,
            private router: Router,
            private fb: FormBuilder,
            private toastr: ToastrService 
  ) { }

  ngOnInit() {
    this.getUser();
    this.createForm();
  
  }

    createForm(){
      this.editForm = this.fb.group({
        id:'',
        avatar:'',
        first_name: ['',Validators.required],
        last_name: ['',Validators.required],
     })
  }




  getUser() {
    let id=this.userID;
    this.apiservice.get('/api/users/'+id, this.getUserSuccessfully.bind(this));

  }
  getUserSuccessfully(response) {
    //var abc=this.results;
    this.results = response['data'];
    this.profilepic=this.results.avatar;
    this.editForm.setValue(this.results);
  }


  //save user
  editUser(){
    let id=this.userID;
    let requestVm=this.editForm.value
    this.apiservice.post('/api/users/'+id,requestVm, this.editUserSuccessfully.bind(this));
  }

  editUserSuccessfully(response){
    this.toastr.success('User Edited', 'successful!');
    this.router.navigate(['/dasboard']);
  }
}
