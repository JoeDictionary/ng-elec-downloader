import { ElectronService } from './../electron.service';
import { LinkService, Link } from './../link.service';
import { LinkEntryComponent } from './../link-entry/link-entry.component';
import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'link-container',
  templateUrl: './link-container.component.html',
  styleUrls: ['./link-container.component.scss'],
})
export class LinkContainerComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputs', { read: LinkEntryComponent }) inputs: QueryList<
    LinkEntryComponent
  >;
  linkInputElements: HTMLInputElement[];
	links$: Observable<Link[]>;
	
	constructor(private _linkService: LinkService, private _electronService: ElectronService) {}
  ngOnInit(): void {
    this.links$ = this._linkService.links();
  }

  addLink(index?: number) {
    // Inserts at last position if no index is provided
    this._linkService.addLink({ link: '' }, index);
  }

  removeLink(index: number) {
    // Removes at index
    this._linkService.removeLink(index);
  }

  handleKeyDown(code: number, index: number) {
    switch (code) {
      // Enter
      case 13:
        this.addLink(index);
        // ANCHOR try wrapping with promise
        console.log(this.linkInputElements);
        break;
      // UpArrow
      case 38:
        if (index !== 0) this.linkInputElements[index - 1].focus();
        break;
      // DownArrow
      case 40:
        if (index !== this.inputs.length - 1)
          this.linkInputElements[index + 1].focus();
        break;
    }
  }

  downloadLinks(args?: string[]) {
    this._electronService.sendLinks(this.linkInputElements, args);
	}

	videoTitle() {
		this._electronService.getVideoTitle("https://www.youtube.com/watch?v=PoRJizFvM7s&t=664s")
	}

  ngAfterViewInit(): void {
    this.inputs.changes
      .pipe(
        startWith(this.inputs),
        // Extracts only the input-elements from the QueryList
        map((e) => e.toArray().map((r) => r.input.nativeElement))
      )
      .subscribe((val) => {
        this.linkInputElements = val;
      });
    // this.inputs.first.focusInput()
  }
}
