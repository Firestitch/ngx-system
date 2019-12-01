import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

  public config = {};

  constructor(private message: FsMessage) {
  }

  public load = () => {
    return of([{"data_type":"S","label":"App Name","group":"","values":null,"interface_type":"I","instruction":"","id":1,"name":"APP_NAME","value":"FS Boilerplate"},{"data_type":"S","label":"App URL","group":"","values":null,"interface_type":"I","instruction":"","id":2,"name":"APP_URL","value":"https:\/\/boilerplate.firestitch.com\/"},{"data_type":"S","label":"From Email Address","group":"SMTP","values":null,"interface_type":"I","instruction":"","id":7,"name":"SMTP_FROM_EMAIL","value":"noreply@firestitch.com"},{"data_type":"S","label":"From Email Name","group":"SMTP","values":null,"interface_type":"I","instruction":"","id":8,"name":"SMTP_FROM_NAME","value":"noreply@firestitch.com"},{"data_type":"S","label":"AWS Access Key ID","group":"AWS","values":null,"interface_type":"I","instruction":"","id":9,"name":"AWS_ACCESS_KEY_ID","value":"xxxxxxxxxxxxx"},{"data_type":"S","label":"AWS Secret Access Key","group":"AWS","values":null,"interface_type":"I","instruction":"","id":10,"name":"AWS_SECRET_ACCESS_KEY","value":"xxxxxxxxxxxxx"},{"data_type":"A","label":"AWS Region","group":"AWS","values":{"us-east-1":"US East (N. Virginia)","us-east-2":"US East (Ohio)","us-west-1":"US West (N. California)","us-west-2":"US West (Oregon)","ca-central-1":"Canada (Central)","ap-south-1":"Asia Pacific (Mumbai)","ap-northeast-2":"Asia Pacific (Seoul)","ap-southeast-1":"Asia Pacific (Singapore)","ap-southeast-2":"Asia Pacific (Sydney)","ap-northeast-1":"Asia Pacific (Tokyo)","eu-central-1":"EU (Frankfurt)","eu-west-1":"EU (Ireland)","eu-west-2":"EU (London)","sa-east-1":"South America (S\u00e3o Paulo)"},"interface_type":"D","instruction":"","id":11,"name":"AWS_REGION","value":"us-west-2"},{"data_type":"S","label":"S3 Bucket","group":"AWS","values":null,"interface_type":"I","instruction":"","id":12,"name":"S3_BUCKET","value":"firestitch-dev"},{"data_type":"S","label":"JWT Key","group":"JWT","values":null,"interface_type":"I","instruction":"","id":14,"name":"JWT_KEY","value":"xxxxxxxxxxxxx"},{"data_type":"S","label":"App ID","group":"Facebook","values":null,"interface_type":"I","instruction":"","id":17,"name":"FACEBOOK_APP_ID","value":"xxxxxxxxxxxxx"},{"data_type":"S","label":"App Secret","group":"Facebook","values":null,"interface_type":"I","instruction":"","id":18,"name":"FACEBOOK_APP_SECRET","value":"xxxxxxxxxxxxx"},{"data_type":"S","label":"Client ID","group":"Google","values":null,"interface_type":"I","instruction":"","id":19,"name":"GOOGLE_CLIENT_ID","value":"xxxxxxxxxxxxx"},{"data_type":"S","label":"Client Secret","group":"Google","values":null,"interface_type":"I","instruction":"","id":20,"name":"GOOGLE_CLIENT_SECRET","value":"xxxxxxxxxxxxx"},{"data_type":"S","label":"API Key","group":"SMTP","values":null,"interface_type":"I","instruction":"","id":21,"name":"SMTP_API_KEY","value":"xxxxxxxxxxxxx"}]);
  }

  public save = (group, values) => {
    return of(values);
  }
}
