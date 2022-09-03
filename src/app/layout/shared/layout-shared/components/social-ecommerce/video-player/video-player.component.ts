import { UtilityService } from '../../../../../../services/utility/utility.service';
import { AppSettings } from '../../../../../../shared/models/appSettings.model';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
declare const $: any;
@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

    @Input('videoUrl')
    set setvideoUrl(videoUrl) {
        if (videoUrl) {
            this.videoUrl = videoUrl;
            if (videoUrl.includes('?real_stream')) {
                this.videoUrl = videoUrl.replace('?real_stream', '');
            }
            this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        }
    }

    @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
    @Output() closeVideoPlayer = new EventEmitter<boolean>();
    settings: AppSettings;
    videoUrl: any;

    constructor(private util: UtilityService, private domSanitizer: DomSanitizer) {

    }
    ngOnInit() {
        this.util.getSettings.subscribe(settings => {
            if (settings) {
                this.settings = settings;
            }
        });
        this.openModal();
    }

    close() {
        this.closeModal.nativeElement.click();
        this.closeVideoPlayer.emit(false);
    }

    openModal() {
        $("#auth").modal('show');
    }



}