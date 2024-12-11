import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { AvatarCircleComponent } from '../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../../../../../../libs/common-ui/src/lib/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);

  me = inject(ProfileService).me;

  @Output() created = new EventEmitter<string>();

  postText: string = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}
