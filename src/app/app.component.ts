import { Component, OnInit, OnDestroy } from '@angular/core';
import { Asset } from './asset.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { AssetService } from './service/asset.service';

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
  public dataSource = new MatTableDataSource();
  constructor(private assetService: AssetService) {}
  ngOnInit() {
    this.assetService.getAssetData(this.assetDataPerPage, this.currentPage);
    this.assetSub = this.assetService
      .getAssetsUpdateListener()
      .subscribe((assets: { assetData: Asset[]; assetsCount: number }) => {
        const toRenderTableData = assets['assetData'];
        this.totalAssetdData = assets['assetsCount'];
        this.dataSource.data = toRenderTableData;
      });
  }

  public onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.assetDataPerPage = pageData.pageSize;
    this.assetService.getAssetData(this.assetDataPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.assetSub.unsubscribe();
  }
}
