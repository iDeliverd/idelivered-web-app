import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { W3WSettings, What3wordsService } from 'src/app/services/what3words/what3words.service';

declare const what3words:any;

@Component({
  selector: 'app-what3words-suggestions',
  templateUrl: './what3words-suggestions.component.html',
  styleUrls: ['./what3words-suggestions.component.scss']
})
export class What3wordsSuggestionsComponent implements OnInit,OnChanges {
  searchSubscription: Subscription;
  searchText =  new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^\/{0,}[^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[.｡。･・︒។։။۔።।][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[.｡。･・︒។։။۔።।][^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}$/)]));
  foundWords:any[]=[];
  @Input() styleSettings:W3WSettings
  @Output() wordEmit = new EventEmitter<string>();

  constructor(
    private w3wService:What3wordsService
  ) { }

  ngOnInit() {
    if(this.styleSettings.value){
      this.searchText.patchValue(this.styleSettings.value);
    }
    this.searchWords();
  }

  searchWords(){
    this.searchSubscription = this.searchText.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(text => {
     if(text)
    this.w3wService.autosuggest(text).then((response)=> {
        console.log("[autosuggest]", response);
        this.foundWords = response.suggestions;
       
     });
    })
  }

  locateWord(word){
    this.wordEmit.emit(word);
    this.styleSettings.visible = false;
    this.searchText.patchValue(word);
  }

  clickedOutside(){
    setTimeout(()=>{
    this.styleSettings.visible = false;

    },500)
  }

  ngOnChanges(changes:SimpleChanges){
    this.searchText.patchValue(changes.styleSettings.currentValue.value);
  }

}
