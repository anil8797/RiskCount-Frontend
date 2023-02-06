import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { trigger, transition, animate, style , state} from '@angular/animations'
import {Select2OptionData} from "ng2-select2";
import {Observable} from "rxjs/Observable";
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {saveAs} from "file-saver";
@Component({
  selector: 'app-rcsa-test-documents',
  templateUrl: './rcsa-test-documents.component.html',
  styleUrls: ['./rcsa-test-documents.component.scss'],
  encapsulation: ViewEncapsulation.None,
  /*animations: [
    trigger('SlideInOut', [
      state('inactive', style({transform: 'translate-y(50%)'})),
      state('active' , style({transform:'translate-y(-50%)'})),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
    ])
  ]*/
  animations: [
    trigger('slideInOut', [
      state('true', style({ height: '0' })),
      state('false', style({ height: '*' })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ])
  ]
})
export class RcsaTestDocumentsComponent implements OnInit {
  // risk unit data
  public riskUnitData:any;
  public selectedRiskUnitDto:any;
  public selectedRiskUnit:any;
  public rcsaUnitList:Observable<Array<Select2OptionData>>;
  public rcsaUnitListOptions;
  // rcsa selection data
  public rcsaData:any;
  public selectedRcsaDto:any;
  public selectedRcsa:any;
  public rcsaList:Observable<Array<Select2OptionData>>;
  public rcsaListOptions;

  selectedCategory:any;
  attachmentCategories: any;
  selectedAttachments:any = [];

  rcsaUnitName: any;
  rcsaDate:any;
  state: string = 'inactive';
  pdfSrc: any = './../assets/DASHBOARDVIEW.pdf';
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {
    let riskOptionsArray = [
      {id:'',text:''}
    ];
    this.rcsaUnitList = Observable.create(obs => {
      obs.next(riskOptionsArray);
      obs.complete();
    });
    this.rcsaUnitListOptions = {
      placeholder: { id: '', text: 'Select Risk Unit' }
    };
    this.rcsaList = Observable.create(obs => {
      obs.next(riskOptionsArray);
      obs.complete();
    });
    this.rcsaListOptions ={
      placeholder: { id: '', text: 'Select RCSA' }
    }

    /*this.controlCategories =[
      {
        id: "general",
        displayName: "GENERAL <span>(5)</span>",
        subMenu: ["Document 1", "Document 2", "Document 3"]
      },
      {
        id: "risk_management_planning",
        displayName: "RISK MANAGEMENT - PLANNING (0)",
        subMenu: ["Document 1", "Document 2", "Document 3"]
      },
      {
        id: "risk_management_diligence",
        displayName: "RISK MANAGEMENT - DUE DILIGENCE (1)",
        subMenu: ["Document 1", "Document 2", "Document 3"]
      },
      {
        id: "vendor_contracts",
        displayName: "VENDOR CONTRACTS (5)",
        subMenu: ["Document 1", "Document 2", "Document 3"]
      },
      {
        id: "oversight_accountability",
        displayName: "OVERSIGHT ACCOUNTABILITY (3)",
        subMenu: ["Document 1", "Document 2", "Document 3"]
      }
    ];*/
    this.rcsaUnitName = ['RCSA UNIT-1', 'RCSA UNIT-2', 'RCSA UNIT-3'];
    this.rcsaDate = ['RCSA QX -20XX(mmddyyy-mmddyyy)']
  }
  // create options data for risk dropdown
  createRcsaUnitOptions(data){
    let optionsArray = [];
    if(data && data.length > 0){
      data.forEach(riskunit=>{
        let obj = {
          id :riskunit.id,
          text:riskunit.name
        }
        optionsArray.push(obj);
      });
      this.rcsaUnitList = Observable.create(obs => {
        obs.next(optionsArray);
        obs.complete();
      });
    }
  }
  //get rcsa units  from service
  getRcsaUnits(){
    this.rcsaService.getAllrcsaUnits().subscribe(
      (responseData:any)=>{
        console.log('All business Units :' , responseData);
        if(responseData && responseData.length>0){
          this.riskUnitData = responseData;
          this.appSpinnerService.display(false);
          this.createRcsaUnitOptions(responseData);
        }else{
          this.appSpinnerService.display(false);
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
      }
    )
  }
  // change rcsa based on rcsa  unit selection
  changeRcsaByRiskUnit(){
    this.selectedAttachments = [];
    if(this.selectedRiskUnit != null){
      this.appSpinnerService.display(true);
      this.getRcsaByRcsaUnits(this.selectedRiskUnit);
      let index = this.riskUnitData.findIndex(risk=> risk.id == this.selectedRiskUnit);
      if(index != -1){
        this.selectedRiskUnitDto = this.riskUnitData[index];
      }
    }else{
      this.selectedRiskUnitDto = {};
    }
  }

  // create options data for rcsa dropdown
  createRcsaOptions(data){
    let optionsArray = [];
    if(data && data.length > 0){
      data.forEach(rcsa=>{
        let obj = {
          id :rcsa.rcsaId,
          text:rcsa.rcsaName
        }
        optionsArray.push(obj);
      });
    }
    this.rcsaList = Observable.create(obs => {
      obs.next(optionsArray);
      obs.complete();
    });
  };
  //get rcsa by rcsa unit selection from service
  getRcsaByRcsaUnits(rcsaUnitId){
    this.createRcsaOptions([]);
    this.rcsaService.fetchRcsaByRcsaUnits(rcsaUnitId).subscribe(
      (responseData:any)=>{
        console.log('Rcsa list based on rcsa unit selection:' , responseData);
        if(responseData && responseData.length>0){
          this.rcsaData = responseData;
          this.appSpinnerService.display(false);
          this.createRcsaOptions(responseData);
        }else{
          this.resetRcsaData();
          this.appSpinnerService.display(false);
        }
      },
      (error:any)=>{
        //this.appSpinnerService.display(false);
      },
      ()=>{
        //this.appSpinnerService.display(false);
      }
    )
  };
  resetRcsaData(){
    this.rcsaData = [];
    this.selectedRcsa = null;
    this.selectedRcsaDto = null;
    this.attachmentCategories = [];
    this.selectedCategory = null;
    this.selectedAttachments = [];
  }
  // get attachements counts to display on sidenav
  getAttachmentsCountBasedonRcsaChange(rcsaId){
    this.selectedRcsa = rcsaId;
    let index = this.rcsaData.findIndex(rcsa=> rcsa.rcsaId == this.selectedRcsa);
    if(index != -1){
      this.selectedRcsaDto = this.rcsaData[index];
    }
    this.rcsaService.fetchAttachmentsCategories(rcsaId).subscribe(
      (responseData:any)=>{
        if(responseData){
          console.log(responseData);
          if(responseData){
            this.attachmentCategories = responseData;
            this.selectedCategory = this.attachmentCategories[0];
            this.getAttachments(this.selectedCategory.masterDetailId, rcsaId);
          }else{
            this.appSpinnerService.display(false);
          }
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  // get attachements counts to display on sidenav
  getAttachments(masterDetailId,rcsaId){
    this.rcsaService.fetchAttachmentsByCategory(masterDetailId,rcsaId).subscribe(
      (responseData:any)=>{
        if(responseData){
          console.log(responseData);
          if(responseData){
            this.selectedAttachments = responseData;
          }else{
            this.appSpinnerService.display(false);
            this.selectedAttachments = [];
          }
        }
      },
      (error:any)=>{
        this.selectedAttachments = [];
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  // download attachment
  downloadAttachment(fileId, fileName){
    this.appSpinnerService.display(true);
    this.rcsaService.downloadDocumentAttachment(fileId).subscribe(
      (responseData:any)=>{
        if(responseData){
          this.downloadFile(responseData, fileName);
        }
      },
      (error:any)=>{
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  downloadFile(data, fileName){
    //const blob = data.blob()
    saveAs(data.content, fileName);
  }
  ngOnInit() {
    this.getRcsaUnits();
    this.appSpinnerService.display(true);
  }
  selectAttachmentCategory(item, masterDetailId){
    this.selectedCategory = (this.selectedCategory === item ? null : item);
    this.state = (this.state === 'active' ? 'inactive' : 'active');
    this.getAttachments(masterDetailId, this.selectedRcsa);
  }
  isActive(item){
    return this.selectedCategory === item;
  }
}
