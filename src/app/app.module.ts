import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { ToastrModule } from 'ngx-toastr';

import{ValidationService} from './services/validation.service'
import {ApiService} from './services/api.service'
import {AuthenticateService} from './services/authenticate.service'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValidationmessageComponent } from './validationmessage/validationmessage.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UserfilterPipe } from './pipe/userfilter.pipe';


const appRoutes: Routes = [
  { path: 'login',        component: LoginComponent },
  {path:'dasboard', component:DashboardComponent,canActivate: [AuthenticateService],
      children: [
        { path: '', component: UserListingComponent },
        { path: 'edituser/:id',        component: EdituserComponent },
      ]},
     
  { path: 'registration',        component: RegisterComponent },
  { path: '',   redirectTo: '/dasboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ValidationmessageComponent,
    UserListingComponent,
    DashboardComponent,
    PageNotFoundComponent,
    EdituserComponent,
    UserfilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot(
      appRoutes,
     ),
     SlimLoadingBarModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ValidationService,ApiService,AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
