import {
  Component,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { firstValueFrom, fromEvent, interval, timer } from 'rxjs';
import { audit, switchMap } from 'rxjs/operators';

import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { ChatsService, MessageInputComponent } from '@tt/chats';
import { FormatDatePipe } from '@tt/common-ui';
import { Chat } from '@tt/data-access/chats/interfaces/chat.interface';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent,
    FormatDatePipe,
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;

  r2: Renderer2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  @ViewChild('messagesWrapper', { static: false })
  messagesWrapper!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    timer(0, 100000)
      .pipe(switchMap(() => this.getNewMessage()))
      .subscribe();
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(audit(() => interval(500)))
      .subscribe((event) => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 30;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  async onSendMessage(messageText: string) {
    this.chatsService.wsAdapter.sendMessage(messageText, this.chat().id);
    // await firstValueFrom(
    //  this.chatsService.sendMessage(this.chat().id, messageText)
    // );
    await this.getNewMessage();
    setTimeout(() => this.scrollToBottom());
  }

  async getNewMessage() {
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
    await console.log(1);
  }

  scrollToBottom() {
    if (this.messagesWrapper) {
      this.messagesWrapper.nativeElement.scrollTop =
        this.messagesWrapper.nativeElement.scrollHeight;
    }
  }
}
