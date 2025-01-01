import { Component, inject, signal } from '@angular/core';
import { DndDirective } from '../../../../../common-ui/src/lib/directives/dnd.directive';
import { SvgIconComponent } from '../../../../../common-ui/src/lib/components/svg-icon/svg-icon.component';
import { ProfileService } from '@tt/data-access/profile/services/profile.service';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectMe } from '@tt/data-access/profile';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUploadComponent {
  avatar: File | null = null;

  store = inject(Store);
  me = this.store.selectSignal(selectMe);
  profileService = inject(ProfileService);

  previewUrl: string | null | undefined = this.me()?.avatarUrl
    ? `https://icherniakov.ru/yt-course/${this.me()?.avatarUrl}`
    : `/assets/imgs/avatar-placeholder.png`;

  preview = signal<string>(`${this.previewUrl}`);

  fileBrowserHandler(event: Event) {
    const file: File | undefined = (event.target as HTMLInputElement)
      ?.files?.[0];
    this.proccessFile(file);
  }

  onFileDroped(file: File): void {
    this.proccessFile(file);
  }

  proccessFile(file: File | null | undefined): void {
    if (!file || !file.type.match('image')) return;

    const reader: FileReader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
