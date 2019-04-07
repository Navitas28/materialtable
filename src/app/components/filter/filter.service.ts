import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterObject = new Subject();
  constructor(){

  }
  getCurrentFilterObject() {
    return this.filterObject;
  }
  setCurrentFilterObject(filters) {
    console.log(filters);
    this.filterObject.next(filters);
  }
}
