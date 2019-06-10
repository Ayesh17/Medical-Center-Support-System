import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{environment} from '../../environments/environment';
import{User} from './user.model';
@Injectable({
  providedIn: 'root'
})
 

export class UserService {
 
  selectedUser: User = {
    
    userName: '',
    email: '',
    phonenumber: '',
    password: '',
    phone: ''
     }


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http :HttpClient) { }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
 
 setToken(token: string) {
    localStorage.setItem('token', token);
  }
 
  getToken() {
    return localStorage.getItem('token');
  }
 
  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    // var token=localStorage.getItem('token');
    // tslint:disable-next-line:prefer-const
    var token = this.getToken();
    if (token) {
      var getUserPayload = atob(token.split('.')[1]);
      return JSON.parse(getUserPayload);
    } else {
      return null ;
    }
  }

  getUserProfile()
  {
    console.log("get user profile");
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if( userPayload )
      return userPayload.exp > Date.now()/1000;
    else
      return  null;
  }
  isDoctor(){
    var payload = this.getUserPayload()
    if(payload){
      if(payload.type=="doctor"){
        return true
      }
    }
    else{
      return false
    }
  }

  isPatient(){
    var payload = this.getUserPayload()
    if(payload){
      if( payload.type == "patient" ) {
        return true
      }
    }
    else{
      return false
    }
  }

  isAdmin(){
    var payload = this.getUserPayload()
    if(payload){
      if(payload.type=="admin"){
        return true
      }
    }
    else{
      return false
    }
  }


  postuser(user:User){
  return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  getPatientDetails() {
    return this.http.get(environment.apiBaseUrl + '/getPatientDetails');
  }



}
