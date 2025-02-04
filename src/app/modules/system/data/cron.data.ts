import { Injectable } from '@angular/core';

import { FsApi } from '@firestitch/api';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CronData {
  constructor(private _fsApi: FsApi) { }

  public create(data = { id: null }) {
    return data;
  }

  public get(cronId: number | string, query = {}): Observable<any> {
    return this._fsApi.get(`system/crons/${cronId}`, query, { key: 'cron' });
  }

  public gets(data = {}, config = {}): Observable<any> {
    return this._fsApi.request('GET', 'system/crons', data, { key: 'cron', ...config });
  }

  public cronLogGets(data = {}, config = {}): Observable<any> {
    return this._fsApi.request('GET', 'system/cronlogs', data, { key: 'cronLogs', ...config });
  }

  public enable(cron, config = {}): Observable<any> {
    return this._fsApi.put(`system/crons/${cron.id}/enable`, cron, { key: 'cron', ...config });
  }

  public disable(cron, config = {}): Observable<any> {
    return this._fsApi.put(`system/crons/${cron.id}/disable`, cron, { key: 'cron', ...config });
  }

  public kill(cron, config = {}): Observable<any> {
    return this._fsApi.put(`system/crons/${cron.id}/kill`, cron, { key: 'cron', ...config });
  }

  public queue(cron, config = {}): Observable<any> {
    return this._fsApi.put(`system/crons/${cron.id}/queue`, cron, { key: 'cron', ...config });
  }

  public run(cron, config = {}): Observable<any> {
    return this._fsApi.put(`system/crons/${cron.id}/run`, cron, { key: 'cron', ...config });
  }

  public bulk(action, processes, config = {}): Observable<any> {
    return this._fsApi.put('system/crons/bulk', {
      action,
      processes,
    }, { key: 'cron', ...config });
  }
}
