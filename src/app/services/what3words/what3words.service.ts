import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ScriptService } from '../script/script.service';
declare const what3words:any;


export interface W3WSettings {
  rounded:boolean;
  width:string;
  value?:string;
  visible?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class What3wordsService {
  isWhat3Words:boolean=false;
  url:string="https://assets.what3words.com/sdk/v3/what3words.js?key=2HGP8TBC";
  script:any;

  constructor( private scriptService:ScriptService) {
   
   }
  
   loadWhat3WordsScript(){
     let scripts:any = document.getElementsByTagName("script");
     for(let script of scripts){
      if(script.src==this.url){
        return false;
      }
     }
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = this.url;
      script.id = "what3words"
       body.appendChild(script);
       this.script = script;
      this.isWhat3Words = true;
      
  }

  async convertTo3Words(lat,lng){
   
    return await what3words.api.convertTo3wa({lat:lat, lng:lng})

    
  //   .then((response)=> {
  //     console.log("[convertTo3wa]", response.words);
  //     this.square = response.square;
  //     this.searchText.patchValue(response.words);
  //  });

  }

  async convertToCoordinates(word:string) {
  
    return await what3words.api.convertToCoordinates(word)

    
  }

  async autosuggest(text:string){
    return await what3words.api.autosuggest(text)
  
  }

  loadScriptFromService(){
    return this.scriptService.loadScript(this.script)
  }


}
