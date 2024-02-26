import { Component } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

  public config = {};

  constructor(private message: FsMessage) {}

  public load = (query) => {
    return of([
      {"label":"App Name","group":"","values":null,"interfaceType":"I","instruction":"Human readable name","id":1,"name":"APP_NAME","value":"FS Boilerplate"},
      {"label":"App URL","group":"","values":null,"interfaceType":"I","instruction":"","id":2,"name":"APP_URL","value":"https:\/\/boilerplate.firestitch.com\/"},
      {"label":"Color","group":"","values":null,"interfaceType":"C","instruction":"","id":1,"name":"APP_COLOR","value":"#CB5858"},
      {"label":"From Email Address","group":"SMTP","values":null,"interfaceType":"I","instruction":"","id":7,"name":"SMTP_FROM_EMAIL","value":"noreply@firestitch.com"},
      {"label":"From Email Name","group":"SMTP","values":null,"interfaceType":"I","instruction":"","id":8,"name":"SMTP_FROM_NAME","value":"noreply@firestitch.com"},
      {"label":"AWS Access Key ID","group":"AWS","values":null,"interfaceType":"I","instruction":"","id":9,"name":"AWS_ACCESS_KEY_ID","value":"xxxxxxxxxxxxx"},
      {"label":"AWS Secret Access Key","group":"AWS","values":null,"interfaceType":"I","instruction":"","id":10,"name":"AWS_SECRET_ACCESS_KEY","value":"xxxxxxxxxxxxx"},
      {"label":"AWS Region","group":"AWS","values": this.getAwsRegionValues(),"interfaceType":"D","instruction":"","id":11,"name":"AWS_REGION","value":"us-west-2"},
      {"label":"AWS Region","group":"AWS","values": this.getAwsRegionValues(),"interfaceType":"W","instruction":"","id":11,"name":"AWS_REGION","value":["us-west-2"]},
      {"label":"S3 Bucket","group":"AWS","values":null,"interfaceType":"I","instruction":"","id":12,"name":"S3_BUCKET","value":"firestitch-dev"},
      {"label":"JWT Key","group":"JWT","values":null,"interfaceType":"I","instruction":"","id":14,"name":"JWT_KEY","value":"xxxxxxxxxxxxx"},
      {"label":"App ID","group":"Facebook","values":null,"interfaceType":"I","instruction":"","id":17,"name":"FACEBOOK_APP_ID","value":"xxxxxxxxxxxxx"},
      {"label":"App Secret","group":"Facebook","values":null,"interfaceType":"I","instruction":"","id":18,"name":"FACEBOOK_APP_SECRET","value":"xxxxxxxxxxxxx"},
      {"label":"Client ID","group":"Google","values":null,"interfaceType":"I","instruction":"","id":19,"name":"GOOGLE_CLIENT_ID","value":"xxxxxxxxxxxxx"},
      {"label":"Client Secret","group":"Google","values":null,"interfaceType":"I","instruction":"","id":20,"name":"GOOGLE_CLIENT_SECRET","value":"xxxxxxxxxxxxx"},
      {"label":"API Key","group":"SMTP","values":null,"interfaceType":"I","instruction":"","id":21,"name":"SMTP_API_KEY","value":"xxxxxxxxxxxxx"},
      {"label":"Date","group":"Date","values":null,"interfaceType":"A","instruction":"","id":21,"name":"DATE","value":""},
      {"label":"File","group":"File","interfaceType":"F","instruction":"Png's are only supported","id":21,"name":"DATE","value":"https://cdn.hipwallpaper.com/i/30/77/AKPMDF.jpg"},
      {"label":"Time","group":"Date","interfaceType":"M","instruction":"","id":22,"name":"TIME","value":""}
    ]);
  }

  public save = (group, values) => {
    return of(values);
  }

  public getAwsRegionValues() {
    return {"us-east-1":"US East (N. Virginia)","us-east-2":"US East (Ohio)","us-west-1":"US West (N. California)","us-west-2":"US West (Oregon)","ca-central-1":"Canada (Central)","ap-south-1":"Asia Pacific (Mumbai)","ap-northeast-2":"Asia Pacific (Seoul)","ap-southeast-1":"Asia Pacific (Singapore)","ap-southeast-2":"Asia Pacific (Sydney)","ap-northeast-1":"Asia Pacific (Tokyo)","eu-central-1":"EU (Frankfurt)","eu-west-1":"EU (Ireland)","eu-west-2":"EU (London)","sa-east-1":"South America (S\u00e3o Paulo)"};
  }

  public fileRemove(setting) {
    debugger;
  }

  public fileSelect(event) {
    debugger;
  }
}
