import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
  MatListModule,
  MatCheckboxModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './pagcomponents/pagination/pagination.component';
import { FilterService } from './components/filter/filter.service';
@NgModule({
  declarations: [AppComponent, FilterComponent, TableComponent, PaginationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
