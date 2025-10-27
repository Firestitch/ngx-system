import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { FS_BUILD_CONFIG, BuildConfig, UpdateAction } from '@firestitch/build';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsSystemModule } from '@firestitch/package';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { FsFormModule } from '@firestitch/form';
import { FsDialogModule } from '@firestitch/dialog';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsSelectionModule } from '@firestitch/selection';
import { FsFileModule } from '@firestitch/file';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsSystemModule, FormsModule, FsLabelModule, FsFormModule, FsDialogModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsListModule.forRoot(), FsScrollModule.forRoot(), FsDatePickerModule.forRoot(), FsSelectionModule, FsFileModule.forRoot({
            allowDownload: true,
            allowRemove: true,
            dragoverMessage: true,
        })),
        {
            provide: FS_BUILD_CONFIG,
            useFactory: (): BuildConfig => {
                return {
                    updateAction: UpdateAction.PromptUpdate,
                };
            },
        },
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch(err => console.error(err));

