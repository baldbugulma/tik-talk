import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { ProfileService } from '@tt/data-access/profile/services/profile.service';
import { AvatarUploadComponent } from '../../ui/avatar-upload/avatar-upload.component';
import { Store } from '@ngrx/store';
import { Profile, selectMe } from '@tt/data-access/profile';
import { AddressInputComponent, StackInputComponent } from '@tt/common-ui';
import { ProfileInfoComponent } from '../../ui/profile-info/profile-info.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    StackInputComponent,
    AddressInputComponent,
    ProfileInfoComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  store = inject(Store);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  me = this.store.selectSignal<Profile | null>(selectMe);

  form = this.fb.group({
    firstName: [``, Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [{ value: '', disabled: false }],
    city: [null],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.me(),
      });
    });
  }
  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    console.log(this.form.value);

    firstValueFrom(
      //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
      })
    );
  }
}
