import { Component, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { HttpClientModule } from '@angular/common/http';

// Components
import { IconComponent } from '../icon/icon.component';
import { WindowComponent } from '../window/window.component';
// Models
import { DesktopFile } from '../../models/DesktopFile'
import { rectangle } from '../../models/Rectengle';
// services
import { FileService } from '../../services/file.service';  
import { WindowService } from '../../services/window.service';  
import { DesktopWindow } from '../../models/DesktopWindow';
import { WINDOW_REGISTRY } from '../../services/windowRegistry';
import { WindowDataMap } from '../../models/windowDataMap';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    DragDropModule,
    IconComponent,
    WindowComponent,
    HttpClientModule
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {

  @ViewChild('desktopRef', { static: true }) desktopRef!: ElementRef;

  desktopFiles: DesktopFile< keyof WindowDataMap >[] = [];
  
  isSelecting = false;
  selectionStart: { x: number, y: number } | null = null;
  selectionBox: rectangle | null = null;

  openWindows: DesktopWindow<keyof WindowDataMap>[] = [];
  windowIdCounter = 0;


  constructor(
    private fileService: FileService,
    private windowService:  WindowService ) { }

  ngOnInit(): void {
    
    this.fileService.getDesktopFiles().subscribe(
      (files: DesktopFile< keyof WindowDataMap >[]) => {
      this.desktopFiles = files;
    });

    this.windowService.windows$.subscribe(windows => {
      this.openWindows = windows.filter(w => !w.minimized); // Only show non-minimized windows
    });

  }

  onDesktopMouseDown(event: MouseEvent) {
    if (event.button !== 0) return; // Only respond to left-click
    // on mousedown if not ctrl remove all selection
    if (!event.ctrlKey) {
      this.desktopFiles = this.desktopFiles.map(f => ({ ...f, selected: false }));
    }

    this.isSelecting = true;
    this.selectionStart = { x: event.clientX, y: event.clientY };
    this.selectionBox = null;
  }

  onDesktopMouseMove(event: MouseEvent) {
    if (!this.isSelecting || !this.selectionStart) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const left = Math.min(currentX, this.selectionStart.x);
    const top = Math.min(currentY, this.selectionStart.y);
    const width = Math.abs(currentX - this.selectionStart.x);
    const height = Math.abs(currentY - this.selectionStart.y);

    this.selectionBox = { top, left, width, height };

    this.updateSelection();

  }


  updateSelection(): void {
    
    const selection = this.selectionBox;
    if (!selection) return;

    const iconElements: HTMLElement[] = Array.from(
      this.desktopRef.nativeElement.querySelectorAll('.icon-wrap')
    );

    this.desktopFiles = this.desktopFiles.map((file, i) => {
      const element = iconElements[i];
      const rect = element.getBoundingClientRect();

      const overlaps =
        rect.left < selection.left + selection.width &&
        rect.right > selection.left &&
        rect.top < selection.top + selection.height &&
        rect.bottom > selection.top;

      return { ...file, selected: overlaps };
    });
  }


  onDesktopMouseUp(): void {
    this.isSelecting = false;
    this.selectionStart = null;
    this.selectionBox = null;
  }

  rectsIntersect(a: DOMRect, b: DOMRect) {
    return !(
      b.left > a.right ||
      b.right < a.left ||
      b.top > a.bottom ||
      b.bottom < a.top
    );
  }

  onIconClicked(event: { id: string; ctrlKey: boolean }) {
  
    this.desktopFiles = this.desktopFiles.map(f => {
      if (event.ctrlKey) {
        // Ctrl = toggle selected state
        return f.id === event.id ? { ...f, selected: !f.selected } : f;
      } else {
        // No Ctrl = single select
        return { ...f, selected: f.id === event.id };
      }
    });

  }
  
  onIconDoubleClicked<T extends keyof WindowDataMap>(file: DesktopFile<T>) {
    this.windowService.openWindow(file.type, file.name, file.data);
  }
  
   

  closeWindow(id: string) {
    console.log("foooooooo closing window : ", id )
    this.windowService.closeWindow(id);
    console.log("after calling close windowservices : ", id )

  }

  minimizeWindow(id: string) {
    this.windowService.minimizeWindow(id);
  }
  toggleMaximize(id:string){
    this.windowService.toggleMaximize(id);
  }

  focusWindow(id: string) {
    console.log("focusing window : " , id )
    // this.windowService.closeWindow(id);
  }


}