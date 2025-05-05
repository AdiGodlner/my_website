import { WindowDataMap } from "./windowDataMap";

export interface DesktopFile<T extends keyof WindowDataMap > {
    id: string;
    name: string;
    iconUrl: string;
    selected: boolean;

    type: T; 
    data: WindowDataMap[T];
  }