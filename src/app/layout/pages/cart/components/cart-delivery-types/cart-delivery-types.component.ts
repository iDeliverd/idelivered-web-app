import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { AppSettings } from '../../../../../shared/models/appSettings.model';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { StyleConstants } from 'src/app/core/theme/styleConstants.model';

@Component({
  selector: 'app-cart-delivery-types',
  templateUrl: './cart-delivery-types.component.html',
  styleUrls: ['./cart-delivery-types.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDeliveryTypesComponent implements OnInit {

  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Input('time_zones_assigned')
  set setTimeSlots(time_zones_assigned) {
    if (time_zones_assigned.length) {
      this.time_zones_assigned = time_zones_assigned;
      this.setSlots(0);
    }
    else {
      this.setSlots(1);
      this.selectDeliveryType.emit(null);
    }
  }

  @Input() viewType: number = 1;
  @Input() loggedIn: boolean = false;

  @Output() selectDeliveryType: EventEmitter<{}> = new EventEmitter<{}>(null);

  time_slots = [];
  saveBtn: StyleConstants;

  slot_obj = {
    selectedTimeSlot: {},
    selectedDel_type: 0
  }

  time_zones_assigned: number[] = [];
  is_supplier_express_delivery_provide: number = 0;

  is_express_hide: boolean = false;

  constructor(

  ) {
    this.saveBtn = new StyleConstants();
  }

  ngOnInit() {
    setTimeout(() => {
      this.saveBtn.backgroundColor = this.style.primaryColor;
      this.saveBtn.borderColor = this.style.primaryColor;
      this.saveBtn.color = '#ffffff';
      this.initializeTimeSlots();
    }, 500);
  }

  onSelectDeliveryType(del: number): void {
    if (this.slot_obj.selectedDel_type == del) {
      return;
    }
    this.slot_obj.selectedDel_type = del;
    if (this.slot_obj.selectedDel_type == 1) {
      this.slot_obj.selectedTimeSlot = {};
      this.selectDeliveryType.emit(del);
    }
    else {
      this.chooseSlot(this.time_slots[0]);
    }
  }


  initializeTimeSlots() {
    this.time_slots = [
      { id: 5, label: '(Within 2 Hours)', time_slot: '', day: 'Express', checked: 0 },
      { id: 1, label: '12 PM - 4 PM', time_slot: '12:00:00', day: 'Today', checked: 0 },
      { id: 2, label: '4 PM - 8 PM', time_slot: '16:00:00', day: 'Today', checked: 0 },
      { id: 3, label: '12 PM - 4 PM', time_slot: '12:00:00', day: 'Tomorrow', checked: 0 },
      { id: 4, label: '4 PM - 8 PM', time_slot: '16:00:00', day: 'Tomorrow', checked: 0 },
    ];
  }



  setSlots(nll?) {
    if (nll) {
      this.time_slots = [];
      return;
    }
    this.initializeTimeSlots();
    this.is_express_hide = false;
    var array = this.time_slots;
    this.time_slots = [];
    array.forEach(element => {
      this.time_zones_assigned.forEach(ele => {
        if (element.id == ele) {
          this.time_slots.push(element);
        }
        if (ele == 5) {
          this.is_supplier_express_delivery_provide = 1;
        }
      });
    });

    var currentHr = new Date().getHours();
    if (currentHr >= 12 && currentHr <= 16) {
      this.time_slots = this.time_slots.filter(x => {
        return x.id != 1;
      })
    }
    if (currentHr >= 16) {
      this.time_slots = this.time_slots.filter(x => {
        return (x.id != 2 && x.id != 1);
      })
    }

    if (currentHr >= 18 || currentHr <= 9) {
      this.time_slots = this.time_slots.filter(x => {
        return (x.id != 5);
      })
      this.is_express_hide = true;
      if (this.time_slots.length > 1) {
        this.time_slots.length -= 1;
      }
    }

    if (this.viewType == 1) {
      this.time_slots = this.time_slots.filter(x => {
        return x.id != 5;
      })
      //this.onSelectDeliveryType(1);
    }
    else {
      if (!this.is_supplier_express_delivery_provide) {
        this.time_slots.unshift({
          id: 5, label: '(Within 2 Hours)', time_slot: '', day: 'Express', checked: 0
        })
      }
    }

  }


  chooseSlot(slot) {
    this.slot_obj.selectedTimeSlot = slot
    this.slot_obj.selectedDel_type = 2

    this.selectDeliveryType.emit(this.slot_obj);
  }



}
