import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DndDirective } from '../../../../../common-ui/src/lib/directives/dnd.directive';
import { SvgIconComponent } from '../../../../../common-ui/src/lib/components/svg-icon/svg-icon.component';
import { ProfileService } from '../../data/services/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective, AsyncPipe, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  avatar: File | null = null;

  profileService = inject(ProfileService);

  previewUrl: string | null | undefined = this.profileService.me()?.avatarUrl
    ? `https://icherniakov.ru/yt-course/${this.profileService.me()?.avatarUrl}`
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
