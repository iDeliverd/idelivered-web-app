import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { GlobalVariable } from 'src/app/core/global';
import { StyleVariables } from 'src/app/core/theme/styleVariables.model';
import { AppSettings } from 'src/app/shared/models/appSettings.model';

@Component({
    selector: 'app-copy-right',
    templateUrl: './copy-right.component.html',
    styleUrls: ['./copy-right.component.css']
})
export class CopyRightComponent implements OnInit, OnDestroy {

    @Input() style: StyleVariables;
    @Input() settings: AppSettings;
    @Input() contact: any = {};

    siteName: string = '';

    copyRightText: string = '';
    whataAppFloatingContant: string = '';

    showWhatsappMsg: boolean = false;


    constructor(

    ) {
        this.siteName = GlobalVariable.SITE_NAME;
    }

    ngOnInit() {
        setTimeout(() => {
            this.setCopyRight();
        }, 2000);
    }


    ngOnDestroy() {

    }


    setCopyRight() {
        if (localStorage.getItem('langData') && JSON.parse(localStorage.getItem('langData'))) {
            var langData = JSON.parse(localStorage.getItem('langData'));
            switch (langData.language_code) {
                case 'en':
                    this.copyRightText = this.settings.copy_right_section_contant;
                    this.whataAppFloatingContant = `Hi, thanks for visting ${this.siteName}! Do you know our current offer and discounts?`;
                    break;
                case 'es':
                    this.copyRightText = this.settings.copy_right_section_contant_ol;
                    this.whataAppFloatingContant = `¡Hola, gracias por visitar ${this.siteName}! ¿Conoces las ofertas y descuentos de hoy?`;
                    break;
                default:
                    this.copyRightText = this.settings.copy_right_section_contant;
                    this.whataAppFloatingContant = `Hi, thanks for visting ${this.siteName}! Do you know our current offer and discounts?`;
                    break;
            }
        }
        else {
            this.copyRightText = this.settings.copy_right_section_contant;
            this.whataAppFloatingContant = `Hi, thanks for visting ${this.siteName}! Do you know our current offer and discounts?`;
        }
    }

    showWhatsappContant() {
        this.showWhatsappMsg = !this.showWhatsappMsg;
    }
    onWhatsApp() {
        window.open(`https://api.whatsapp.com/send?phone=${this.contact.whatsAppNumber}`, '_blank');
    }




}
