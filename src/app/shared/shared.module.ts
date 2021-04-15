import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchPipe } from './pipes/filter-search.pipe';

@NgModule({
  declarations: [
    FilterSearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterSearchPipe
  ]
})
export class SharedModule { }
