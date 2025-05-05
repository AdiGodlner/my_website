// services/window-registry.ts

import { Type } from '@angular/core';
import { TextEditorComponent } from '../components/window-apps/text-editor/text-editor.component';
import { DirectoryViewerComponent } from '../components/window-apps/directory-viewer/directory-viewer.component';
import { WindowDataMap } from '../models/windowDataMap';

export interface WindowRegistryEntry<T> {
  component: Type<any>;
  createData: (raw: any) => T;
}

export const WINDOW_REGISTRY: {
    [K in keyof WindowDataMap]: WindowRegistryEntry<WindowDataMap[K]>;
  } = {
    pdf: {
      component: TextEditorComponent,
      createData: (raw: any): WindowDataMap['pdf'] => ({
        text: typeof raw === 'string' ? raw : (raw?.text ?? '')
      })
    },
    exe: {
      component: TextEditorComponent,
      createData: (raw: any): WindowDataMap['exe'] => ({
        text: typeof raw === 'string' ? raw : (raw?.text ?? '')
      })
    },
    text: {
      component: TextEditorComponent,
      createData: (raw: any): WindowDataMap['text'] => ({
        text: typeof raw === 'string' ? raw : (raw?.text ?? '')
      })
    },
    directory: {
      component: DirectoryViewerComponent,
      createData: (raw: any): WindowDataMap['directory'] => ({
        items: Array.isArray(raw?.items) ? raw.items : []
      })
    }
  };
  