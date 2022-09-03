import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-supplier-document',
  templateUrl: './view-supplier-document.component.html',
  styleUrls: ['./view-supplier-document.component.scss']
})
export class ViewSupplierDocumentComponent implements OnInit {

  description: string = '';
  title: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    this.description = this.config.data.documents;
    this.title = this.config.data.title;
  }

  close() {
    this.dialogRef.close();
  }

}
