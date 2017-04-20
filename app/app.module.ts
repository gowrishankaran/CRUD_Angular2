import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent }  from './app.component';
import { CrudComponent }  from './crud/crud';
import { CrudService }  from './crud.service';

@NgModule({
  imports:   [ BrowserModule, HttpModule, FormsModule, NgbModule.forRoot()],
  providers: [CrudService],
  declarations: [ AppComponent, CrudComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
