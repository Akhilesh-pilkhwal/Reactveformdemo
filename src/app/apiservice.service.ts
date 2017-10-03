import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class ApiserviceService {


constructor(private http: HttpClient) {
  
}
  public printHello(str,callbackfunction1){
  var name='akhilesh';
    console.log('hello every one');
    return callbackfunction1(name);
  }
 public get(url,callbackfunction){
    this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      //this.results = data['results'];
      return callbackfunction(data);
    });
  }
  
   public post(url,body,callbackfunction){
    this.http.post(url,body).subscribe(data => {
      // Read the result field from the JSON response.
      //this.results = data['results'];
      return callbackfunction(data);
    });
  }

}
