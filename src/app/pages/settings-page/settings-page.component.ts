import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)


  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName : ['', Validators.required],
    userName : ['', Validators.required],
    description : [''],
    stack:[''],
  })
}
