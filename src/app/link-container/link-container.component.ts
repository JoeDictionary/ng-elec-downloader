import { Component, OnInit, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'link-container',
  templateUrl: './link-container.component.html',
  styleUrls: ['./link-container.component.scss'],
})
export class LinkContainerComponent implements OnInit {
  @ViewChildren('inputs', {read: ElementRef}) inputs: any;
  currentIndex: number;

  links = [
    'https://www.youtube.com/watch?v=9QF2hiU_KXI',
    'https://www.youtube.com/watch?v=nC3fyEfsV2g',
    'https://www.youtube.com/watch?v=nC3fyEfsV2g',
    'https://www.youtube.com/watch?v=nC3fyEfsV2g',
    'https://www.youtube.com/watch?v=nC3fyEfsV2g',
  ];

  snip() {
    this.links.pop();
  }

  remove(index: number) {
    console.log(index);
    this.links.splice(index, 1);
  }

  handleKeyDown(code: number, index: number) {
    // console.log(this.inputs._results[index].nativeElement.selectionStart)
    let selectionStart: number = this.inputs._results[index].nativeElement
      .selectionStart;
    console.log(selectionStart);
    switch (code) {
      case 13:
        this.currentIndex = index;
        if (this.inputs._results[index].nativeElement.value !== '') {
          this.links.splice(index + 1, 0, '');
        }
        break;

      case 38:
        if (index !== 0) {
          let e: any = this.inputs._results[index - 1].nativeElement;
          e.selectionStart = selectionStart;
          e.selectionEnd = selectionStart;
          e.focus();
        }
        break;

      case 40:
        if (index !== this.inputs.length - 1) {
          let e: any = this.inputs._results[index + 1].nativeElement;
          e.selectionStart = selectionStart;
          e.selectionEnd = selectionStart;
          e.focus();
        }
        break;
    }
    // console.log(this.inputs._results[0].nativeElement)
  }

  logQueryList() {
    console.log(this.inputs);
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.inputs.changes.subscribe((value: any) =>
      this.inputs._results[this.currentIndex + 1].nativeElement.focus()
    );
  }
}
