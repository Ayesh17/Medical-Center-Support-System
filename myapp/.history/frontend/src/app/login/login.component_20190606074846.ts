import {Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import Swal from 'sweetalert';
import { Router } from '@angular/router';


export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usr = new User();
  ngOnInit() {


  }

  constructor(public dialog: MatDialog, private userservce: UserService, private router: Router) {}


  openDialogSignIn(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '500px',
    });
  }

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  openDialogSignUp(): void {
    const dialogRef = this.dialog.open(SignupDialog, {
      width: '500px',
    });
  }
/**onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  } */
  onLogout(){
    this.userservce.deleteToken();
    this.router.navigate(['']);
  }

}



// get loging loalog box
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./login.component.css'],
})
// tslint:disable-next-line:component-class-suffix
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

    /**constructor(private userService: UserService,private router : Router) { } */

  model = {
    email: '',
    password: ''
  };
  // tslint:disable-next-line:member-ordering
  email = new FormControl('', [Validators.required, Validators.email]);

  /*****/
  hide = true;

  onNoClickSignUp(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(SignupDialog, {
      width: '500px',
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  /****/
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        console.log(this.userService.isDoctor());
       if (this.userService.isDoctor()){
        this.router.navigateByUrl('/doctor'); /**set naviagation to doctor dash board mailnly */
       } else if (this.userService.isPatient()){
        this.router.navigateByUrl('/patient');
       }       else if (this.userService.isAdmin()){
        this.router.navigateByUrl('/admin');
       }       else {
         this.router.navigateByUrl('');
       }

      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}



// get sign up dialog box
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signup-dialog',
  templateUrl: 'signup-dialog.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})


// tslint:disable-next-line:component-class-suffix
export class SignupDialog {
usr = new User();
// tslint:disable-next-line:max-line-length
emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
phone = /^(\+94)[0-9]{9,9}$/;
showSucessMessage: boolean;
serverErrorMessages: string;
  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    public dialog: MatDialog,
    private usersevice: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    onSubmit(form: NgForm) {
      this.usersevice.postuser(form.value).subscribe(
        res => {
          this.resetForm(form);

          Swal({
            title: 'Good job!',
            text: 'You Have Sussefully registered!',
            icon: 'success',
          });
        },
        err => {

          swal ( 'Oops ' , '',  'error' );
        }
      );
    }

  onNoClickSignIn(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '500px',
    });
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  hide = true;

  signUpFunction(form:NgForm){
    console.log("ck sign up");
    return this.usersevice.postuser(form.value).subscribe(
        res=>{
          this.showSucessMessage=true;
          setTimeout(()=>this.showSucessMessage=false,4000);
          this.resetForm(form);
        },
        err=>{
          if(err.status==422){
            this.serverErrorMessages=err.error.join('<br/>');
          }
          else
            this.serverErrorMessages="Something went wrong.Please contact admin. ";

        }
    );
    }

    resetForm(form: NgForm) {
      this.usersevice.selectedUser = {
        userName: '',
      email: '',
      phonenumber: '',
      password: '',
      phone: ''
      };
      form.resetForm();
      this.serverErrorMessages = '';


  }

 
}






