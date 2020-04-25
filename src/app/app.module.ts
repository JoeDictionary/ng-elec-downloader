import { ElectronService } from './electron.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkContainerComponent } from './link-container/link-container.component';
import { LinkEntryComponent } from './link-entry/link-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkContainerComponent,
    LinkEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
