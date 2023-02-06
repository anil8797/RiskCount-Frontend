import {SanitizeHtmlPipe} from "../../pipes/safeHtml.pipe";
import {NgModule} from "@angular/core";
import {FilterPipe} from "../../pipes/filter.pipe";
import {MomentModule} from "angular2-moment";

@NgModule({
  imports: [
  ],
  declarations: [
    SanitizeHtmlPipe,
    FilterPipe
  ],
  exports: [
    SanitizeHtmlPipe,
    FilterPipe
  ]
})
export class SharedComponentModule {}
