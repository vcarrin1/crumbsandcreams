import { NgModule } from '@angular/core';

import { CrumbsandcreamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CrumbsandcreamSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CrumbsandcreamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CrumbsandcreamSharedCommonModule {}
