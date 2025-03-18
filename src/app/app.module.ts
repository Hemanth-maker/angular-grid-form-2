import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule} from 'ag-grid-angular';


  
import {
  ModuleRegistry,
  AllCommunityModule,
  RowSelectionModule
} from 'ag-grid-community'; 
import { ClientSideRowModelModule } from 'ag-grid-community'; 
ModuleRegistry.registerModules([ RowSelectionModule, ClientSideRowModelModule, AllCommunityModule ]); 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
