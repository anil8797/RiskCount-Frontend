import {Component, OnInit, ViewChild} from '@angular/core';
import {RcsaService} from "../../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../../services/common/app-spinner";
import {ModalDirective} from "ngx-bootstrap";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-rcsa-admin-set-inherent-risk',
  templateUrl: './rcsa-admin-set-inherent-risk.component.html',
  styleUrls: ['./rcsa-admin-set-inherent-risk.component.scss']
})
export class RcsaAdminSetInherentRiskComponent implements OnInit {
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;
  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg

  public currentUser : any;
  public inherentRiskCategory: any= [];
  public inherentRiskData: any;
  private chartSettings: any;
  public selectedRisk: any;
  public severityScaleData: any = [];
  public likelihoodScaleData: any = [];
  //inherent risk data
  public inherentRiskValue :any;
  public likelihoodValue:any;
  public severityValue:any;
  public annotation :any = [];
  public selectedSeverityRow : any = "";
  public selectedLikelihoodRow : any = "";
  public alternateScale :any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private _sanitizer: DomSanitizer
  ) {

    /*this.inherentRiskCategory = [
      {
        id: 'conduct',
        displayName: 'CONDUCT',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'operationalRisk',
        displayName: 'OPERATIONAL RISK',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'legalRisk',
        displayName: 'LEGAL RISK',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'enterpriseRiskTheme',
        displayName: 'ENTERPRISE RISK THEME',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'modelRisk',
        displayName: 'MODEL RISK',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'creditRisk',
        displayName: 'CREDIT RISK',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'marketRisk',
        displayName: 'MARKET RISK',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      },
      {
        id: 'treasuryCapitalRisk',
        displayName: 'TREASURY & CAPITAL RISK',
        inherentRiskd1: '5',
        inherentRiskd2: '4',
      }
    ];*/
    this.chartSettings = {
      'theme': 'fint',
      'caption': '',
      'bgcolor': 'FFFFFF',
      'numberprefix': '',
      'numbersuffix': ' ',
      'showborder': '0',
      'showLegend': '0',
      'showvalues': '1',
      'showtooltip': '0',
      'showHoverEffect': '0',
      'showPlotBorder': '1',
      'plotBorderColor': '000000',
      'plotBorderAlpha': '20',
      'xAxisName': 'SEVERITY X-axis',
      'yAxisName': 'LIKELIHOOD Y-axis',

    };
    this.inherentRiskData = {
      chart: Object.assign({}, this.chartSettings),
      "annotations": {
        "width": "660",
        "height": "330",
        "autoScale": "1",
        "showbelow": "0",
        "groups": [
          {
            "id": "inherent-risk-rating",
            "items": this.annotation
          }
        ]
      },
      'rows': {
        'row': [
          {
            'id': '0',
            'label': 'Very High',
            'oriLabel': 'Very High'
          },
          {
            'id': '1',
            'label': 'High',
            'oriLabel': 'High'
          },
          {
            'id': '2',
            'label': 'Medium',
            'oriLabel': 'Medium'
          },
          {
            'id': '3',
            'label': 'Low',
            'oriLabel': 'Low'
          },
          {
            'id': '4',
            'label': 'Very Low',
            'oriLabel': 'Very Low'
          },
          {
            'id': '5',
            'label': 'Likelihood',
            'oriLabel': 'Likelihood'
          }
        ]
      },
      'columns': {
        'column': [
          {
            'id': '0',
            'label': 'Severity',
            'style': {},
            'stepSkipped': false,
            'appliedSmartLabel': false,
            '_ovrStyle': {
              'fontSize': '10px',
              'fontFamily': 'Verdana,sans',
              'lineHeight': '12px',
              'fontWeight': 'normal'
            },
            '_nLineHeight': 14,
            '_cumulativeSum': 14,
            'oriLabel': 'Severity',
            '_sLabel': {
              'text': 'Severity',
              'maxWidth': 50,
              'maxHeight': 157.85,
              'width': 14,
              'height': 12,
              'oriTextWidth': 14,
              'oriTextHeight': 12,
              'oriText': 'Severity',
              'isTruncated': false
            }
          },
          {
            'id': '1',
            'label': 'Very Low',
            'style': {},
            'stepSkipped': false,
            'appliedSmartLabel': true,
            '_ovrStyle': {
              'fontSize': '10px',
              'fontFamily': 'Verdana,sans',
              'lineHeight': '12px',
              'fontWeight': 'normal'
            },
            '_nLineHeight': 14,
            '_cumulativeSum': 14,
            'oriLabel': 'Insignificant',
            '_sLabel': {
              'text': 'Insignificant',
              'maxWidth': 119.25,
              'maxHeight': 157.85,
              'width': 14,
              'height': 12,
              'oriTextWidth': 14,
              'oriTextHeight': 12,
              'oriText': 'Insignificant',
              'isTruncated': false
            }
          },
          {
            'id': '2',
            'label': 'Low',
            'style': {},
            'stepSkipped': false,
            'appliedSmartLabel': true,
            '_ovrStyle': {
              'fontSize': '10px',
              'fontFamily': 'Verdana,sans',
              'lineHeight': '12px',
              'fontWeight': 'normal'
            },
            '_nLineHeight': 14,
            '_cumulativeSum': 28,
            'oriLabel': 'Minor',
            '_sLabel': {
              'text': 'Minor',
              'maxWidth': 119.25,
              'maxHeight': 157.85,
              'width': 14,
              'height': 12,
              'oriTextWidth': 14,
              'oriTextHeight': 12,
              'oriText': 'Minor',
              'isTruncated': false
            }
          },
          {
            'id': '3',
            'label': 'Medium',
            'style': {},
            'stepSkipped': false,
            'appliedSmartLabel': true,
            '_ovrStyle': {
              'fontSize': '10px',
              'fontFamily': 'Verdana,sans',
              'lineHeight': '12px',
              'fontWeight': 'normal'
            },
            '_nLineHeight': 14,
            '_cumulativeSum': 42,
            'oriLabel': 'Moderate',
            '_sLabel': {
              'text': 'Moderate',
              'maxWidth': 119.25,
              'maxHeight': 157.85,
              'width': 14,
              'height': 12,
              'oriTextWidth': 14,
              'oriTextHeight': 12,
              'oriText': 'Moderate',
              'isTruncated': false
            }
          },
          {
            'id': '4',
            'label': 'High',
            'style': {},
            'stepSkipped': false,
            'appliedSmartLabel': true,
            '_ovrStyle': {
              'fontSize': '10px',
              'fontFamily': 'Verdana,sans',
              'lineHeight': '12px',
              'fontWeight': 'normal'
            },
            '_nLineHeight': 14,
            '_cumulativeSum': 56,
            'oriLabel': 'Major',
            '_sLabel': {
              'text': 'Major',
              'maxWidth': 119.25,
              'maxHeight': 157.85,
              'width': 14,
              'height': 12,
              'oriTextWidth': 14,
              'oriTextHeight': 12,
              'oriText': 'Major',
              'isTruncated': false
            }
          },
          {
            'id': '5',
            'label': 'Very High',
            'style': {},
            'stepSkipped': false,
            'appliedSmartLabel': true,
            '_ovrStyle': {
              'fontSize': '10px',
              'fontFamily': 'Verdana,sans',
              'lineHeight': '12px',
              'fontWeight': 'normal'
            },
            '_nLineHeight': 14,
            '_cumulativeSum': 56,
            'oriLabel': 'Extreme',
            '_sLabel': {
              'text': 'Extreme',
              'maxWidth': 119.25,
              'maxHeight': 157.85,
              'width': 14,
              'height': 12,
              'oriTextWidth': 14,
              'oriTextHeight': 12,
              'oriText': 'Extreme',
              'isTruncated': false
            }
          }
        ]
      },
      'dataset': [
        {
          'data': [
            {
              'rowid': '0',
              'columnid': '0',
              'value': '0',
              'displayvalue': '5'
            },
            {
              'rowid': '0',
              'columnid': '1',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '0',
              'columnid': '2',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '0',
              'columnid': '3',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '0',
              'columnid': '4',
              'value': '45',
              'showvalue': '0'
            },
            {
              'rowid': '0',
              'columnid': '5',
              'value': '45',
              'showvalue': '0'
            },
            {
              'rowid': '1',
              'columnid': '0',
              'value': '0',
              'displayvalue': '4'
            },
            {
              'rowid': '1',
              'columnid': '1',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '1',
              'columnid': '2',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '1',
              'columnid': '3',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '1',
              'columnid': '4',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '1',
              'columnid': '5',
              'value': '45',
              'showvalue': '0'
            },
            {
              'rowid': '2',
              'columnid': '0',
              'value': '0',
              'displayvalue': '3'
            },
            {
              'rowid': '2',
              'columnid': '1',
              'value': '35',
              'showvalue': '0'
            },
            {
              'rowid': '2',
              'columnid': '2',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '2',
              'columnid': '3',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '2',
              'columnid': '4',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '2',
              'columnid': '5',
              'value': '45',
              'showvalue': '0'
            },
            {
              'rowid': '3',
              'columnid': '0',
              'value': '0',
              'displayvalue': '2'
            },
            {
              'rowid': '3',
              'columnid': '1',
              'value': '35',
              'showvalue': '0'
            },
            {
              'rowid': '3',
              'columnid': '2',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '3',
              'columnid': '3',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '3',
              'columnid': '4',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '3',
              'columnid': '5',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '4',
              'columnid': '0',
              'value': '1',
              'displayvalue': '1'
            },
            {
              'rowid': '4',
              'columnid': '1',
              'value': '35',
              'showvalue': '0'
            },
            {
              'rowid': '4',
              'columnid': '2',
              'value': '35',
              'showvalue': '0'
            },
            {
              'rowid': '4',
              'columnid': '3',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '4',
              'columnid': '4',
              'value': '5',
              'showvalue': '0'
            },
            {
              'rowid': '4',
              'columnid': '5',
              'value': '15',
              'showvalue': '0'
            },
            {
              'rowid': '5',
              'columnid': '0',
              'value': '0',
              'showvalue': '0'
            },
            {
              'rowid': '5',
              'columnid': '1',
              'value': '1',
              'displayvalue': '1'
            },
            {
              'rowid': '5',
              'columnid': '2',
              'value': '1',
              'displayvalue': '2'
            },
            {
              'rowid': '5',
              'columnid': '3',
              'value': '1',
              'displayvalue': '3'
            },
            {
              'rowid': '5',
              'columnid': '4',
              'value': '1',
              'displayvalue': '4'
            },
            {
              'rowid': '5',
              'columnid': '5',
              'value': '1',
              'displayvalue': '5'
            }
          ]
        }
      ],
      'colorrange': {
        'gradient': '0',
        'color': [
          {
            'minvalue': '0',
            'maxvalue': '1',
            'code': 'f2f2f2',
            'label': 'Default'
          },
          {
            'minvalue': '2',
            'maxvalue': '10',
            'code': 'fde9d9',
            'label': ''
          },
          {
            'minvalue': '10',
            'maxvalue': '25',
            'code': 'ffc000',
            'label': ''
          },
          {
            'minvalue': '25',
            'maxvalue': '40',
            'code': '00b050',
            'label': ''
          },
          {
            'minvalue': '40',
            'maxvalue': '50',
            'code': 'ff0000',
            'label': ''
          }
        ]
      },
    };
    /*this.severityScaleData = [
      {
      'rating': '5',
      'descriptor' : 'Very High',
      'definition' : [
        'Financial loss of &#8377; 100 Million or more Million or more',
        'Long-term or significant negative media coverage; loss of status or market share',
        'Major hearings , prosecution, fines, litigation including class actions, incarceration',
        'Significant injuries or fatalities to employees, customers or vendors',
        'Multiple senior leaders leave'
      ]
      },
      {
        'rating': '4',
        'descriptor' : 'High',
        'definition' : [
          'Financial loss of $ ... Million up to $ ... Million',
          'Long-term major negative media; significant loss of market share and reputation',
          'Reports to regulators requiring major project for corrective action',
          'Care required for employees or third parties, such as customers or vendors',
          'Senior managers leave, high turnover of experience, no longer premier employer'
        ]
      },
      {
        'rating': '3',
        'descriptor' : 'Medium',
        'definition' : [
          'Financial loss of $ ... Million up to $ ... Million',
          'Short-term but impactful negative media coverage',
          'Report of breach to regulator with immediate correction to be implemented ',
          'Medical treatment required for employees, customers or vendors',
          'Widespread staff morale problems and high turnover'
        ]
      },
      {
        'rating': '2',
        'descriptor' : 'Low',
        'definition' : [
          'Financial loss of $ ... Million up to $ ... Million',
          'Reputational damage',
          'Reportable incident to regulator, no strong follow up',
          'No or minor injuries to employees or third parties, such as customers or vendors',
          'General staff morale problems and increase turnover'
        ]
      },
      {
        'rating': '1',
        'descriptor' : 'Very Low',
        'definition' : [
          'Financial loss of $ ... Million up',
          'Local media attention, if at all, quickly remedied',
          'Not immediately reportable to regulator',
          'No injuries to employees or third parties, such as customers or vendors',
          'Isolated staff dissatisfaction can  be managed locally'
        ]
      }]*/
    /*this.likelihoodScaleData = [
      {
        'rating': '5',
        'probability' : 'Very High',
        'probabilityDefinition' : [
          'Frequency of Once a year or more',
          'Likelihood almost certain',
          '90% or greater chance of occurrence over life of asset or project or in a time window'

        ]
      },
      {
        'rating': '4',
        'probability' : 'High',
        'probabilityDefinition' : [
          'Frequency may be Once every 1 to 10 years',
          'Likelihood of happening is high',
          '60% up to 90% chance of occurrence over life of asset or project or annually'

        ]
      },
      {
        'rating': '3',
        'probability' : 'Medium',
        'probabilityDefinition' : [
          'Frequency of Once in 25 to upto 50 years',
          'Medium Possibility of an event',
          '30% up to 60% chance of occurrence'
        ]
      },
      {
        'rating': '2',
        'probability' : 'Low',
        'probabilityDefinition' : [
          'Frequency of Once in 50 to 100 years',
          'Unlikely to happen',
          '10% up to 30% chance of occurrence'

        ]
      },
      {
        'rating': '1',
        'probability' : 'Very Low',
        'probabilityDefinition' : [
          'Frequency of Once in 100 years or less often',
          'Remote chance of happening',
          'Less than 10% chance of occurrence'
        ]
      }
    ];*/
    this.alternateScale =  { 5:0,4:1,3:2,2:3,1:4 };
  }

  showRiskdetails(item) {
    this.selectedRisk = item;
    this.setInherentRiskValue(this.selectedRisk);
  }
  getSeverities(){
    this.appSpinnerService.display(true);
    this.rcsaService.fetchSeverities().subscribe(
      (responseData: any) => {
        console.log('Selected Risk Details',responseData);
        this.severityScaleData = responseData.severityMasters;
      },
      (errorData: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.getLikelihoods();
      }
    );
  };
  getLikelihoods(){
    this.appSpinnerService.display(true);
    this.rcsaService.fetchLikelihoods().subscribe(
      (responseData: any) => {
        console.log('Selected Risk Details',responseData);
        if(responseData){
          this.likelihoodScaleData = responseData.sort((a, b) => {
            if (b.id < a.id) return -1;
            else if (b.id > a.id) return 1;
            else return 0;
          });
        }
      },
      (errorData: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.appSpinnerService.display(false);
        this.getRiskData();
      }
    );
  }

  // get risk data fro the service
  getRiskData(){
    this.appSpinnerService.display(true);
    this.rcsaService.fetchRisk().subscribe(
      (responseData: any) => {
        this.inherentRiskCategory = responseData;
        if(this.selectedRisk != null){
          this.inherentRiskCategory.filter((item:any)=>{
            if(item.id == this.selectedRisk.id){
              this.selectedRisk = item;
            }
          });
        }else {
          this.selectedRisk = this.inherentRiskCategory[0];
        }
        this.setInherentRiskValue(this.selectedRisk);
        console.log('value from service', this.inherentRiskCategory);
      },
      (errorData: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }

  //get inherrent risk data including master
  getinherent(){
    this.rcsaService.getInherentRating(485).subscribe(
      (responseData: any) => {
        console.log('value from service', responseData);
      },
      (errorData: any) => {
      },
      () => {
      }
    );
  };
  // on save click
  onSave(inherentValue,id){
    if(inherentValue.length == 3){
      let array = inherentValue.split(",");
      this.likelihoodValue = array[1];
      this.severityValue = array[0];
      if(this.likelihoodValue <= 5 && this.likelihoodValue > 0 && this.severityValue <= 5 && this.severityValue > 0 && (this.selectedRisk.inherentRiskd1 != null || this.selectedRisk.inherentRiskd2 != null)){
        this.updateInherent(this.likelihoodValue,this.severityValue, id);
      }else if(this.likelihoodValue <= 5 && this.likelihoodValue > 0 && this.severityValue <= 5 && this.severityValue > 0 && (this.selectedRisk.inherentRiskd1 == null && this.selectedRisk.inherentRiskd2 == null)) {
        this.saveInherent(this.likelihoodValue,this.severityValue, id);
      }
    }
  }
  // update the inherrent data from text field on save click to backend
  updateInherent(likelihoodVal, severityVal,id){
    const risk = {
      riskId:id,
      likelihoodMaster: {
        id: likelihoodVal
      },
      severityMaster: {
        id: severityVal
      }
    }
    console.log(risk);
    this.appSpinnerService.display(true);
    this.rcsaService.updateInherentRating(id, risk).subscribe(
      (responseData: any) => {
        console.log('value update inherent', responseData);
        //this.successModalMsg = 'Inherent Risk Rating Saved Successfully';
        //this.successModal.show();
        this.getRiskData();
      },
      (errorData: any) => {
        this.appSpinnerService.display(false);
        //this.errorModalMsg = 'Something went wrong! Please try again.';
        //this.errorModal.show();
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }

  // save the inherrent data from text field on save click and values were not there
  saveInherent(likelihoodVal, severityVal,id){
    const risk = {
      riskId:id,
      likelihoodMaster: {
        id: likelihoodVal
      },
      severityMaster: {
        id: severityVal
      }
    }
    console.log(risk);
    this.appSpinnerService.display(true);
    this.rcsaService.saveInherentRating(risk).subscribe(
      (responseData: any) => {
        console.log('value update inherent', responseData);
        //this.successModalMsg = 'Inherrent Risk Saved Successfully';
        //this.successModal.show();
        this.getRiskData();
      },
      (errorData: any) => {
        this.appSpinnerService.display(false);
        //this.errorModalMsg = 'Something went wrong! Please try again.';
        //this.errorModal.show();
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }

  // set inherent risk value ,  once getting data from backend
  setInherentRiskValue(value){
    this.likelihoodValue = value.inherentRiskd2 ? value.inherentRiskd2 :'';
    this.severityValue = value.inherentRiskd1 ? value.inherentRiskd1 :'';
    this.inherentRiskData.annotations.groups[0].items = [];
    this.inherentRiskValue = "";
    this.selectedSeverityRow = "";
    this.selectedLikelihoodRow = "";
    if(this.likelihoodValue <= 5 && this.likelihoodValue > 0 && this.severityValue <= 5 && this.severityValue > 0 ){
      this.inherentRiskValue = this.severityValue + ',' + this.likelihoodValue;
      this.resetChart(this.severityValue, this.likelihoodValue);
      this.resetSeverityGrid(this.severityValue, this.likelihoodValue);
    }
  }
  //click on severity grid
  onSeverityDataClick(event){
    this.severityValue = event.data.rating;
    if(this.severityValue != null && this.likelihoodValue != null){
      this.resetChart(this.severityValue, this.likelihoodValue);
      this.inherentRiskValue = this.severityValue + ',' + this.likelihoodValue;
    }
  }
  // click on likelihood grid
  onLikelihoodDataClick(event){
    this.likelihoodValue = event.data.id;
    if(this.severityValue != null && this.likelihoodValue != null){
      this.resetChart(this.severityValue, this.likelihoodValue);
      this.inherentRiskValue = this.severityValue + ',' + this.likelihoodValue;
    }
  }
  /*resetChart(a, b){
    let dataArray = this.inherentRiskData.dataset[0].data;
    dataArray.filter((column:any) =>{
      if(column.columnid != 0 && column.rowid != 5){
        column.displayvalue = "";
        column.showvalue = '0';
      }

      if(column.columnid == b && column.rowid == a){
        column.displayvalue = "conduct";
        column.showvalue = '1';
       /!* let annotationObject = {
          type : "image",
          url : "https://static.fusioncharts.com/sampledata/images/round-4.png",
          "x": "$xaxis.label." + b +".x - 10",
          "y": "$yaxis.label."+ a +".y - 10",
          "xScale" : "50",
          "yScale" : "40",
        }
        this.annotation.push(annotationObject);*!/
      }
      if(dataArray.columnid>=1 && dataArray.rowid==5){
        column.displayValue ='test';
        column.showvalue = '1';
      }
    });
    this.inherentRiskData.dataset[0].data = dataArray;
    let annotationObject = {
      type : "image",
      url : "https://static.fusioncharts.com/sampledata/images/round-4.png",
      //x : "$xaxis.label."+ a +".x",
     // y : "$yaxis.label."+ b +".y",
      "x": "$xaxis.label." + b +".x - 10",
      "y": "$yaxis.label."+ a +".y - 10",
      "xScale" : "50",
      "yScale" : "40",
    }
    this.annotation.push(annotationObject);
  }*/

  // reset the grid on the right side with the updated values
  resetSeverityGrid(a,b){
    let severityVal =  this.alternateScale[a];
    let likelihoodVal =  this.alternateScale[b];
    this.selectedSeverityRow = this.severityScaleData[severityVal];
    this.selectedLikelihoodRow = this.likelihoodScaleData[likelihoodVal];
  }
  // reset the chart and set new data
  resetChart(a, b){
    let dataArray = this.inherentRiskData.dataset[0].data;
    dataArray.filter((column:any) => {
      if (column.columnid != 0 && column.rowid != 5) {
        column.displayvalue = "";
        column.showvalue = '0';
      }
      if (column.columnid == a && column.rowid == this.alternateScale[b]) {
        //column.displayvalue = this.selectedRisk.riskType;
        // column.showvalue = '1';
        this.annotation = [];
        let annotationObject = {
          type : "image",
          url : "./assets/img/square.svg",
          "x": "$xaxis.label." + a +".x - 10",
          "y": "$yaxis.label."+ this.alternateScale[b] +".y - 10",
          "xScale" : "16",
          "yScale" : "16",
        }
        this.annotation.push(annotationObject);
        this.inherentRiskData.annotations.groups[0].items = this.annotation;
        console.log(this.inherentRiskData.annotations)
      }
    });
  }
  // on changing input values from frontend
  onInherentRiskValueChange(value){
    if(value.length == 3){
      let array = value.split(",");
      this.likelihoodValue = array[1];
      this.severityValue = array[0];
      if(this.likelihoodValue <= 5 && this.likelihoodValue > 0 && this.severityValue <= 5 && this.severityValue > 0 ){
       this.resetChart(this.severityValue, this.likelihoodValue);
       this.resetSeverityGrid(this.severityValue, this.likelihoodValue);
      }
    }
  }

  ngOnInit() {
    this.getSeverities();
    this.currentUser = JSON.parse(localStorage.getItem('loggedInUserObject'));
  }
}
