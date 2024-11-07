import { Component, signal } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  
  preview = signal<string>('/assets/imgs/avatar-placeholder.png')

  fileBrowserHandler(event: Event){
      const file :File | undefined = (event.target as HTMLInputElement)?.files?.[0]
      this.proccessFile(file)
  }

  onFileDroped(file: File):void{
    this.proccessFile(file)
  }

  proccessFile(file: File | null |undefined): void{
    
    if(!file || !file.type.match('image')) return

    const reader: FileReader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file)
  }
}
