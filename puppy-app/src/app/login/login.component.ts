import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.isLoggedIn()){
      alert("You are already logged")
      this.route.navigateByUrl('home');
    }
  }
  //falta
  
  onLogin() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe((obj:object) => {
        // console.log(obj);
        if(obj.status === "success"){
          const token = obj.data.token;
          console.log(token);
          localStorage.setItem('auth', token);
          this.route.navigateByUrl('home');
        }else{
          alert('Wrong credentials!');
        }
      })
    } else {
      alert('Wrong credentials!');
    }
  }
  redirectSignUp(){
    this.route.navigate(['signUp'])
  }
}
