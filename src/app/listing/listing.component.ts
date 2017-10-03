import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service'
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  results=[];
 constructor(private apiservice:ApiserviceService) { }
 ngOnInit() {

     this.getUser();
  }

getUser(){
    this.apiservice.get('http://localhost:59395/api/users/getAllUser',this.getUserSuccessfully.bind(this));

}
getUserSuccessfully(response,results){
  //var abc=this.results;
  this.results.push(...response);
}

deleteUser(id){
  this.apiservice.post('http://localhost:59395/api/users/deleteUser?id='+id,null,this.deleteUserSuccessfully.bind(this));

}
deleteUserSuccessfully(response){
  var id=response.ID;
  this.results=this.results.splice(id, 1);
  this.getUser();
}
}
