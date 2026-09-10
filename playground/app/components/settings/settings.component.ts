import { Component, inject } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { of } from 'rxjs';
import { SettingsComponent as SettingsComponent_1 } from '../../../../src/app/modules/system/components/settings/settings.component';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss'],
    standalone: true,
    imports: [SettingsComponent_1]
})
export class SettingsComponent {
  private message = inject(FsMessage);


  public config = {};

  public load = (query) => {
    return of([
      {"label":"App Name","group":"","values":null,"interfaceType":"I","instruction":"Human readable name","id":1,"name":"APP_NAME","value":"FS Boilerplate"},
      {"label":"App URL","group":"","values":null,"interfaceType":"I","instruction":"","id":2,"name":"APP_URL","value":"https:\/\/boilerplate.firestitch.com\/"},
      {"label":"Color","group":"","values":null,"interfaceType":"C","instruction":"","id":1,"name":"APP_COLOR","value":"#CB5858"},
      {"label":"Linkify: Basic","group":"","values":null,"interfaceType":"I","instruction":"Create your account at https://boilerplate.firestitch.com/signup before saving","id":100,"name":"LINKIFY_BASIC","value":""},
      {"label":"Linkify: Query String","group":"","values":null,"interfaceType":"I","instruction":"Open http://boilerplate.firestitch.com/settings?variable=something&group=general to review the current values","id":101,"name":"LINKIFY_QUERY","value":""},
      {"label":"Linkify: Punctuation","group":"","values":null,"interfaceType":"I","instruction":"Docs are at https://firestitch.com/docs. Support (https://firestitch.com/support) is available too.","id":102,"name":"LINKIFY_PUNCTUATION","value":""},
      {"label":"Linkify: Multiple","group":"","values":null,"interfaceType":"T","instruction":"Compare https://firestitch.com/pricing with https://firestitch.com/enterprise#plans, then email support@firestitch.com","id":103,"name":"LINKIFY_MULTIPLE","value":""},
      {"label":"Linkify: Not Linked","group":"","values":null,"interfaceType":"I","instruction":"ftp://files.firestitch.com, www.firestitch.com and <b>markup</b> are left as plain text","id":104,"name":"LINKIFY_IGNORED","value":""},
      {"label":"Instructions: Full Markdown","group":"Instructions","values":null,"interfaceType":"I","instruction":"Click the help icon for the full setup steps","id":200,"name":"INSTRUCTIONS_FULL","value":"","instructions":this.getGoogleInstructions()},
      {"label":"Instructions: Headings","group":"Instructions","values":null,"interfaceType":"I","instruction":"Every heading level, one to six","id":201,"name":"INSTRUCTIONS_HEADINGS","value":"","instructions":"# Heading One\nIntro paragraph under the top heading.\n\n## Heading Two\n### Heading Three\n#### Heading Four\n##### Heading Five\n###### Heading Six\nA closing paragraph so the last heading has something under it."},
      {"label":"Instructions: Ordered List","group":"Instructions","values":null,"interfaceType":"I","instruction":"Numbered steps, including a list that does not start at one","id":202,"name":"INSTRUCTIONS_ORDERED","value":"","instructions":"## Steps\n1. Open the provider console.\n2. Create a new application. This step wraps across\n   two source lines to show that an indented continuation\n   joins the item above it rather than starting a new one.\n3. Copy the generated key.\n\n## Continuing Later\n7. Numbering picks up where the previous section left off.\n8. The list starts at seven rather than one."},
      {"label":"Instructions: Unordered List","group":"Instructions","values":null,"interfaceType":"T","instruction":"Both bullet markers, plus a nested paragraph","id":203,"name":"INSTRUCTIONS_UNORDERED","value":"","instructions":"You will need the following before you start:\n\n- An administrator account on the provider\n- A verified domain\n* An asterisk also starts a bullet\n* Billing enabled on the account\n\nOnce you have all four, continue to the next setting."},
      {"label":"Instructions: Inline Formatting","group":"Instructions","values":null,"interfaceType":"I","instruction":"Bold, inline code, and a code span holding a url","id":204,"name":"INSTRUCTIONS_INLINE","value":"","instructions":"Set **Authorized redirect URI** to `https://boilerplate.firestitch.com/auth/callback` exactly — a url inside backticks is shown, not linked.\n\nThe scope is `openid email profile` and the grant type is **authorization_code**.\n\nA long value such as `arn:aws:iam::123456789012:role/firestitch-production-deployment-role` wraps instead of widening the dialog."},
      {"label":"Instructions: Links","group":"Instructions","values":null,"interfaceType":"I","instruction":"Bare urls, trailing punctuation, and text left as-is","id":205,"name":"INSTRUCTIONS_LINKS","value":"","instructions":"Start at https://console.cloud.google.com/apis/credentials?project=firestitch and sign in.\n\nDocs are at https://firestitch.com/docs. Support (https://firestitch.com/support) is available too — the trailing period and bracket stay out of the link.\n\nftp://files.firestitch.com, www.firestitch.com and <b>markup</b> are left as plain text."},
      {"label":"Instructions: File Setting","group":"Instructions","values":null,"interfaceType":"F","instruction":"Instructions on a file setting show beside the label","id":206,"name":"INSTRUCTIONS_FILE","value":"","instructions":"## Logo Requirements\n\n- **Format** — PNG with a transparent background\n- **Size** — at least `512x512`, no larger than 2 MB\n- **Shape** — square; anything else is letterboxed\n\nExport presets are documented at https://firestitch.com/docs/branding."},
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

  /**
   * A realistic set of setup steps — the case the instructions dialog exists for:
   * work that has to happen in another product before a value can even be obtained.
   */
  public getGoogleInstructions() {
    return [
      '# Google OAuth Setup',
      '',
      'These steps produce the **Client ID** and **Client Secret** used by the Google group below.',
      '',
      '## Create the Project',
      '',
      '1. Sign in to https://console.cloud.google.com with an account that can create projects.',
      '2. Create a project named after your environment, ie. `firestitch-production`.',
      '3. Open **APIs & Services → OAuth consent screen** and choose **External**.',
      '',
      '## Configure the Consent Screen',
      '',
      '1. Set the application name to the value of the `APP_NAME` setting.',
      '2. Add your support email and developer contact address.',
      '3. Add the scopes `openid`, `email` and `profile`. Any scope beyond these three',
      '   puts the application into verification review, which takes several days.',
      '4. Add your domain under **Authorized domains**.',
      '',
      '## Create the Credentials',
      '',
      '1. Open **Credentials → Create Credentials → OAuth client ID**.',
      '2. Choose **Web application** as the application type.',
      '3. Add the redirect URI `https://boilerplate.firestitch.com/auth/google/callback`.',
      '   It must match exactly, including the scheme and any trailing slash.',
      '4. Copy the generated values into the settings below.',
      '',
      '## Notes',
      '',
      '- Credentials are per-project, so staging and production each need their own.',
      '- Rotating a secret takes effect immediately and signs out every active session.',
      '- Quotas and pricing are documented at https://developers.google.com/identity/protocols/oauth2.',
    ].join('\n');
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
