import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {

  @Output() fileDropped  = new EventEmitter<File>()

  @HostBinding("class.fileover")
  fileOver: boolean = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.fileOver = true
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.fileOver = false
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.fileOver = false

    this.fileDropped.emit(event.dataTransfer?.files[0])
  }
}
