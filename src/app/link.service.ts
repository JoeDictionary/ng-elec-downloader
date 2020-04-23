import { Injectable } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { startWith, scan, tap } from 'rxjs/operators';

export interface Link {
  link: string;
}

export interface LinkIndex {
  index: number;
  link?: Link;
  remove?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private Link$ = new Subject<LinkIndex>();
	
	links(): Observable<Link[]> {
    return this.Link$.asObservable().pipe(
      startWith([
        { link: 'https://www.youtube.com/watch?v=guo8CHurCpY' },
        { link: 'https://www.youtube.com/watch?v=guo8CHurCpY' },
      ]),
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

  constructor() {}

  addLink(link: Link, index: number) {
		console.log("addLink Works")
    this.Link$.next({ link, index: index });
  }

  removeLink(index: number) {
    this.Link$.next({ index: index, remove: true });
  }
}
