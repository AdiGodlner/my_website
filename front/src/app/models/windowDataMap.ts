import { DesktopFile } from "./DesktopFile";

// models/window-data-map.ts
export interface TextWindowData {
    text: string;
  }
  
  export interface DirectoryWindowData {
    items: DesktopFile<keyof WindowDataMap>[];
  }
  
  export interface WindowDataMap {
    text: TextWindowData;
    directory: DirectoryWindowData;
    pdf: TextWindowData;
    exe: TextWindowData;
    // Add more as needed
  }
  