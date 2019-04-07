import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { AssetService } from 'src/app/service/asset.service';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor(private assetService: AssetService, private filterService: FilterService) {}
  public displayOrder: any = [
    { key: 'assetType', name: 'Asset Type' },
    { key: 'location', name: 'Location' }
  ];
  public filters: any = {
    assetType: [],
    location: []
  };

  public selectedFilters: any = {
    location: {},
    assetType: {}
  };
  public filterArray: any = {
    location: [],
    assetType: []
  };
  loadFilters() {
    this.filterService.setCurrentFilterObject(this.filterArray);
  }
  ngOnInit() {
    console.log(this.filterArray);
    this.filters = {
      assetType: [
        { id: 1, name: 'AT1' },
        { id: 2, name: 'AT2' },
        { id: 3, name: 'AT3' }
      ],
      location: [
        { id: 'Bengaluru', name: 'Bengaluru' },
        { id: 'Chennai', name: 'Chennai' },
        { id: 3, name: 'Delhi' }
      ]
    };
    this.loadFilters();
  }

  onFilterSelect(event: Event) {
    this.buildFilterArray();
    this.loadFilters();
  }
  buildFilterArray() {
    const filterArray = {};
    for (const filter of Object.keys(this.selectedFilters)) {
      filterArray[filter] = [];
      for (const selectedFilter of Object.keys(this.selectedFilters[filter])) {
        if (this.selectedFilters[filter][selectedFilter]) {
          filterArray[filter].push(selectedFilter);
        }
      }
    }
    this.filterArray = filterArray;
  }
}
