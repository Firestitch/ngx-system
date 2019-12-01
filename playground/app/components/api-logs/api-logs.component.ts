import { Component } from '@angular/core';
import { of } from 'rxjs';


@Component({
  selector: 'api-logs',
  templateUrl: 'api-logs.component.html',
  styleUrls: ['api-logs.component.scss']
})
export class ApiLogsComponent {

  public load = () => {
    return of({"paging":{"limit":25,"records":4,"offset":0},"api_logs":[{"id":4,"create_date":"2019-09-24T11:24:23+00:00","url":"http:\/\/www.www.com","code":200,"direction":null,"reference":null,"message":"done","method":"POST","type":"test","length":0,"state":"success","request":{"dodatasd":"324432432","dsafdsa":"114342432"},"response":{"code":200,"data":"Xxxxx"},"headers":{}},{"id":3,"create_date":"2019-08-13T14:27:20+00:00","url":"http:\/\/www.www.com","code":200,"direction":null,"reference":null,"message":"done","method":"POST","type":"test","length":0,"state":"success","request":{"dodatasd":"324432432","dsafdsa":"114342432"},"response":{"code":200,"data":"Xxxxx"},"headers":{}},{"id":2,"create_date":"2019-08-13T14:27:17+00:00","url":"http:\/\/www.www.com","code":200,"direction":null,"reference":null,"message":"done","method":"POST","type":"test","length":0,"state":"success","request":{"dodatasd":"324432432","dsafdsa":"114342432"},"response":{"code":200,"data":"Xxxxx"},"headers":{}},{"id":1,"create_date":"2019-08-06T13:09:20+00:00","url":"http:\/\/www.www.com","code":200,"direction":null,"reference":null,"message":"done","method":"POST","type":"test","length":0,"state":"success","request":{"dodatasd":"324432432","dsafdsa":"114342432"},"response":{"code":200,"data":"Xxxxx"},"headers":{}}]});
  }
}