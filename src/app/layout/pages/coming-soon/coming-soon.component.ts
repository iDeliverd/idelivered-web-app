import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrl } from 'src/app/core/apiUrl';
import { HttpService } from 'src/app/services/http/http.service';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GlobalVariable } from 'src/app/core/global';
import * as moment from 'moment';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit, OnDestroy {
  enddate: string = '2021-12-15';
  moreINfoForm: FormGroup;
  submitted = false;
  Submitted = false;
  NotifyForm: FormGroup;
  @ViewChild('childModal') childModal: ElementRef


  _diff: number = 0;
  _days: number = 0;
  _hours: number = 0;
  _minutes: number = 0;
  _seconds: number = 0;

  interval: any;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService,
    private messageService: MessagingService,public dialogRef: DynamicDialogRef,

  ) { }

  ngOnInit() {
    // interval(1000).pipe(
    //   map((x) => {
    //     this._diff = Date.parse(this.enddate) - Date.parse(new Date().toString());
    //   })).subscribe((x) => {
    //     this._days = this.getDays(this._diff);
    //     this._hours = this.getHours(this._diff);
    //     this._minutes = this.getMinutes(this._diff);
    //     this._seconds = this.getSeconds(this._diff);
    //   },(error)=>{
    //     console.log('error', error);
        
    //   });

    // let self = this;
    // this.interval = setInterval(() => {
    //   try {
    //   self.getTime();
    //   }catch(error) {
    //     console.log('promise error')
    //   }
    //   // this._diff = Date.parse(this.enddate) - Date.parse(new Date().toString());
      
    //   //   this._days = this.getDays(this._diff);
    //   //   this._hours = this.getHours(this._diff);
    //   //   this._minutes = this.getMinutes(this._diff);
    //   //   this._seconds = this.getSeconds(this._diff);
    // }, 1000);

    this.moreINfoForm = this.formBuilder.group({
      Username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message : ['',[Validators.required ,Validators.maxLength(1000)]]
    });

    this.NotifyForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]]
    })
  }


  getTime() {    
    this._diff = moment(moment(new Date(this.enddate))).diff(moment());
    let day2 = moment(new Date(this.enddate));
    let diff = day2.fromNow(true);
    console.log('ferferfer', diff);
    

    console.log('');
    
    setTimeout(() => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    }, 1000);
    
    // console.log(moment(val).endOf('day').unix() * 1000)
    // const formatted =  (moment.duration(timeLeft).days() -1)+':'+moment.duration(timeLeft).hours()+':'+moment.duration(timeLeft).minutes()+':'+moment.duration(timeLeft).seconds();
    // return(formatted);
  }

  get f() { return this.moreINfoForm.controls; }

  get k() { return this.NotifyForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.moreINfoForm.invalid) {
      return;
    }
    this.httpService.postData(ApiUrl.sendEmail, {
      receiverEmail: GlobalVariable.EMAIL,
      subject: this.moreINfoForm.controls.Username.value,
      senderEmail : this.moreINfoForm.controls.email.value,
      content:this.moreINfoForm.controls.message.value
    }).subscribe((response) => {
      if (response && response.status == 200) {
        this.messageService.toast('success', 'Email Sent Successfully')
      }
      this.close();
    }, (err) => {
    })

  }

  

  close() {
    this.submitted = false;
    this.childModal.nativeElement.click();
    this.moreINfoForm.reset();
  }

  GetNotify(){
    this.Submitted = true;
    if(this.NotifyForm.invalid){
      return;
    }
    this.httpService.postData(ApiUrl.notifyMe,{
      email : this.NotifyForm.controls.email.value,
    }).subscribe((response) => {
      if (response && response.status == 200) {
        this.messageService.toast('success', 'Email Sent Successfully')
        this.Submitted = false;
        this.NotifyForm.reset();
      }
  }, (err) => {
  })

}

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }


  ngOnDestroy() {
    if(!!this.interval) {
      clearInterval(this.interval);
    }
  }

}


