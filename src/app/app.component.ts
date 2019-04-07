import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Asset } from './asset.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { AssetService } from './service/asset.service';
import { TableComponent } from './components/table/table.component';
import { FilterService } from './components/filter/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MaterialTable';

  assetData: Asset[] = [];
  isLoading = false;
  totalAssetdData = 0;
  assetDataPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20];
  private assetSub: Subscription;
  public displayedColumns = [
    'serialNumber',
    'assetTag',
    'location',
    'assetType',
    'model'
  ];
  @ViewChild('table') table: TableComponent;
  public defaultFilters: any = {
    assetType: ['AT1', 'AT2', 'AT3'],
    location: ['Chennai', 'Bengaluru', 'Mumbai']
  };

  public toRenderTableData = [];
  public dataSource = new MatTableDataSource();
  constructor(
    private assetService: AssetService,
    private filterService: FilterService
  ) {}
  ngOnInit() {
    const _this = this;

    this.filterService.getCurrentFilterObject().subscribe(data => {
      console.log(data);
      this.assetService.getAssetData(
        _this.assetDataPerPage,
        _this.currentPage,
        data
      );
    });

    this.assetSub = this.assetService
      .getAssetsUpdateListener()
      .subscribe((assets: { assetData: Asset[]; assetsCount: number }) => {
        this.toRenderTableData = assets['assetData'];
        this.totalAssetdData = assets['assetsCount'];
        console.log('Render table data', this.toRenderTableData);
      });
  }

  public onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.assetDataPerPage = pageData.pageSize;
    this.assetService.getAssetData(
      this.assetDataPerPage,
      this.currentPage,
      null
    );
  }

  ngOnDestroy() {
    this.assetSub.unsubscribe();
  }
}
