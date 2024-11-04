import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)

  form = new FormGroup<{ 
    username: FormControl<null | string>; 
    password: FormControl<null | string>; 
  }>({
    username: new FormControl <null | string>(null, Validators.required),
    password: new FormControl <null | string>(null, Validators.required)
  });

  onSubmit(){
    if(this.form.valid){
      //@ts-ignore
        this.authService.login(this.form.value).subscribe(res => {
          console.log(res)
          this.router.navigate([''])
        })
    }
  };

}
