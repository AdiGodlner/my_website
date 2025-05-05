import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DesktopWindow } from '../models/DesktopWindow';
import { v4 as uuidv4 } from 'uuid';

import { rectangle } from '../models/Rectengle';
import { Type } from "@angular/core";
import { WINDOW_REGISTRY } from './windowRegistry';
import { WindowDataMap } from '../models/windowDataMap';

@Injectable({
  providedIn: 'root'
})
export class WindowService {


  private windows: DesktopWindow<keyof WindowDataMap>[] = [];
  private windowsSubject = new BehaviorSubject<DesktopWindow<keyof WindowDataMap>[]>(this.windows);

  public windows$ = this.windowsSubject.asObservable();

  private readonly DEFAULT_RECT: rectangle = {
    left: 100,
    top: 100,
    width: 600,
    height: 400
  };


  constructor() { }


  openWindow<T extends keyof WindowDataMap>(
    type: T,
    title: string,
    data?: WindowDataMap[T]
  ): void {
    const entry = WINDOW_REGISTRY[type];
  
    const newWindow: DesktopWindow<T> = {
      id: uuidv4(),
      type,
      title,
      rect: { ...this.DEFAULT_RECT },
      component: entry.component,
      data,
      minimized: false
    };
  
    this.windows.push(newWindow);
    this.windowsSubject.next([...this.windows]);
  
  }
  

  closeWindow(id: string) {
    this.windows = this.windows.filter(w => w.id !== id);
    this.windowsSubject.next([...this.windows]);

  
  }

  toggleMaximize(id:string){

    this.windows = this.windowsSubject.getValue().map(win => {
    
      if (win.id === id) {
        return { ...win, maximized: !win.maximized };
      }

      return win;
    
    });

    this.windowsSubject.next(this.windows);

  }

  minimizeWindow(id: string) {
  
    this.windows = this.windows.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    );
  
    this.windowsSubject.next([...this.windows]);
  
  }

  restoreWindow(id: string) {
  
    this.windows = this.windows.map(w =>
      w.id === id ? { ...w, minimized: false } : w
    );
  
    this.windowsSubject.next([...this.windows]);
  
  }

  getWindowById(id: string): DesktopWindow<keyof WindowDataMap> | undefined {
  
    return this.windows.find(w => w.id === id);
  
  }


}


