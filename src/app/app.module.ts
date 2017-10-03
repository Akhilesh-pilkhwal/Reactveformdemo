import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FileUploadModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import {ApiserviceService} from './apiservice.service';
import{ValidationServiceService} from './services/validation-service.service'
import { LoginComponent } from './login/login.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ListingComponent } from './listing/listing.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component'

const appRoutes: Routes = [
  { path: 'userlisting', component: ListingComponent },
  { path: 'login',        component: LoginComponent },
  {path:'category',component:CategoryComponent},
  { path: 'registration',        component: UserFormComponent },
  { path: 'edituser/:id',        component: EdituserComponent },
  { path: '',   redirectTo: '/userlisting', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    LoginComponent,
    ControlMessagesComponent,
    ListingComponent,
    PageNotFoundComponent,
    EdituserComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot(
      appRoutes,
     ),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FileUploadModule,

  ],
  providers: [ApiserviceService,ValidationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
