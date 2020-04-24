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
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'link-container',
  templateUrl: './link-container.component.html',
  styleUrls: ['./link-container.component.scss'],
})
export class LinkContainerComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputs', { read: LinkEntryComponent }) inputs: QueryList<
    LinkEntryComponent
  >;
  // ANCHOR Not Used
  currentIndex: number;
  // ANCHOR Not Used
  linkInputsSubscription: Subscription;

  linkInputElements: HTMLInputElement[];
  links$: Observable<Link[]>;

  addLink(index?: number) {
    // Inserts at last position if no index is provided
    this.linkService.addLink({ link: '' }, index);
  }

  removeLink(index: number) {
    // Removes at index
    this.linkService.removeLink(index);
  }

  getAllLinks() {
    this.linkService.getAllLinks(this.linkInputElements);
  }

    handleKeyDown(code: number, index: number) {
    switch (code) {
      // Enter
      case 13:
				this.addLink(index)
				// ANCHOR try wrapping with promise
				console.log(this.linkInputElements)
        break;
      // UpArrow
      case 38:
        if (index !== 0) this.linkInputElements[index - 1].focus()
        break;
      // DownArrow
      case 40:
				if (index !== this.inputs.length - 1) this.linkInputElements[index + 1].focus()
        break;
    }
  }

  logQueryList() {
    console.log(this.inputs);
    console.log(this.links$);
  }

  constructor(private linkService: LinkService) {}
  ngOnInit(): void {
    this.links$ = this.linkService.links();
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
