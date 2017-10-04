import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import{ValidationService} from '../services/validation.service'
import {ApiService} from '../services/api.service'
@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
  results=[];
  userId;
  index;
  serchText='';
  constructor(private apiservice:ApiService,
              private toastr: ToastrService) { }
  ngOnInit() {
 
      this.getUser();
   }
 
 getUser(){
     this.apiservice.get('/api/users?page=2',this.getUserSuccessfully.bind(this));
 
 }
 getUserSuccessfully(response){
   this.results= response['data'];
 }
 
 deleteUser(id,indx){
   this.userId=id;
   this.index=indx;
   this.apiservice.post('/api/users/'+id,null,this.deleteUserSuccessfully.bind(this));
 
 }
 deleteUserSuccessfully(response){
  this.toastr.warning('User Deleted!', 'Deleted!');
  this.results.splice(this.index, 1);
 }

}
