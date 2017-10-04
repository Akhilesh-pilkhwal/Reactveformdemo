import { Injectable } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import {HttpClient} from '@angular/common/http';
@Injectable()
export class ApiService {

  constructor(private slimLoadingBarService: SlimLoadingBarService,private http: HttpClient) {
    
  }
    baseurl='https://reqres.in'
   public get(url,callbackfunction){
    this.startLoading();
    this.http.get(this.baseurl+url).subscribe(data => {
        this.completeLoading();
        return callbackfunction(data);
      });
    }
    
     public post(url,body,callbackfunction){
      this.startLoading();
      this.http.post(this.baseurl+url,body).subscribe(data => {
        this.completeLoading();
        return callbackfunction(data);
      });
    }


    startLoading() {
      this.slimLoadingBarService.start(() => {
          //console.log('Loading complete');
      });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }

    completeLoading() {
        this.slimLoadingBarService.complete();
    }
}
