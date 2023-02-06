import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {Observable} from "rxjs/Observable";
import {Select2OptionData} from "ng2-select2";
import {DataTransferService} from "../../../services/data-transfer/data-transfer.service";

@Component({
  selector: 'app-rcsa-unit-rm-view',
  templateUrl: './rcsa-unit-rm-view.component.html',
  styleUrls: ['./rcsa-unit-rm-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaUnitRmViewComponent implements OnInit {
  private userObj:any;
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;
  @ViewChild('extendEndDate') public extendEndDateModal: ModalDirective;
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

  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg
  public rcsaStartStatus:boolean = false;
  public rcsaStatusMessage:any = "";
  public rcsaInProgress:boolean = true;
  chartSettings:object;
  chartSettingsForHeatmap :any;
  distributionChartData:any;
  public heatMapChartWidth:any = 440;
  public heatMapChartHeight:any = 220;

  //variable declarations
  public residualRiskChartData :any;
  public verticalGuageData: any;
  private responseScoreDummyData:any;
  public alternateScale :any;
  public editorConfig:any;
  public assessmentData:any;
  public coordinatorScoreChartdata:any;
  public showSubmitToButton:any = false;
  public rcsaExtendEndDate:any;
  public rcsaEndDate:any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private dataTransferService:DataTransferService
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
    //ck editor configuration
    this.editorConfig = {
      skin:'bootstrapck',
      resize_enabled : false,
      toolbar:[
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ,'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ]
    }
    // alternate scale for setting  the heatmap
    this.alternateScale =  { 5:0,4:1,3:2,2:3,1:4 };

    // general chart settings
    this.chartSettings = {
      useDataPlotColorForLabels: "1",
      paletteColors: "",
      theme: "fint",
      divLineColor: '#bababa',
      showvalues: "0",
      showLegend: "0",
      showShadow: "0",
      numberPrefix: "",
      ValuePadding: "5",
      showBorder: "0",
      bgColor: "#ffffff",
      canvasBgColor: "#ffffff",
      canvasBorderAlpha: "0",
      usePlotGradientColor: "0",
      showplotborder: "0",
      showHoverEffect: "1",
      legendBgAlpha: "0",
      legendBorderAlpha: "0",
      legendShadow: "0",
      legendItemFontColor: "#666666",
      rotateLabels :'1',
      labelFontColor:'#d6d6d6',
      showYAxisValues:'1', showDivLineSecondaryValue:'1', showSecondaryLimits:'1',
      thousandSeparator: ",",
      chartLeftMargin: "40",
      chartTopMargin: "10",
      chartRightMargin: "40",
      chartBottomMargin: "40",
      thousandSeparatorPosition: "3,3",
      use3DLighting: "0",
    };
    // chart data for changes in rating from last quarter
    this.coordinatorScoreChartdata = {
      chart: Object.assign({}, this.chartSettings),
      categories: [{
        category: [{
          label: "Strong"
        }, {
          label: "Satisfactory"
        }, {
          label: "Needs Improvement"
        }]
      }],
      data: [{
        label: "Strong",
        value: "0"
      }, {
        label: "Satisfactory",
        value: "0"
      }, {
        label: "Needs Improvement",
        value: "0"
      }]
    }
    this.coordinatorScoreChartdata.chart.paletteColors = "#218838,#f4a535,#e3151a";
    this.coordinatorScoreChartdata.chart.labelFontColor = '#d6d6d6';
    // heatmap chart data
    this.chartSettingsForHeatmap = {
      'theme': 'fint',
      'caption': '',
      'bgcolor': 'FFFFFF',
      'numberprefix': '$',
      'numbersuffix': ' M',
      'showborder': '0',
      'showLegend': '0',
      'showvalues': '0',
      'showtooltip': '0',
      'showHoverEffect': '0',
      'showPlotBorder': '1',
      'plotBorderColor': '000000',
      'plotBorderAlpha': '20',
      'xAxisName': '',
      'yAxisName': ''
    };
    this.residualRiskChartData = {
      chart: Object.assign({}, this.chartSettingsForHeatmap),
      "annotations": {
        "width": "440",
        "height": "220",
        "autoScale": "1",
        "showbelow": "0",
        "groups": [
          {
            "id": "inherent-risk-rating",
            "items": []
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
              'maxHeight': 40,
              'width': 14,
              'height': 7,
              'oriTextWidth': 14,
              'oriTextHeight': 7,
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
              'maxHeight': 40,
              'width': 14,
              'height': 7,
              'oriTextWidth': 14,
              'oriTextHeight': 7,
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
              'maxHeight': 40,
              'width': 14,
              'height': 7,
              'oriTextWidth': 14,
              'oriTextHeight': 7,
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
              'maxHeight': 40,
              'width': 14,
              'height': 7,
              'oriTextWidth': 14,
              'oriTextHeight': 7,
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
              'maxHeight': 40,
              'width': 14,
              'height': 7,
              'oriTextWidth': 14,
              'oriTextHeight': 7,
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
              'maxHeight': 40,
              'width': 14,
              'height': 7,
              'oriTextWidth': 14,
              'oriTextHeight': 7,
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
              'displayvalue': '5',
              'showvalue': '1'
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
              'displayvalue': '4',
              'showvalue': '1'
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
              'displayvalue': '3',
              'showvalue': '1'
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
              'displayvalue': '2',
              'showvalue': '1'
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
              'displayvalue': '1',
              'showvalue': '1'
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
              'displayvalue': '1',
              'showvalue': '1'
            },
            {
              'rowid': '5',
              'columnid': '2',
              'value': '1',
              'displayvalue': '2',
              'showvalue': '1'
            },
            {
              'rowid': '5',
              'columnid': '3',
              'value': '1',
              'displayvalue': '3',
              'showvalue': '1'
            },
            {
              'rowid': '5',
              'columnid': '4',
              'value': '1',
              'displayvalue': '4',
              'showvalue': '1'
            },
            {
              'rowid': '5',
              'columnid': '5',
              'value': '1',
              'displayvalue': '5',
              'showvalue': '1'
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
    // distrubution chart data
    this.distributionChartData= {
      "chart": {
        "caption": "",
        "xAxisname": "",
        "yAxisName": "",
        "numberPrefix": "",
        "plotFillAlpha": "80",
        "paletteColors": "#0070c0,#ff0000",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "showLegend": "0",
        "canvasBgColor": "#ffffff",
        "canvasBorderAlpha": "0",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "usePlotGradientColor": "0",
        "showplotborder": "0",
        "valueFontColor": "#ffffff",
        "placeValuesInside": "1",
        "showHoverEffect": "1",
        "rotateValues": "1",
        "showXAxisLine": "1",
        "xAxisLineThickness": "1",
        "xAxisLineColor": "#999999",
        "showAlternateHGridColor": "0",
        "legendBgAlpha": "0",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "legendItemFontSize": "10",
        "legendItemFontColor": "#666666"
      },
      "categories": [
        {
          "category": [
            {
              "label": "Q1"
            },
            {
              "label": "Q2"
            },
            {
              "label": "Q3"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q1"
            },
            {
              "label": "Q2"
            },
            {
              "label": "Q3"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            },
            {
              "label": "Q4"
            }
          ]
        }
      ],
      "dataset": [
        {
          "seriesname": "Previous Year",
          "data": [
            {
              "value": "2"
            },
            {
              "value": "4"
            },
            {
              "value": "6"
            },
            {
              "value": "8"
            },
            {
              "value": "2"
            },
            {
              "value": "4"
            },
            {
              "value": "6"
            },
            {
              "value": "8"
            },
            {
              "value": "6"
            },
            {
              "value": "8"
            },
            {
              "value": "2"
            },
            {
              "value": "4"
            },
            {
              "value": "6"
            },
            {
              "value": "8"
            },
            {
              "value": "2"
            },
            {
              "value": "4"
            },
            {
              "value": "6"
            },
            {
              "value": "8"
            },
            {
              "value": "6"
            },
            {
              "value": "8"
            }
          ]
        },
        {
          "seriesname": "Current Year",
          "data": [
            {
              "value": "4"
            },
            {
              "value": "3"
            },
            {
              "value": "1"
            },
            {
              "value": "6"
            },{
              "value": "4"
            },
            {
              "value": "3"
            },
            {
              "value": "1"
            },
            {
              "value": "6"
            },
            {
              "value": "1"
            },
            {
              "value": "6"
            },
            {
              "value": "4"
            },
            {
              "value": "3"
            },
            {
              "value": "1"
            },
            {
              "value": "6"
            },{
              "value": "4"
            },
            {
              "value": "3"
            },
            {
              "value": "1"
            },
            {
              "value": "6"
            },
            {
              "value": "1"
            },
            {
              "value": "6"
            }
          ]
        }
      ],
      /*"trendlines": [
        {
          "line": [
            {
              "startvalue": "12250",
              "color": "#0075c2",
              "displayvalue": "Previous{br}Average",
              "valueOnRight": "1",
              "thickness": "1",
              "showBelow": "1",
              "tooltext": "Previous year quarterly target  : $13.5K"
            },
            {
              "startvalue": "25950",
              "color": "#1aaf5d",
              "displayvalue": "Current{br}Average",
              "valueOnRight": "1",
              "thickness": "1",
              "showBelow": "1",
              "tooltext": "Current year quarterly target  : $23K"
            }
          ]
        }
      ]*/
    };
    // Vertical guage chart
    this.verticalGuageData = {
      "chart": {
        "theme": "fint",
        "caption": "",
        "editmode": "1",
        "lowerLimit": "0",
        "upperLimit": "10",
        "showLabels": "0",
        "showValues": "0",
        "numberPrefix": "",
        "chartBottomMargin": "20",
        "valueFontSize": "11",
        "valueFontBold": "0",
        "valueAbovePointer": "1",
        //Tick mark cosmetics
        "minorTMNumber": "4",
        "majorTMColor":"#163143",
        "majorTMAlpha":"50",
        "majorTMHeight": "5",
        "majorTMThickness": "1" ,
        "minorTMColor": "#163143",
        "minorTMAlpha": "30" ,
        "minorTMHeight": "4",
        "minorTMThickness": "1",
        "showTickValues": "0",
        "ticksBelowGauge": "0",
        "pointerontop": "1",
        "pointerradius": "14",
        //"gaugeFillMix":"{light-10},{light-70},{dark-10}",
        "gaugeFillRatio":"40,20,40"
      },
      "colorRange": {
        "color": [
          {
            "minValue": "0",
            "maxValue": "4",
            "label": "",
            "code":"#e3151a"
          },
          {
            "minValue": "4.1",
            "maxValue": "7.9",
            "label": "",
            "code":"#f4a535"
          },
          {
            "minValue": "8",
            "maxValue": "10",
            "label": "",
            "code":"#218838"
          }
        ]
      },
      "pointers": {
        "pointer": [
          {
            "radius": "6",
            "value": ""
          }
        ]
      }
    };
    this.responseScoreDummyData=[
      {
        choice: 10,
        responseCount: 0,
        weightedScore: 0
      },
      {
        choice: 9,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 8,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 7,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 6,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 5,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 4,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 3,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 2,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 1,
        responseCount: 0,
        weightedScore: 0
      }, {
        choice: 0,
        responseCount: 0,
        weightedScore: 0
      }
    ]
  }

  //create Coordinator chart data for each risks
  createCoordinatorChartData(coordinatorChartData, risk){
    let strong = 0;
    let satisfactory = 0;
    let improvement = 0
    if(risk.consolidatedResponses.length!= null){
        risk.consolidatedResponses.forEach((response)=>{
        if(response.choice >=8 && response.choice <=10){
          strong += response.responseCount;
        }else if(response.choice >=5 && response.choice <=7){
          satisfactory += response.responseCount;
        }else if(response.choice >=0 && response.choice <=4){
          improvement += response.responseCount;
        }
      });
      coordinatorChartData.data.forEach((data)=>{
        if(data.label == 'Strong'){
          data.value = strong;
        }else if(data.label == 'Satisfactory'){
          data.value = satisfactory;
        }else if(data.label == 'Needs Improvement'){
          data.value = improvement;
        }
      });
      return coordinatorChartData;
    }
  }
  //create heatmap chart data
  createHeatmapChartData(residualRiskChartData, risk){
      if(risk.inherentRisk != null && risk.residualRisk == null){
        let inherentSeverity = risk.inherentRisk.severity;
        let inherentLikelihood = risk.inherentRisk.likelihood;
        let dataArray = residualRiskChartData.dataset[0].data;
        dataArray.filter((column:any) => {
          if (column.columnid != 0 && column.rowid != 5) {
            column.displayvalue = "";
            column.showvalue = '0';
          }
          if (column.columnid == inherentSeverity && column.rowid == this.alternateScale[inherentLikelihood]) {
            //column.displayvalue = this.selectedRisk.riskType;
            // column.showvalue = '1';
            let annotation = [];
            let annotationObject = {
              type : "image",
              url : "./assets/img/square.svg",
              "x": "$xaxis.label." + inherentSeverity +".x - 10",
              "y": "$yaxis.label."+ this.alternateScale[inherentLikelihood] +".y - 12",
              "xScale" : "15",
              "yScale" : "15",
            }
            annotation.push(annotationObject);
            residualRiskChartData.annotations.groups[0].items = annotation;
          }
        });
      }
      if(risk.inherentRisk != null && risk.residualRisk != null){
        let inherentSeverity = risk.inherentRisk.severity;
        let inherentLikelihood = risk.inherentRisk.likelihood;
        let residualSeverity = parseFloat(risk.residualRisk.severity).toFixed(); //parseFloat(residualArray[0]).toFixed();
        let residualLikelihood = parseFloat(risk.residualRisk.likelihood).toFixed(); // parseFloat(residualArray[1]).toFixed();
        //console.log(residualSeverity, residualLikelihood)
        let dataArray = residualRiskChartData.dataset[0].data;
        let annotation = [];
        dataArray.filter((column:any) => {
          if (column.columnid != 0 && column.rowid != 5) {
            column.displayvalue = "";
            column.showvalue = '0';
          }
          if((inherentSeverity == residualSeverity && inherentLikelihood == residualLikelihood)) {
            /*let annotationObject = {
              type : "image",
              url : "./assets/img/square-triangle.svg",
              "x": "$xaxis.label." + inherentSeverity +".x - 15",
              "y": "$yaxis.label."+ this.alternateScale[inherentLikelihood] +".y - 11",
              "xScale" : "15",
              "yScale" : "15",
            }*/
            let annotationObject = {
              type : "image",
              url : "./assets/img/square.svg",
              "x": "$xaxis.label." + inherentSeverity +".x - 17",
              "y": "$yaxis.label."+ this.alternateScale[inherentLikelihood] +".y - 11",
              "xScale" : "13",
              "yScale" : "13",
            }
            let annotationObject2 = {
              type : "image",
              url : "./assets/img/triangle.svg",
              "x": "$xaxis.label." + residualSeverity +".x + 3",
              "y": "$yaxis.label."+ this.alternateScale[residualLikelihood] +".y - 11",
              "xScale" : "13",
              "yScale" : "13",
            }
            annotation.push(annotationObject,annotationObject2);
          }else{
            if (column.columnid == inherentSeverity && column.rowid == this.alternateScale[inherentLikelihood]){
              let annotationObject = {
                type : "image",
                url : "./assets/img/square.svg",
                "x": "$xaxis.label." + inherentSeverity +".x - 9",
                "y": "$yaxis.label."+ this.alternateScale[inherentLikelihood] +".y - 11",
                "xScale" : "13",
                "yScale" : "13",
              }
              annotation.push(annotationObject);
            }else if (column.columnid == residualSeverity && column.rowid == this.alternateScale[residualLikelihood]) {
              let annotationObject = {
                type : "image",
                url : "./assets/img/triangle.svg",
                "x": "$xaxis.label." + residualSeverity +".x - 9",
                "y": "$yaxis.label."+ this.alternateScale[residualLikelihood] +".y - 11",
                "xScale" : "13",
                "yScale" : "13",
              }
              annotation.push(annotationObject);
            }
          }
        });
        residualRiskChartData.annotations.groups[0].items = annotation;
      }
      return residualRiskChartData;
  }
  //change vertical guage data based on final score input
  changeControlCategoryFinalScore(value, finalScoreChartdata, risk){
    if(value != '' && value >= 0 && value <=10 && value != null ){
      //if(value != '' && (value.length == 1 || value.length == 3 || value == 10) ){
      finalScoreChartdata.pointers.pointer[0].value = value;
      this.calculateResidualRisk(value, risk);
    }else{
      finalScoreChartdata.pointers.pointer[0].value = 0;
      this.calculateResidualRisk(0, risk);
      this.showSubmitToButton = false;
    }
  };
  //calculate residual risk rating
  calculateResidualRisk(value, risk){
    if(risk.inherentRisk != null){
      let inherentSeverity = risk.inherentRisk.severity;
      let inherentLikelihood = risk.inherentRisk.likelihood;
      let controlRating = value * 10;
      let residualSeverity = null;
      let residualLikelihood = null;
      if(controlRating > 0 && controlRating<50){
        residualSeverity = inherentSeverity;
      }else if(controlRating >= 50 && controlRating<=100){
        residualSeverity = inherentSeverity * ((100 - (controlRating-50))/100);
      }
      if(controlRating > 0 && controlRating<20){
        residualLikelihood = inherentLikelihood;
      }else if(controlRating >= 20 && controlRating<=100){
        residualLikelihood = inherentLikelihood * ((100 - (controlRating-20))/100);
        console.log(residualLikelihood);
      }
      risk.residualRisk = {
        "severity": residualSeverity,
        "likelihood": residualLikelihood
      };
      risk.residualRiskChartData = this.createHeatmapChartData(risk.residualRiskChartData, risk);
    }
  }
  // show extend end date modal
  showExtendEndDate(){
    this.extendEndDateModal.show();
  }
  validateFinalScore(){
    let validationErrors = 0;
    this.assessmentData.risks.forEach((risk:any)=>{
      if(risk.finalScore == null || risk.finalScore == ""){
        risk.valid = false;
        validationErrors++
      }else{
        risk.valid = true;
      }
    });
    return validationErrors;
  }
  // for validating the risk finalscore response
  validateFinalScoreResponse(){
    let validationErrors = 0;
    this.assessmentData.risks.forEach((risk:any)=>{
      if(risk.finalScore == null || risk.finalScore == ""){
        risk.valid = false;
        validationErrors++
      }else{
        risk.valid = true;
      }
    });
    if(validationErrors == 0){
      console.log('validation success');
      this.submitToCompleted();
    }else{
      console.log(validationErrors);
    }
  }
  // Check Final completed submission Status
  checkCompletedSubmissionStatus() {
    let validationErrors = 0;
    this.assessmentData.risks.forEach((risk:any)=>{
      if(risk.finalScore == null || risk.finalScore == ""){
        validationErrors++
      }
    });
    if(validationErrors == 0){
      this.showSubmitToButton = true;
      console.log('validation success');
    }else{
      this.showSubmitToButton = false;
    }
  };

  //create full frequency score and data based on response from service
  createFrequencyAndScore(){
    this.assessmentData.risks.forEach((risk)=>{
          if(risk.consolidatedResponses.length != null) {
            this.responseScoreDummyData.forEach((response)=>{
              const index = risk.consolidatedResponses.findIndex(item => item.choice === response.choice);
              if(index == -1){
                risk.consolidatedResponses.push(response);
              }
            })
            // only for calculating final total frequency score
            let totalFrequencyScore = 0;
            risk.consolidatedResponses.forEach((response)=>{
              totalFrequencyScore += response.responseCount;
            });
            risk.totalFrequencyScore = totalFrequencyScore;
            if(risk.finalScore == null || risk.finalScore == ''){
              risk.finalScore = risk.weightedScore;
            }
            //controlCategory.finalScoreChartdata = Object.assign({}, this.verticalGuageData);
            risk.finalScoreChartdata = JSON.parse(JSON.stringify(this.verticalGuageData));
            let coordinatorScoreChartdata = JSON.parse(JSON.stringify(this.coordinatorScoreChartdata));
            risk.coordinatorScoreChartdata = this.createCoordinatorChartData(coordinatorScoreChartdata, risk);
            let residualRiskChartData = JSON.parse(JSON.stringify(this.residualRiskChartData));
            /*risk.inherentRisk = {
              "severity": 5,
              "likelihood": 4
            };*/
            if(risk.inherentRisk != null){
              risk.residualRiskChartData = this.createHeatmapChartData(residualRiskChartData, risk);
            }else{
              risk.residualRiskChartData = residualRiskChartData;
            }
            if(risk.finalScore != null){
              risk.finalScoreChartdata.pointers.pointer[0].value = risk.finalScore;
              this.calculateResidualRisk(risk.finalScore, risk);
            }else{
              risk.finalScoreChartdata.pointers.pointer[0].value = 0;
              this.calculateResidualRisk(risk.finalScore, risk);
            }
            risk.consolidatedResponses.sort((a, b) => {
              if (a.choice > b.choice) return -1;
              else if (a.choice < b.choice) return 1;
              else return 0;
            });
          }
    })
    console.log(this.assessmentData.risks);
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
          //this.selectedRiskUnit = responseData[0].id;
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
  // get assessement data based o rcsa
  getAssessmentBasedonRcsaChange(value){
    this.selectedRcsa = value;
    if(this.selectedRcsa != null){
      this.appSpinnerService.display(true);
      this.getAssessmentDetails(value);
      let index = this.rcsaData.findIndex(rcsa=> rcsa.rcsaId == value);
      if(index != -1){
        this.selectedRcsaDto = this.rcsaData[index];
        this.selectedRcsaDto.endDateDto = this.selectedRcsaDto.endDate ? new Date(this.selectedRcsaDto.endDate): new Date();
      }
    }else{
      this.selectedRcsaDto = {};
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
      this.rcsaList = Observable.create(obs => {
        obs.next(optionsArray);
        obs.complete();
      });
    }
  };
  //get rcsa by rcsa unit selection from service
  getRcsaByRcsaUnits(rcsaUnitId){
    this.rcsaService.fetchRcsaByRcsaUnits(rcsaUnitId).subscribe(
      (responseData:any)=>{
        console.log('Rcsa list based on rcsa unit selection:' , responseData);
        if(responseData && responseData.length>0){
          this.rcsaData = responseData;
          this.rcsaInProgress = true;
          this.appSpinnerService.display(false);
          //this.selectedRcsa = responseData[0].rcsaId;
          this.createRcsaOptions(responseData);
        }else{
          this.rcsaInProgress = false;
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
  //get Assessement details from service
  getAssessmentDetails(rcsaId){
    this.rcsaService.fetchGetAssessmentForUnitRm(rcsaId).subscribe(
      (responseData:any)=>{
        if(responseData){
          console.log(responseData);
          if(responseData){
            this.assessmentData = responseData;
            if(this.assessmentData.status =='COMPLETED'){
              //this.rcsaStatusMessage = "The RCSA you are trying to access is closed.";
              this.createFrequencyAndScore();
              this.rcsaStartStatus = false;
              this.appSpinnerService.display(false);
            }else if(this.assessmentData.status !='COMPLETED' && this.assessmentData.risks.length > 0){
              this.createFrequencyAndScore();
              this.rcsaStartStatus = true;
              this.checkCompletedSubmissionStatus();
            }
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
  };
  // change rcsa label with new data after extend date
  getRcsaList(){
    return this.rcsaList;
  }
  changeRcsaLabel(response){
    let index = this.rcsaData.findIndex(rcsa=> rcsa.rcsaId == response.rcsaId);
    if(index != -1){
      this.rcsaData[index] = response;
      this.createRcsaOptions(this.rcsaData);
    }
    /*this.getRcsaList()
      .subscribe(rcsaList=>{
        // do something...
        rcsaList.filter(rcsa=>{
          if(rcsa.id == response.rcsaId){
            rcsa.text = response.rcsaName;
            console.log('chinthu', rcsa, this.rcsaList);
          }
        })
      })*/
  }
  /* getUtcTimeZone(date)
  {
    var currentTime =  date.getTime();
    var localOffset = (-1) * date.getTimezoneOffset() * 60000;
    return Math.round(new Date(currentTime + localOffset).getTime());
  }*/
  getUtcTimeZone(date)
  {
    var currentTime = new Date();
    if(date != undefined){
      date.setHours(currentTime.getHours());
      date.setMinutes(currentTime.getMinutes());
      date.setSeconds(currentTime.getSeconds());
    }
    var currentTimeStamp =  date.getTime();
    return currentTimeStamp;
  }
  //extend rcsa end date
  extendRcsaEndDate(form){
    if(form.valid){
      this.appSpinnerService.display(true);
      let obj = {
        "rcsaId" : this.selectedRcsa,
        "endDate" : this.rcsaExtendEndDate ? this.getUtcTimeZone(this.rcsaExtendEndDate) : ''
      }
      this.rcsaService.extendRcsaEndDate(obj).subscribe(
        (responseData:any)=>{
          console.log('',responseData );
          this.rcsaExtendEndDate = '';
          form.resetForm();
          if(responseData != null){
            this.selectedRcsaDto = responseData;
            this.changeRcsaLabel(responseData);
          }
        },
        (error:any)=>{
          this.appSpinnerService.display(false);
        },
        ()=>{
          this.extendEndDateModal.hide();
          this.appSpinnerService.display(false);
        }
      )
    }
  }
  // save unit rm assessment
  saveUnitRmAssessment(bfu, status){
    let errors:any = this.validateFinalScore();
    if(errors > 0){
      return false;
    }
    this.appSpinnerService.display(true);
    let postData:any = {
      comments : bfu.comments,
      risks : []
    }
    if(bfu.risks.length > 0){
      bfu.risks.forEach((risk)=>{
        if(risk.finalScore != null && risk.finalScore >=0 && risk.finalScore <=10 ){
          let obj ={
            id : risk.id,
            finalScore : Number(risk.finalScore)
          }
          postData.risks.push(obj);
        }
      })
    }
    console.log('data for saving', postData);
    this.rcsaService.saveUnitRmAssessment(postData,this.selectedRcsa).subscribe((responseData:any)=>{
        console.log(responseData);
        //this.successModalMsg = 'Saved Successfully';
        //this.successModal.show();
        if(responseData){
          this.assessmentData = responseData;
          if(this.assessmentData.risks.length > 0){
            this.createFrequencyAndScore();
            this.checkCompletedSubmissionStatus();
            if(status == 'submit'){
              this.validateFinalScoreResponse();
            }
          }
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
        //this.errorModalMsg = 'Something Went wrong, Please try again!';
        //this.errorModal.show();
      },
      ()=>{
        this.appSpinnerService.display(false);
      });
  };
  // change start new rcsa tab status on submission of rcsa
  changeStartNewRcsaTabStatus(){
    this.dataTransferService.loggedInUserObject.subscribe(user => this.userObj = user);
    this.userObj.user.apps.forEach(
      app=>{
        if(app.routerLink == 'rcsa'){
          // check unit rm manager
          if(app.roles[0].id == 3){
            let views = app.roles[0].views;
            views.forEach(view=>{
              if(view.children != null && view.children.length > 0){
                view.children.forEach(submenu=>{
                  if(submenu.routerLink == 'start-new-rcsa'){
                    submenu.enabled = true;
                    this.dataTransferService.changeUser(this.userObj);
                  }
                })
              }
            })
          }
        }
      }
    )
  }

  //submitto completed
  submitToCompleted(){
    this.appSpinnerService.display(true);
    this.rcsaService.submitUnitRmAssessment(this.selectedRcsa).subscribe((responseData:any)=>{
        console.log(responseData);
        if(responseData != null && responseData == 'COMPLETED'){
          //this.successModalMsg = 'Submitted Successfully';
          //this.successModal.show();
          this.rcsaStatusMessage = "Thank you for submitting your responses.";
          this.rcsaStartStatus = false;
          this.changeStartNewRcsaTabStatus();
        }else if(responseData != null && responseData == 'IN_PROGRESS'){
         /* this.errorModalMsg = 'Please fill all the control Ratings';
          this.errorModal.show();*/
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
        //this.errorModalMsg = 'Something Went wrong, Please try again!';
        //this.errorModal.show();
      },
      ()=>{
        this.appSpinnerService.display(false);
      });
  }
  // show reminder send message on reminder send without reloading
  showReminderSendMessage(rcsaId){
    let index = this.rcsaData.findIndex(rcsa=> rcsa.rcsaId == rcsaId);
    if(index != -1){
      this.rcsaData[index].lastReminderSentDate = new Date().getTime();
    }
  }
  // send reminders
  sendReminder(){
    let obj ={
      "rcsaId": Number(this.selectedRcsa),
      "notifyRiskCoordinator": true
    }
    this.appSpinnerService.display(true);
    this.rcsaService.sendReminder(obj).subscribe(
      (responseData:any)=>{
        this.showReminderSendMessage(Number(this.selectedRcsa));
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  //@HostListener('window:resize', ['$event'])
  onResize(event) {
   //this.setHeatmapSize();
  }
  /*setHeatmapSize(){
    if(window.innerWidth >= 1366 && window.innerWidth < 1440){
      this.heatMapChartWidth = 500;
      this.heatMapChartHeight = 250;
    }else if(window.innerWidth >= 1440){
      this.heatMapChartWidth = 550;
      this.heatMapChartHeight = 275;
    }
  }*/
  ngOnInit() {
    this.getRcsaUnits();
    this.appSpinnerService.display(true);
  }

}
