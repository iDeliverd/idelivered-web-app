import { UtilityService } from './../../../services/utility/utility.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ApiUrl } from 'src/app/core/apiUrl';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-privacy-terms',
  templateUrl: './privacy-terms.component.html',
  styleUrls: ['./privacy-terms.component.scss']
})
export class PrivacyTermsComponent implements OnInit {

  heading: string = '';
  terms: string;
  settings: any = {};
  customData: any = [];
  type: string = '';
  flag: number = null;

  @ViewChildren('customcontent') targetDiv;
  additionalFieldHeading: any = [];

  constructor(
    private route: ActivatedRoute,
    private util: UtilityService,
    private http: HttpService,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {

    let langData = this.util.getLocalData('langData', true) || { id: this.util.handler.languageId };
    let type = this.route.snapshot.data.type;

    this.setHeading(type);
    this.util.getSettings.subscribe((settings) => {
      if (settings) {
        this.settings = settings;
        
      }
    });

    this.route.params.subscribe(params => {
      this.flag = (Number)(params['flag']);
      if(!!this.flag) {
        this.setAdditionalData(langData.id, type);
      }
    })

    if (this.settings && this.settings.enable_custom_pages == 0) {
      if(!this.flag) {
        let data = this.route.snapshot.data.termsAndPolicy;
        let termsAndPolicy = data.find(item => item.language_id == langData.id);
        this.setData(termsAndPolicy, type);
      }
    } else {
      
      this.setCustomData(type)
    }

  }

  setAdditionalData(lang_id, type) {
    let data = this.route.snapshot.data.termsAndPolicy;
    let termsAndPolicy: any;

    if(!!data || !!data.length) {
      termsAndPolicy = data.find(item => item.language_id == 14);
      this.additionalFieldHeading = JSON.parse(termsAndPolicy.additional_dynamic_fields);
      this.setData(termsAndPolicy, type, lang_id);
    }
  }

  setData(termsAndPolicy, type, lang_id?:any) {
    // if (this.settings.enable_adding_multiplefields_in_web == 1) {
    //   this.additionalFieldHeading = JSON.parse(termsAndPolicy.additional_dynamic_fields);
    // }

    switch (type) {
      case 1:
        this.terms = termsAndPolicy['terms_and_conditions'];
        this.heading = 'Terms And Conditions'
        break;
      case 2:
        this.terms = termsAndPolicy['faq'];
        this.heading = 'Privacy Policy'
        break;
      case 3:
        this.terms = termsAndPolicy['about_us'];
        this.heading = 'About Us'
        break;
      case 4:
        this.terms = termsAndPolicy['faqs'];
        this.heading = "FAQ's"
        break;
      case 6:
        this.terms = termsAndPolicy['cancellation_and_refund'];
        this.heading = "Cancellation And Refund Policy"
        break;
      case 7:
        this.terms = termsAndPolicy['cookie_policy'];
        this.heading = "Cookie Policy"
        break;
      case 8:
        let flag = this.flag ? this.flag : 0;
        let data = (!lang_id || lang_id == 14) ? 'english' : 'other';
        this.terms = this.additionalFieldHeading[flag - 1].description[data];
        this.heading = this.additionalFieldHeading[flag - 1].heading[data];
        break;
      case 9:
        this.terms = termsAndPolicy['user_terms_and_condition'];
        this.heading = 'Terms And Conditions'
        break;
        
    }
  }

  // setCustomData(type) {

  //   this.http.getData(ApiUrl.getCustomPageData, { type: this.type }, true, false).toPromise().then((response)=>{
  //       this.customData = response.data.list;
  //       setTimeout(()=>{
  //         if(this.customData.length>0){
  //           this.targetDiv.nativeElement.children[0].style="color: rgb(123, 136, 152);font-size: 20px;font-family: Arial Black";
      
  //         }
  //       },1500)
        
     
  //   }).catch((err)=>console.log(err));
   
  // }

  setCustomData(type) {
 
    this.http.getData(ApiUrl.getCustomPageData, { type: this.type }, true, false).toPromise().then((response)=>{
        this.customData = response.data.list;
        setTimeout(()=>{
          if(this.customData.length>0){
            if(this.targetDiv!=undefined){
              this.customData.forEach((element,index) => {
                this.targetDiv.toArray()[index].nativeElement.children[0].style.fontSize = "20px";
                this.targetDiv.toArray()[index].nativeElement.children[0].style.color = "#000";
              });
            }
           
          }
        },1500)
        
     
    }).catch((err)=>console.log(err));
   
  }

  setHeading(type) {
    switch (type) {
      case 1:
        this.heading = 'Terms And Conditions';
        this.type = 'terms';
        break;
      case 2:
        this.heading = 'Privacy Policy';
        this.type = 'privacy_policy';
        break;
      case 3:
        this.heading = 'About Us';
        this.type = 'about';
        break;
      case 4:
        this.heading = "FAQ's";
        this.type = "faq";
        break;
      case 5:
        this.heading = "How It Works";
        this.type = "how_it_work";
        break;
    }
  }

  scrollTo(elementId) {
    let element = this.document.getElementById(elementId);
    element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  
}
 
