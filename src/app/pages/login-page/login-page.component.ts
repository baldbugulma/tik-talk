import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)

  form = new FormGroup<{ 
    username: FormControl<null | string>; 
    password: FormControl<null | string>; 
  }>({
    username: new FormControl <null | string>(null, Validators.required),
    password: new FormControl <null | string>(null, Validators.required)
  });

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value)
      //@ts-ignore
        this.authService.login(this.form.value).subscribe()
    }

  };

}
