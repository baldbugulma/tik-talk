import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { Chat, LastMessageRes, Message } from "./interfaces/chat.interface";
import { ProfileService } from "./profile.service";

@Injectable({
    providedIn: 'root'
})
export class ChatsService {
    http = inject(HttpClient); 
    me = inject(ProfileService).me

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
                return {
                    ...chat,
                    companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst, 
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