import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';


@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private ipc: IpcRenderer;

  constructor() {
/*     if((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else console.warn("could not load electron ipc") */
  }

/*   sendLinks(links: string[]) {
    this.ipc.send("sendLinks", links)
  } */
}
