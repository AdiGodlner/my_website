import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWindowData } from '../../../models/windowDataMap';
import { WINDOW_DATA } from '../../../models/tokens/WINDOW_DATA';

@Component({
  selector: 'app-text-editor',
  imports: [CommonModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  
  text: any;
  
  constructor(@Inject(WINDOW_DATA) public data: TextWindowData) {
    this.text = signal(this.data.text || '');

  }

  
  ngOnDestroy() {
    if (this.data) {
      this.data.text = this.text();
    }
  }

}
