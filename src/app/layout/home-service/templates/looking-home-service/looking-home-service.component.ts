import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/core/global';
import { StyleVariables } from 'src/app/core/theme/styleVariables.model';
import { AppSettings } from 'src/app/shared/models/appSettings.model';


@Component({
    selector: 'app-looking-home-service',
    templateUrl: './looking-home-service.component.html',
    styleUrls: ['./looking-home-service.component.css']
})
export class LookingHomeComponent implements OnInit, OnDestroy {

    @Input() settings: AppSettings;
    @Input() style: StyleVariables;
    @Input() showCase?: number;

    registrationUrl: string = '';

    appLink: {
        android: string,
        ios: string;
    }

    constructor(
        private router: Router
    ) {
        this.registrationUrl = `${GlobalVariable.admin_domain}/#!/supplier-registration`;
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.settings) { }
            this.appLink = {
                android: this.settings.android_app_url,
                ios: this.settings.ios_app_url
            }
        }, 2000);
    }


    onGetStarted() {

    }

    trackByRecentlyViewedFn(id, index) {
        return index;
    };
    ngOnDestroy() {

    }
}
