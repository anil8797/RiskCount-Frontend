import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'accordion',
  template:`
  <ng-content></ng-content>
          `,
  styleUrls:['./app-accordion.component.scss'],
  host: {
    'class': 'panel-group'
  }
})
export class Accordion {
  @Input() oneAtaTime:boolean = true;
  groups: Array<AccordionGroup> = [];

  addGroup(group: AccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: AccordionGroup): void {
    if(this.oneAtaTime){
      this.groups.forEach((group: AccordionGroup) => {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  }
  removeGroup(group: AccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}

@Component({
  selector: 'accordion-group',
  template:`
                <div class="panel panel-default app-accordion" [ngClass]="{'panel-open': isOpen}">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <i class="fa" [ngClass]="isOpen ? 'fa-minus' : 'fa-plus'" (click)="toggleOpen($event)"></i> <a tabindex="0"><div [innerHtml] = "inputhtml"></div></a>
                    </h4>
                  </div>
                  <div class="panel-collapse" [@slideInOut]="!isOpen" [style.height.px]="height">
                    <div class="panel-body" #panelbody>
                        <ng-content></ng-content>
                    </div>
                  </div>
                </div>
          `,
  styleUrls:['./app-accordion.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ height: '0' })),
      state('false', style({ height: '*' })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ])
  ]
})
export class AccordionGroup implements OnDestroy, OnInit {
  @ViewChild('panelbody') panelCollapseContainerEl: ElementRef;
  private _isOpen:boolean = false;
  public height: any;
  @Input() heading: any;
  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(this);
    }
  }
  get isOpen() {
    return this._isOpen;
  }
  public get inputhtml() : SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.heading);
  }
  constructor(private accordion: Accordion, private _sanitizer: DomSanitizer) {
    this.accordion.addGroup(this);
  }
  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }
  ngOnInit(){
    this.height = this.panelCollapseContainerEl.nativeElement.offsetHeight + 'px';
  }
  toggleOpen(event): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}

export const APP_ACCORDION = [Accordion , AccordionGroup];
