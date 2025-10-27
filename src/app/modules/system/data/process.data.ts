import { Injectable, inject } from '@angular/core';

import { FsApi, RequestConfig } from '@firestitch/api';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProcessData {
  private _api = inject(FsApi);


  public gets(data: any = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.get('processes', data, { key: 'processes', ...config });
  }

  public post(data: any = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.post('processes', data, { key: 'process', ...config });
  }

  public run(data: any = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.post(`processes/${data.id}/run`, data, { key: 'process', ...config });
  }

  public get(id: number, config: RequestConfig = {}): Observable<any> {
    return this._api.get(`processes/${id}`, {}, { key: 'process', ...config });
  }

  public kill(data: any = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.post(`processes/${data.id}/kill`, data, { key: 'process', ...config });
  }

  public delete(data: any = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.delete(`processes/${data.id}`, data, { key: 'process', ...config });
  }

  public queue(data: any = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.post(`processes/${data.id}/queue`, data, { key: 'process', ...config });
  }

  public download(data: any = {}): void {
    this._api
      .createApiFile(`processes/${data.id}/download`)
      .download();
  }
}
