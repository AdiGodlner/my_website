import { Type } from "@angular/core";
import { rectangle } from "./Rectengle";
import { WindowDataMap } from "./windowDataMap";

export interface DesktopWindow<T extends keyof WindowDataMap> {
    id: string;
    title: string;
    rect:rectangle;
    minimized?: boolean;
    maximized?: boolean;
    zIndex?: number;
    // TODO remove type and data ? as the src of trouth is in the file
    type: T; 
    data?: WindowDataMap[T];
    // the component to dynamically render inside
    component: Type<any>; 

}
  