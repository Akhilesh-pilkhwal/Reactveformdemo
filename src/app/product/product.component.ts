
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
    @Input('group')
    public adressForm: FormGroup;
}
