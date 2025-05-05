import { Component, Input,
   Output, EventEmitter,
    OnChanges, SimpleChanges } from '@angular/core';
    import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-icon',
  imports: [ DragDropModule ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() iconUrl!: string;
  @Input() isSelected: boolean = false;
  @Input() dragBoundary: string = '.desktop';

  @Output() clicked = new EventEmitter<{ id: string, ctrlKey: boolean }>();
  @Output() doubleClicked = new EventEmitter<void>();


  handleClick(event: MouseEvent) {
    this.clicked.emit({id: this.id, ctrlKey: event.ctrlKey});
  }

  handleDoubleClick(event: MouseEvent) {
    event.stopPropagation();
    this.doubleClicked.emit();
  }

  


}
