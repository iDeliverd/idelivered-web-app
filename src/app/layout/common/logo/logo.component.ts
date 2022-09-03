import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../../shared/models/appSettings.model';
import { UtilityService } from '../../../services/utility/utility.service';
import { GlobalVariable } from '../../../core/global';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit, OnDestroy {

  logoText: string = '';

  settings: AppSettings;

  settingsSubscription: Subscription;

  @Input() width: any = '55%';
  @Input() size: string = '380x180';
  @Input() height: any;
  @Input() logoColor: any;
  @Input() logoPadding: any;
  @Input() logoRadius: any = 5;
  @Input() isLocalLogo: boolean = false;


  local_logo: string = '';


  constructor(
    private util: UtilityService
  ) {
    this.logoText = GlobalVariable.SITE_NAME;
  }

  ngOnInit() {
    this.settingsSubscription = this.util.getSettings.subscribe((settings: AppSettings) => {
      if (!!settings) {
        this.settings = settings;
        if (this.settings.enable_wala_theme && this.isLocalLogo) {
          this.local_logo = '../../../../assets/images/new-home-svc/wala_logo_white.png'
        }
      }
    });
  }

  styleObject(): Object {
    if (this.settings.fix_header_logo_dimensions == 1) {
      this.width = 'auto';
    }
    return {
      'object-fit': this.settings.set_logo_fit_cover == 0 ? 'contain' : 'cover',
      'width': this.width,
      'height': (this.settings.setlogoHeight ? this.settings.logoHeight : this.height) + 'px'
    }
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) this.settingsSubscription.unsubscribe();
  }

}
