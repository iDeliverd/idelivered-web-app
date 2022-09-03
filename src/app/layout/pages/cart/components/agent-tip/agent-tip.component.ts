import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalVariable } from './../../../../../core/global';
import { StyleVariables } from './../../../../../core/theme/styleVariables.model';
declare const $;
@Component({
  selector: 'app-agent-tip',
  templateUrl: './agent-tip.component.html',
  styleUrls: ['./agent-tip.component.scss'],
})
export class AgentTipComponent implements OnInit {

  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Input() tips: Array<number>;
  @Input() defaultTip: number = 0;
  @Input() netAmount: number = 0;
  @Output() addedTip: EventEmitter<any> = new EventEmitter<any>();
  currency: string = '';
  total_tip: number = 0;
  selectedTip: number = -1;
  minTipError: boolean = false;

  constructor(

  ) {
    this.currency = GlobalVariable.CURRENCY;

  }

  ngOnInit() {

    if (this.settings && (this.settings.enable_default_agent_tip == 1)) {
      this.addTip(this.defaultTip);
    }

    if (this.settings.enable_custom_agent_tip) {
      this.total_tip = this.settings.custom_agent_tip_min_value || 0;
      if (this.tips.includes(this.total_tip)) {
        this.addTip(this.total_tip);
      }
      else {
        this.addCustomTip();
      }
    }
  }

  addTip(tip: number): void {
    if (this.settings.agentTipPercentage == 1) {
      this.total_tip = 0;
      if (this.selectedTip == tip) {
        this.selectedTip = -1;
      } else {
        this.selectedTip = tip;
      }
      this.addedTip.emit({ tip: this.selectedTip > -1 ? tip : 0, isCustom: false });
    } else {
      if (this.settings.disable_tip_multiple_addition == 0) {
        this.total_tip += tip;
      } else {
        this.selectedTip = tip;
        this.total_tip = tip;
      }
      this.addedTip.emit({ tip: this.total_tip, isCustom: false });
    }
  }

  addCustomTipFromDialog() {
    this.addCustomTip();
  }

  addCustomTip() {
    if (this.settings.enable_custom_agent_tip) {
      if ((Number)(this.total_tip) < this.settings.custom_agent_tip_min_value) {
        return;
      }
      else {
        setTimeout(() => {
          $("#exampleModalCenter").modal('hide');
        }, 4000);
      }
    }
    this.selectedTip = -1;
    this.addedTip.emit({ tip: this.total_tip, isCustom: true });
  }

  customTipChange(event) {
    if (this.settings.enable_custom_agent_tip) {
      this.minTipError = false;
      if (!event || (Number)(this.total_tip) < this.settings.custom_agent_tip_min_value) {
        this.minTipError = true;
        setTimeout(() => {
          this.total_tip = this.settings.custom_agent_tip_min_value;
          this.minTipError = false;
          this.addCustomTip();
        }, 4000);
      }
    }
  }

  calculateAmountPers(tip) {
    var amount = (parseFloat(tip) / 100) * this.netAmount;
    if (amount < this.settings.custom_agent_tip_min_value) {
      amount = this.settings.custom_agent_tip_min_value;
    }
    return (Number)(amount.toFixed(2));
  }

  removeTip(): void {
    this.selectedTip = -1;
    this.total_tip = 0;
    this.addedTip.emit({ tip: this.total_tip, isCustom: false });
  }
  trackByAfternoonFn(id, index) {
    return index;
  }
}
