import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "@tt/auth";

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup<{
    username: FormControl<null | string>;
    password: FormControl<null | string>;
  }>({
    username: new FormControl<null | string>(null, Validators.required),
    password: new FormControl<null | string>(null, Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['']);
      });
    }
  }
}
