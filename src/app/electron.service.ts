import { LinkService } from './link.service';
import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private ipc: IpcRenderer;

  constructor(private _linkService: LinkService) {
    console.log('link.service: constructor start');
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.log('Could not load electron ipc');
		}
		
/* 		this.ipc.on('videoTitle', (event, arg) => {
			  console.log('electronService: ', arg)
		}) */
  }

  sendLinks(inputElements: HTMLInputElement[], args?: string[]) {
    let allLinks = this._linkService.getAllLinks(inputElements);
    allLinks = args ? [...allLinks, ...args] : allLinks;
    console.log('link.service.sendAllLinks: about to send links...');
    console.log('link.service.sendAllLinks:', allLinks);
    this.ipc.send('sendLinks', allLinks);
	}
	
	getVideoTitle(videoLink: string) {
		this.ipc.send('getVideoTitle', videoLink)
	}

}
