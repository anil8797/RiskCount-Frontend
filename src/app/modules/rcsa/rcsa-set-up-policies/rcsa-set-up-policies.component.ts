import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-rcsa-set-up-policies',
  templateUrl: './rcsa-set-up-policies.component.html',
  styleUrls: ['./rcsa-set-up-policies.component.scss']
})
export class RcsaSetUpPoliciesComponent implements OnInit {
  @ViewChild('severityLegend') public severityLegendModal: ModalDirective;
  @ViewChild('likelihoodLegend') public likelihoodLegendModal :ModalDirective;
  public inherentRiskData:any;
  private chartSettings:any;
  public severityScaleData:any = [];
  public likelihoodScaleData:any = [];
  public ckeditorContent: string = '<p>Some html</p>';
  public editorConfig:any;
  // FOR ACCORDION
  public openAccordions: boolean              = false;
  constructor() {
    this.chartSettings = {
      "theme": "fint",
      "caption": "",
      "bgcolor": "FFFFFF",
      "numberprefix": "$",
      "numbersuffix": " M",
      "showborder": "0",
      "showLegend": "0",
      "showvalues": "1",
      "showtooltip": "0",
      "showHoverEffect":"0",
      "showPlotBorder":"1",
      "plotBorderColor":"000000",
      "plotBorderAlpha":"20",
      "xAxisName": "SEVERITY X-axis",
      "yAxisName": "LIKELIHOOD Y-axis",
      /*"labelBorderPadding": "5",
      "labelBorderRadius": "0",
      "labelBorderThickness": "1",
      "labelBorderColor": "#000",
      "labelBorderAlpha": "60",
      "labelBgColor": "f2f2f2",
      "labelBgAlpha":"100",
      "maxLabelWidthPercent":"100"*/
    };
    this.editorConfig = {
      skin:'bootstrapck',
      resize_enabled : false,
      toolbar:[
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ,'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ]
    }
    this.inherentRiskData = {
      chart: Object.assign({}, this.chartSettings),
      "rows": {
        "row": [
          {
            "id": "0",
            "label": "Very High",
            "oriLabel": "Very High"
          },
          {
            "id": "1",
            "label": "High",
            "oriLabel": "High"
          },
          {
            "id": "2",
            "label": "Medium",
            "oriLabel": "Medium"
          },
          {
            "id": "3",
            "label": "Low",
            "oriLabel": "Low"
          },
          {
            "id": "4",
            "label": "Very Low",
            "oriLabel": "Very Low"
          },
          {
            "id": "5",
            "label": "Likelihood",
            "oriLabel": "Likelihood"
          }
        ]
      },
      "columns": {
        "column": [
          {
            "id": "0",
            "label": "Severity",
            "style": {},
            "stepSkipped": false,
            "appliedSmartLabel": false,
            "_ovrStyle": {
              "fontSize": "10px",
              "fontFamily": "Verdana,sans",
              "lineHeight": "12px",
              "fontWeight": "normal"
            },
            "_nLineHeight": 14,
            "_cumulativeSum": 14,
            "oriLabel": "Severity",
            "_sLabel": {
              "text": "Severity",
              "maxWidth": 50,
              "maxHeight": 157.85,
              "width": 14,
              "height": 12,
              "oriTextWidth": 14,
              "oriTextHeight": 12,
              "oriText": "Severity",
              "isTruncated": false
            }
          },
          {
            "id": "1",
            "label": "Very Low",
            "style": {},
            "stepSkipped": false,
            "appliedSmartLabel": true,
            "_ovrStyle": {
              "fontSize": "10px",
              "fontFamily": "Verdana,sans",
              "lineHeight": "12px",
              "fontWeight": "normal"
            },
            "_nLineHeight": 14,
            "_cumulativeSum": 14,
            "oriLabel": "Insignificant",
            "_sLabel": {
              "text": "Insignificant",
              "maxWidth": 119.25,
              "maxHeight": 157.85,
              "width": 14,
              "height": 12,
              "oriTextWidth": 14,
              "oriTextHeight": 12,
              "oriText": "Insignificant",
              "isTruncated": false
            }
          },
          {
            "id": "2",
            "label": "Low",
            "style": {},
            "stepSkipped": false,
            "appliedSmartLabel": true,
            "_ovrStyle": {
              "fontSize": "10px",
              "fontFamily": "Verdana,sans",
              "lineHeight": "12px",
              "fontWeight": "normal"
            },
            "_nLineHeight": 14,
            "_cumulativeSum": 28,
            "oriLabel": "Minor",
            "_sLabel": {
              "text": "Minor",
              "maxWidth": 119.25,
              "maxHeight": 157.85,
              "width": 14,
              "height": 12,
              "oriTextWidth": 14,
              "oriTextHeight": 12,
              "oriText": "Minor",
              "isTruncated": false
            }
          },
          {
            "id": "3",
            "label": "Medium",
            "style": {},
            "stepSkipped": false,
            "appliedSmartLabel": true,
            "_ovrStyle": {
              "fontSize": "10px",
              "fontFamily": "Verdana,sans",
              "lineHeight": "12px",
              "fontWeight": "normal"
            },
            "_nLineHeight": 14,
            "_cumulativeSum": 42,
            "oriLabel": "Moderate",
            "_sLabel": {
              "text": "Moderate",
              "maxWidth": 119.25,
              "maxHeight": 157.85,
              "width": 14,
              "height": 12,
              "oriTextWidth": 14,
              "oriTextHeight": 12,
              "oriText": "Moderate",
              "isTruncated": false
            }
          },
          {
            "id": "4",
            "label": "High",
            "style": {},
            "stepSkipped": false,
            "appliedSmartLabel": true,
            "_ovrStyle": {
              "fontSize": "10px",
              "fontFamily": "Verdana,sans",
              "lineHeight": "12px",
              "fontWeight": "normal"
            },
            "_nLineHeight": 14,
            "_cumulativeSum": 56,
            "oriLabel": "Major",
            "_sLabel": {
              "text": "Major",
              "maxWidth": 119.25,
              "maxHeight": 157.85,
              "width": 14,
              "height": 12,
              "oriTextWidth": 14,
              "oriTextHeight": 12,
              "oriText": "Major",
              "isTruncated": false
            }
          },
          {
            "id": "5",
            "label": "Very High",
            "style": {},
            "stepSkipped": false,
            "appliedSmartLabel": true,
            "_ovrStyle": {
              "fontSize": "10px",
              "fontFamily": "Verdana,sans",
              "lineHeight": "12px",
              "fontWeight": "normal"
            },
            "_nLineHeight": 14,
            "_cumulativeSum": 56,
            "oriLabel": "Extreme",
            "_sLabel": {
              "text": "Extreme",
              "maxWidth": 119.25,
              "maxHeight": 157.85,
              "width": 14,
              "height": 12,
              "oriTextWidth": 14,
              "oriTextHeight": 12,
              "oriText": "Extreme",
              "isTruncated": false
            }
          }
        ]
      },
      "dataset": [
        {
          "data": [
            {
              "rowid": "0",
              "columnid": "0",
              "value": "0",
              "displayvalue": "5"
            },
            {
              "rowid": "0",
              "columnid": "1",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "0",
              "columnid": "2",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "0",
              "columnid": "3",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "0",
              "columnid": "4",
              "value": "45",
              "showvalue": "0"
            },
            {
              "rowid": "0",
              "columnid": "5",
              "value": "45",
              "showvalue": "0"
            },
            {
              "rowid": "1",
              "columnid": "0",
              "value": "0",
              "displayvalue": "4"
            },
            {
              "rowid": "1",
              "columnid": "1",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "1",
              "columnid": "2",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "1",
              "columnid": "3",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "1",
              "columnid": "4",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "1",
              "columnid": "5",
              "value": "45",
              "displayvalue": "Information Security"
            },
            {
              "rowid": "2",
              "columnid": "0",
              "value": "0",
              "displayvalue": "3"
            },
            {
              "rowid": "2",
              "columnid": "1",
              "value": "35",
              "showvalue": "0"
            },
            {
              "rowid": "2",
              "columnid": "2",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "2",
              "columnid": "3",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "2",
              "columnid": "4",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "2",
              "columnid": "5",
              "value": "45",
              "showvalue": "0"
            },
            {
              "rowid": "3",
              "columnid": "0",
              "value": "0",
              "displayvalue": "2"
            },
            {
              "rowid": "3",
              "columnid": "1",
              "value": "35",
              "showvalue": "0"
            },
            {
              "rowid": "3",
              "columnid": "2",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "3",
              "columnid": "3",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "3",
              "columnid": "4",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "3",
              "columnid": "5",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "4",
              "columnid": "0",
              "value": "1",
              "displayvalue": "1"
            },
            {
              "rowid": "4",
              "columnid": "1",
              "value": "35",
              "showvalue": "0"
            },
            {
              "rowid": "4",
              "columnid": "2",
              "value": "35",
              "showvalue": "0"
            },
            {
              "rowid": "4",
              "columnid": "3",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "4",
              "columnid": "4",
              "value": "5",
              "showvalue": "0"
            },
            {
              "rowid": "4",
              "columnid": "5",
              "value": "15",
              "showvalue": "0"
            },
            {
              "rowid": "5",
              "columnid": "0",
              "value": "0",
              "showvalue": "0"
            },
            {
              "rowid": "5",
              "columnid": "1",
              "value": "1",
              "displayvalue": "1"
            },
            {
              "rowid": "5",
              "columnid": "2",
              "value": "1",
              "displayvalue": "2"
            },
            {
              "rowid": "5",
              "columnid": "3",
              "value": "1",
              "displayvalue": "3"
            },
            {
              "rowid": "5",
              "columnid": "4",
              "value": "1",
              "displayvalue": "4"
            },
            {
              "rowid": "5",
              "columnid": "5",
              "value": "1",
              "displayvalue": "5"
            }
          ]
        }
      ],
      "colorrange": {
        "gradient": "0",
        "color": [
          {
            "minvalue": "0",
            "maxvalue": "1",
            "code":"f2f2f2",
            "label": "Default"
          },
          {
            "minvalue": "2",
            "maxvalue": "10",
            "code": "fde9d9",
            "label": ""
          },
          {
            "minvalue": "10",
            "maxvalue": "25",
            "code": "ffc000",
            "label": ""
          },
          {
            "minvalue": "25",
            "maxvalue": "40",
            "code": "00b050",
            "label": ""
          },
          {
            "minvalue": "40",
            "maxvalue": "50",
            "code": "ff0000",
            "label": ""
          }
        ]
      },
    };
    this.severityScaleData=[{
      'rating':'5',
      'descriptor' : 'Very High',
      'definition' :[
        'Financial loss of $ ... Million or more',
        'Long-term or significant negative media coverage; loss of status or market share',
        'Major hearings , prosecution, fines, litigation including class actions, incarceration',
        'Significant injuries or fatalities to employees, customers or vendors',
        'Multiple senior leaders leave'
      ]
    },
      {
        'rating':'4',
        'descriptor' : 'High',
        'definition' :[
          'Financial loss of $ ... Million up to $ ... Million',
          'Long-term major negative media;significant loss of market share and reputation',
          'Reports to regulators requiring major project for corrective action',
          'Care required for employees or third parties, such as customers or vendors',
          'Senior managers leave, high turnover of experience, no longer premier employer'
        ]
      },
      {
        'rating':'3',
        'descriptor' : 'Medium',
        'definition' :[
          'Financial loss of $ ... Million up to $ ... Million',
          'Short-term but impactful negative media coverage',
          'Report of breach to regulator with immediate correction to be implimented ',
          'Medical treatment required for employees, customers or vendors',
          'Widespread staff morale problems and high turnover'
        ]
      },
      {
        'rating':'2',
        'descriptor' : 'Low',
        'definition' :[
          'Financial loss of $ ... Million up to $ ... Million',
          'Reputational damage',
          'Reportable incident to regulator, no strong follow up',
          'No or minor injuries to employees or third parties, such as customers or vendors',
          'General staff morale problems and increase turnover'
        ]
      },
      {
        'rating':'1',
        'descriptor' : 'Very Low',
        'definition' :[
          'Financial loss of $ ... Million up',
          'Local media attention, if at all, quickly remedied',
          'Not immediately reportable to regulator',
          'No injuries to employees or third parties, such as customers or vendors',
          'Isolated staff dissatisfaction can  be managed locally'
        ]
      }]
    this.likelihoodScaleData=[
      {
        'rating':'5',
        'frequencyDescription' : 'Very High',
        'frequencyDefinition' :'Once a year or more',
        'probabilityDescription' : 'Almost Certain',
        'probabilityDefinition':'90% or greater chance of occurence over life of asset or project or in a time window such as Annual'
      },
      {
        'rating':'4',
        'frequencyDescription' : 'High',
        'frequencyDefinition' :'Once every 1 to 10 years',
        'probabilityDescription' : 'Likely',
        'probabilityDefinition':'60% up to 90% chance of occurrence over life of asset or project or annually'
      },
      {
        'rating':'3',
        'frequencyDescription' : 'Medium',
        'frequencyDefinition' :'Once in 25 to upto 50 years',
        'probabilityDescription' : 'Possible',
        'probabilityDefinition':'30% up to 60% chance of occurrence'
      },
      {
        'rating':'2',
        'frequencyDescription' : 'Low',
        'frequencyDefinition' :'Once in 50 years up to once in 100 years',
        'probabilityDescription' : 'Unlikely',
        'probabilityDefinition':'10% up to 30% chance of occurrence'
      },
      {
        'rating':'1',
        'frequencyDescription' : 'Very Low',
        'frequencyDefinition' :'Once in 100 years or less often',
        'probabilityDescription' : 'Remote',
        'probabilityDefinition':'Less than 10% chance of occurrence'
      }
    ]
  }
  showSeverityLegend(){
    this.severityLegendModal.show();
  }
  showLikelihoodLegend(){
    this.likelihoodLegendModal.show();
  }
  //functions to expand and collapse Accordions
  expandAll() {
    this.openAccordions = true;
  }
  //--------------------------------------------
  collapseAll() {
    this.openAccordions = false;
  }
  ngOnInit() {

  }

}
