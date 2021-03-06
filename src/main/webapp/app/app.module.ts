import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CrumbsandcreamSharedModule } from 'app/shared';
import { CrumbsandcreamCoreModule } from 'app/core';
import { CrumbsandcreamAppRoutingModule } from './app-routing.module';
import { CrumbsandcreamHomeModule } from './home/home.module';
import { CrumbsandcreamAccountModule } from './account/account.module';
import { CrumbsandcreamEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { CrumbsandcreamAppBakeryDetailsModule } from 'app/bakery-details';
import { CrumbsandcreamAppMenuModule } from 'app/menu';
import { CrumbsandcreamAppAboutModule } from 'app/about';

@NgModule({
    imports: [
        BrowserModule,
        CrumbsandcreamAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        CrumbsandcreamSharedModule,
        CrumbsandcreamCoreModule,
        CrumbsandcreamHomeModule,
        CrumbsandcreamAccountModule,
        CrumbsandcreamEntityModule,
        CrumbsandcreamAppAboutModule,
        CrumbsandcreamAppMenuModule,
        CrumbsandcreamAppBakeryDetailsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class CrumbsandcreamAppModule {}
