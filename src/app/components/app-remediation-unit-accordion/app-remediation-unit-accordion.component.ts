import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 're-accordion',
  template:`
  <ng-content></ng-content>
          `,
  styleUrls:['./app-remediation-unit-accordion.component.scss'],
  host: {
    'class': 'panel-group'
  }
})
export class ReAccordion {
  @Input() oneAtaTime:boolean = true;
  groups: Array<ReAccordionGroup> = [];

  addGroup(group: ReAccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: ReAccordionGroup): void {
    if(this.oneAtaTime){
      this.groups.forEach((group: ReAccordionGroup) => {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  }
  removeGroup(group: ReAccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}

@Component({
  selector: 're-accordion-group',
  template:`
                <div class="panel panel-default app-accordion" [ngClass]="{'panel-open': isOpen}">
                  <div class="panel-heading">
                    <!--<label class="custom-chkbx">
                      <input name="checkbox" type="checkbox" [(ngModel)]="isSelected" (change)="changeSelection($event)">
                      <div class="control"></div>
                    </label>-->
                    <h4 class="panel-title">
                      <i class="fa" [ngClass]="isOpen ? 'fa-minus' : 'fa-plus'" (click)="toggleOpen($event)"></i> 
                      <a tabindex="0">
                        <div [innerHtml] = "inputhtml" style="width: calc(100% - 95px);display: inline-block;"></div>
                        <div class='panel-buttons align-right' style="display: inline-block;">
                          
                        </div>
                      </a>
                    </h4>
                  </div>
                  <div class="panel-collapse" [@slideInOut]="!isOpen" [style.height.px]="height">
                    <div class="panel-body" #panelbody>
                        <ng-content></ng-content>
                    </div>
                  </div>
                </div>
          `,
  styleUrls:['./app-remediation-unit-accordion.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ height: '0' })),
      state('false', style({ height: '*' })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ])
  ]
})
export class ReAccordionGroup implements OnDestroy, OnInit {
  @ViewChild('panelbody') panelCollapseContainerEl: ElementRef;
  @Output()
  public deleteClick = new EventEmitter<MouseEvent>();
  public _isSelected;boolean = false;
  private _isOpen:boolean = false;
  public height: any;
  @Input() heading: any;
  @Input() isSelected:boolean;
  @Output() selectChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  changeSelection(e) {
    this.isSelected = e.target.checked;
    this.selectChange.emit(this.isSelected);
  }
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
  constructor(private accordion: ReAccordion, private _sanitizer: DomSanitizer) {
    this.accordion.addGroup(this);
  }
  delete(){
    this.deleteClick.emit();
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

export const APP_RE_ACCORDION = [ReAccordion , ReAccordionGroup];
