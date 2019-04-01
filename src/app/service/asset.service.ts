import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Asset } from '../asset.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private baseUrl = environment.baseUrl;
  private assets: Asset[] = [];
  private assetsUpdated = new Subject<{
    assetData: Asset[];
    assetsCount: number;
  }>();

  constructor(private http: HttpClient) {}

  public getAssetData(assetsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${assetsPerPage}&page=${currentPage}`;
    const url = `${this.baseUrl}/asset/fetch-assets`;
    this.http.post(url + queryParams, {}).subscribe((response: { assetDataFromDB: Asset[], assetDataLength: number}) => {
      this.assets = response.assetDataFromDB;
      this.assetsUpdated.next({ assetData: [...this.assets], assetsCount: response.assetDataLength});
    },
      error => {
        console.group('getAssetData API is failing:::');
        console.log(error);
        console.groupEnd();
      });
  }

  getAssetsUpdateListener() {
    return this.assetsUpdated.asObservable();
  }
}
