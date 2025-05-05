import {  
  Component,
  Input,
  Output,
  EventEmitter,
  inject, 
  EnvironmentInjector,
  Injector,
  ViewContainerRef,
  ViewChild} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DesktopWindow } from '../../models/DesktopWindow';
import { WINDOW_DATA } from '../../models/tokens/WINDOW_DATA';
import { WindowDataMap } from '../../models/windowDataMap';

@Component({
  selector: 'app-window',
  imports: [ CommonModule, DragDropModule, NgComponentOutlet ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {

  @Input() window !: DesktopWindow< keyof WindowDataMap >;

  @Output() close = new EventEmitter<void>();
  @Output() minimize = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() toggleMaximize = new EventEmitter<void>();

  constructor(private injector: Injector) {}

  getStyle() {
    if (!this.window) return {};
    if (this.window.maximized) {
      return {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      };
    } else {
      return {
        top: this.window.rect.top + 'px',
        left: this.window.rect.left + 'px',
        width: this.window.rect.width + 'px',
        height: this.window.rect.height + 'px',
      };
    }
  }
  

  onFocus(event: MouseEvent) {
    event.stopPropagation();
    this.focus.emit();
  }

  onToggleMaximize(event:MouseEvent){
    event.stopPropagation();
    this.toggleMaximize.emit()
  }

  onClose(event:MouseEvent) {
    event.stopPropagation();
    this.close.emit();
  }


  onMinimize(event:MouseEvent) {
    event.stopPropagation();
    this.minimize.emit();
  }

 

  createInjector(): Injector {
    return Injector.create({
      providers: [
        {
          provide: WINDOW_DATA,
          useValue: this.window.data ?? {},
        },
      ],
      parent: this.injector,
    });
  }


}
