import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DesktopFile } from '../models/DesktopFile';
import { inject } from '@angular/core';
import { WindowDataMap } from '../models/windowDataMap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})

export class FileService {
  
  private http = inject(HttpClient);

  getDesktopFiles(): Observable<Array<DesktopFile<keyof WindowDataMap>>> {
    return this.http.get<any[]>('/assets/mock/desktop-files.json').pipe(
      map(files => files.map(file => ({
        ...file
      }) as DesktopFile<keyof WindowDataMap>))
    );
  }
  
}
