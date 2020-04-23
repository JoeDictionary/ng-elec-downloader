import { LinkService, Link } from './../link.service';
import { LinkEntryComponent } from './../link-entry/link-entry.component';
import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { map } from 'rxjs/operators';
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
  currentIndex: number;
  linkInputElements: any;
  linkInputsSubscription: Subscription;
  links: Observable<Link[]>;

  addLink(index?: number) {
    // Inserts at last position if no index is provided
    // let insert = index === undefined ? this.links.length - 1 : index + 1;
    // this.links.splice(insert, 0, '');
    this.linkService.addLink({ link: 'keke' }, index);
  }

  removeLink(index: number) {
    // Removes element from this.links at index
    // this.links.splice(index, 1);
    this.linkService.removeLink(index);
  }

  /*   handleKeyDown(code: number, index: number) {
    switch (code) {
      // Enter
      case 13:
				this.links.splice(index + 1, 0, '');
				this.inputs.toArray()[index].focusInput()
        break;
      // DownArrow
      case 38:
        // if (index !== 0)
        break;
      // UpArrow
      case 40:
        // if (index !== this.inputs.length - 1)
        break;
    }
  } */

  logQueryList() {
    console.log(this.inputs);
    console.log(this.links);
  }

  constructor(private linkService: LinkService) {}
  ngOnInit(): void {
    this.links = this.linkService.getLinks();
  }
  ngAfterViewInit(): void {
    this.inputs.changes
      .pipe(
        // Extracts only the input-elements from the QueryList
        map((e) => e.toArray().map((r) => r.input.nativeElement))
      )
      .subscribe((val) => {
        this.linkInputElements = val;
      });
    // this.inputs.first.focusInput()
  }
}

/*   handleKeyDown(code: number, index: number) {
    switch (code) {
      // Enter
      case 13:
        this.currentIndex = index;
        if (this.inputs._results[index].nativeElement.value !== '') {
          this.links.splice(index + 1, 0, '');
          this.inputs[index + 1].focus();
        }
        break;
      // DownArrow
      case 38:
        if (index !== 0) {
          let e: any = this.inputs._results[index - 1].nativeElement;
          e.focus();
        }
        break;
      // UpArrow
      case 40:
        if (index !== this.inputs.length - 1) {
          let e: any = this.inputs._results[index + 1].nativeElement;
          e.focus();
        }
        break;
    }
	}
 */
