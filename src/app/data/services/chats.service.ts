import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map } from "rxjs";
import { Chat, GroupedMessage, LastMessageRes, Message } from "./interfaces/chat.interface";
import { ProfileService } from "./profile.service";

@Injectable({
    providedIn: 'root'
})
export class ChatsService {
    http = inject(HttpClient); 
    me = inject(ProfileService).me

    activeChatMessages = signal<GroupedMessage[]>([])

    baseApiUrl :string = 'https://icherniakov.ru/yt-course/'

    chatsUrl = `${this.baseApiUrl}chat/`; 
    messageUrl = `${this.baseApiUrl}message/`


    createChat(userId: number){
        return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {} )
    }

    getMyChats(){
        return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`, {} )
    }

    getChatById(chatId: number){
        return this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
        .pipe(
            map(chat => {
                const patchedMessages = chat.messages.map(message => {
                        return{
                            ...message,
                            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                            isMine: message.userFromId === this.me()!.id
                        }
                    }) 

                    const groupedMessages = patchedMessages.reduce<GroupedMessage[]>((acc, message) => {
                            const date = message.createdAt.split('T')[0];

                            const existingGroup = acc.find(group => group.date === date);
                            if (existingGroup) {
                                // Если группа существует, добавляем сообщение
                                existingGroup.messages.push(message);
                            } else {
                                // Если группы нет, создаем новую
                                acc.push({ date, messages: [message] });
                            }
                        
                            return acc;

                    },[])
                
                this.activeChatMessages.set(groupedMessages)
                return {
                    ...chat,
                    companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst, 
                    messages: patchedMessages
                }
            })
        )
    }

    sendMessage(chatId: number, message: string){
        return this.http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {
            params: {
                message
            }
        } )
    }
}