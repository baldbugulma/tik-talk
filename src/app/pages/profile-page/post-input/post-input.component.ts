import { NgIf } from '@angular/common';
import { Component, EventEmitter, HostBinding, inject, input, Output, Renderer2, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostService } from '../../../data/services/post.service';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  r2 = inject(Renderer2)
  profile = inject(ProfileService).me
  
  isCommentInput = input<boolean>(false);
  postId = input<number>(0)

  postService = inject(PostService)
  postText: string = ''

  @Output() outDataPost = new EventEmitter<{text: string | null; postId: number | null; authorId:number | null; isCommentInput: boolean } >()

  ngOnInit() {
    const profile = this.profile();
    this.data.authorId = profile?.id ?? 0;
  }

  data = {
    text: null as string | null,
    postId: null as number | null,
    authorId: null as number | null,
    isCommentInput: false as boolean
  };
  

  @Output() created = new EventEmitter()

  @HostBinding('class.comment')
  get isComment(){
    return this.isCommentInput()
  }
  

  onTextAreaInput(event: Event){
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  setData(textArea: HTMLTextAreaElement){
    this.data.text = textArea.value;
    this.data.postId = this.postId();
    this.data.isCommentInput = this.isCommentInput();
    
    this.outDataPost.emit(this.data)

  }
//   onCreatePost(){
//     if(!this.postText) return

//     if(this.isCommentInput()) {
//       firstValueFrom(this.postService.createComment({
//         text: this.postText,
//         postId: this.postId(),
//         authorId: this.profile()!.id
//       })).then(() =>{
//           this.postText=''
//           this.created.emit()
//       }
//       )
//       return 
//     }

//     firstValueFrom(this.postService.createPost({
//       title: 'Клевый пост',
//       content: this.postText,
//       authorId: this.profile()!.id
//     })).then(() =>{
//         this.postText=''
//     }
//     )
//   }
}
