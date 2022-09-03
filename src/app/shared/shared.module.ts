import { ImageCompressionPipe } from './pipes/image-compression.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { QuicklinkModule } from 'ngx-quicklink';

/*************************** Directives *****************************/
import { GoogleplaceDirective } from './directives/googleplace.directive';

/*************************** Pipes *******************************/
import { LocalizationPipe } from './pipes/localization.pipe';
import { SafePipe } from './pipes/safe-DOM.pipe';
import { ImageCompressionDirective } from './directives/image-compression.directive';
import { VgCoreModule } from 'ngx-videogular';
import { VgControlsModule } from 'ngx-videogular';

const directives = [
  GoogleplaceDirective,
  ImageCompressionDirective
]

const pipes = [
  SafePipe,
  LocalizationPipe,
  ImageCompressionPipe
]


@NgModule({
  declarations: [
    ...pipes,
    ...directives
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    QuicklinkModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule
  ],
  exports: [
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    ...directives,
    ...pipes
  ],
  providers: [
    LocalizationPipe,
    MessageService
  ]
})
export class SharedModule { }
