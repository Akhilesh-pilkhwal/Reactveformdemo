import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Icustomer } from '../icustomer';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public myForm: FormGroup;
  filename1='';
  baseUrl='http://localhost:59395/UploadFile/'
      constructor(private _fb: FormBuilder,
                  private ht:HttpClient,) { }
  
      ngOnInit() {
          this.createForm();
          
          // add address
          //this.addAddress();
          
          /* subscribe to addresses value changes */
          // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
          //   console.log(x);
          // })
          this.initailizeForm();
      }
      initailizeForm(){
          // var temp={
          //   name: "ghfgh",
          //   addresses:[]
          // }
          const control = <FormArray>this.myForm.controls['addresses'];
          this.items.forEach(x => {
            control.push(this.patchValue(x.street, x.postcode))
          })
          // this.myForm.setValue(temp);
      }
      patchValue(name, code) {
        return this._fb.group({
          street: [name],
          postcode: [code]
        })    
      }
      items=[{street: "Trouser", postcode: "$400"},{street: "Jeans", postcode: "$500"}]


      createForm(){
        this.myForm = this._fb.group({
          name: ['bottom wear', [Validators.required, Validators.minLength(5)]],
          addresses: this._fb.array([])
      });
      }
      initAddress() {
          return this._fb.group({
              street: ['', Validators.required],
              postcode: ['']
          });
      }
  
      addAddress() {
          const control = <FormArray>this.myForm.controls['addresses'];
          const addrCtrl = this.initAddress();
          
          control.push(addrCtrl);
          
          /* subscribe to individual address value changes */
          // addrCtrl.valueChanges.subscribe(x => {
          //   console.log(x);
          // })
      }
  
      removeAddress(i: number) {
          const control = <FormArray>this.myForm.controls['addresses'];
          control.removeAt(i);
      }
  
      save(model: Icustomer) {
          // call API to save
          // ...
          console.log(model);
      }

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
}
