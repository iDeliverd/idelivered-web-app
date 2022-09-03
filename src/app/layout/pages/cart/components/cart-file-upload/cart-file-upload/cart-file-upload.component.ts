import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../../services/http/http.service';
import { ApiUrl } from '../../../../../../core/apiUrl';
import { GlobalVariable } from '../../../../../../core/global';
import { MessagingService } from '../../../../../../services/messaging/messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from '../../../../../../shared/models/appSettings.model';
import { StyleVariables } from '../../../../../../core/theme/styleVariables.model';
import {  Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {audioUpload} from '../../../../../../shared/models/audioUpload.model';

@Component({
  selector: 'app-cart-file-upload',
  templateUrl: './cart-file-upload.component.html',
  styleUrls: ['./cart-file-upload.component.scss']
})
export class CartFileUploadComponent implements OnInit {
  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Input() loggedIn: boolean = false;
  @Output() prescriptionAudio: EventEmitter<audioUpload> = new EventEmitter<audioUpload>(null);

  file: Array<any> = [];
  fileType: Array<string> = [];
  loading: boolean = false;


  constructor(private http: HttpService,
    private message: MessagingService,
    private translate: TranslateService) { 
      this.fileType = GlobalVariable.fileType;
    }

  ngOnInit() {
  }
  onfileSelect(event: any): void {
    if (!this.loggedIn) {
      this.message.alert('warning', this.translate.instant('Please Login To Continue'));
      return;
    }

    if (this.file.length > 4) {
      this.message.alert('warning', this.translate.instant('You Cannot Upload More Than 5 Images'));
      return;
    }

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (this.fileType.includes(file.type)) {
        if ((file.size / Math.pow(10240, 2)) <= 1) {
          this.uploadFile(event.target.files[0]);
        } else this.message.toast('warning', this.translate.instant('Image Size Must Be Less Than 10mb'));
      } else this.message.toast('warning', this.translate.instant('Invalid File Type'));
    }
  }

  uploadFile(file: any): void {
    this.loading = true;
    let formData = this.http.appendFormData({ file: file });
    this.http.postData(ApiUrl.uploadPaymentReceipt, formData)
      .subscribe(response => {
        if (!!response && response.data) {
          this.file.push(response.data);
          this.prescriptionAudio.emit(new audioUpload(this.file));
        }
        this.loading = false;
      }, err => { 
        console.log(err);
        this.message.toast('warning', this.translate.instant('Some Thing Went Wrong Please Try Again'));
        this.loading = false; });
  }

  removeImage(i: number): void {
    this.file.splice(i, 1);
    this.prescriptionAudio.emit(new audioUpload(this.file));
  }

}
