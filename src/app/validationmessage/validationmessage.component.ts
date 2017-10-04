import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import{ValidationService} from '../services/validation.service'
@Component({
  selector: 'app-validationmessage',
  templateUrl: './validationmessage.component.html',
  styleUrls: ['./validationmessage.component.css']
})
export class ValidationmessageComponent implements OnInit {
  @Input() control: FormControl;
  constructor() { }

  ngOnInit() {
  }
get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }

}
