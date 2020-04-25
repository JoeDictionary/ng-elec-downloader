import { ElectronService } from './electron.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, scan } from 'rxjs/operators';
import { IpcRenderer } from 'electron';

export interface Link {
  link: string;
}

export interface LinkIndex {
  index: number;
  link?: Link;
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LinkService {
	private Link$ = new Subject<LinkIndex>();
	private ipc: IpcRenderer;
  
  constructor() {
		console.log("link.service: constructor start")
		if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.log('Could not load electron ipc')
    }
	}

	links(): Observable<Link[]> {
    return this.Link$.asObservable().pipe(
      startWith([]),
      scan((acc: Link[], current: LinkIndex) => {
        if (current.remove) {
					// Removes link
          acc.splice(current.index, 1);
          return acc;
				}
				// Adds link
				acc.splice(current.index + 1, 0, { ...current.link });
        return acc;
      })
    );
	}
	
	getAllLinks(inputElements: HTMLInputElement[]) {
		let allLinks = inputElements.map((e) => e.value)
		// console.log(allLinks)
		return allLinks
  }

  addLink(link: Link, index: number) {
    console.log("addLink Works")
    this.Link$.next({ link, index: index });
  }
  
  removeLink(index: number) {
    this.Link$.next({ index: index, remove: true });
  }

  sendAllLinks(inputElements: HTMLInputElement[]) {
		let allLinks = this.getAllLinks(inputElements)
		console.log("link.service.sendAllLinks: about to send links...")
		console.log("link.service.sendAllLinks:", allLinks)
		this.ipc.send("sendLinks", allLinks)
  }
}
