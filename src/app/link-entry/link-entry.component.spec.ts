import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEntryComponent } from './link-entry.component';

describe('LinkEntryComponent', () => {
  let component: LinkEntryComponent;
  let fixture: ComponentFixture<LinkEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
