import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck } from 'rxjs/operators';
import { getInfo } from 'ytdl-core';


// ANCHOR Get Video-title

@Component({
  selector: 'link-entry',
  templateUrl: './link-entry.component.html',
  styleUrls: ['./link-entry.component.scss'],
})
export class LinkEntryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() inputKeyup = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  inputValue: string;
  inputChange$: Observable<any>;
  inputSubscription: Subscription;
	imgSrc: string;
	title: any;

  getThumbnail(videoLink: string): string {
    if (!videoLink.includes('v=')) {
      null;
    } else {
      let videoId = videoLink.split('v=')[1];
      let withoutPlaylist = videoId.split('&')[0];
      return 'http://img.youtube.com/vi/' + withoutPlaylist + '/0.jpg';
    }
	}

  focusInput() {
    this.input.nativeElement.focus();
  }

  ngAfterViewInit(): void {
		// Automatically focuses input on component-creation
		this.input.nativeElement.focjus()
    // Creates observable on input-element from keyup-event
    this.inputChange$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
			pluck('currentTarget', 'value'),
			debounceTime(1000),
			distinctUntilChanged()
		);
    // Subscribes to observable and watches value of input-element
		this.inputSubscription = this.inputChange$
		.subscribe((val) => {
        this.inputValue = val;
				this.imgSrc = this.getThumbnail(val);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.inputSubscription.unsubscribe();
  }

  constructor() {}

  ngOnInit(): void {}
}
