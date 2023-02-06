import {Component, Input, OnInit} from '@angular/core';
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";

@Component({
  selector: 'app-rcsa-dashboard-risk',
  templateUrl: './rcsa-dashboard-risk.component.html',
  styleUrls: ['./rcsa-dashboard-risk.component.scss']
})
export class RcsaDashboardRiskComponent implements OnInit {
  private _selectedRiskUnit: string;
  get selectedRiskUnit(): string {
    // transform value for display
    return this._selectedRiskUnit;
  }

  @Input()
  set selectedRiskUnit(selectedRiskUnit: string) {
    console.log('prev value: ', this._selectedRiskUnit);
    console.log('got riksunit change: ', selectedRiskUnit);
    this._selectedRiskUnit = selectedRiskUnit;
    if(this._selectedRiskUnit != null){
      this.getRiskDashboardData();
    }
  }

  public rcsaRiskDashboardHeatMap: any;
  chartSettings:object;
  chartSettingsForHeatmap:object;
  public riskDashboardData:any;
  public alternateScale:any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {
    this.chartSettings = {
      "theme": "fint",
      "numberPrefix": "",
      "showBorder": "0",
      "showValues": "0",
      "lineThickness": "4",
      "paletteColors": "#ff2a1a,#4685bff",
      "bgColor": "#ffffff",
      "showCanvasBorder": "0",
      "canvasBgColor": "#ffffff",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "divlineColor": "#999999",
      "divLineIsDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "showAlternateHGridColor": "0",
      "usePlotGradientColor": "0",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5",
      "legendBgColor": "#ffffff",
      "legendBorderAlpha": '0',
      "legendShadow": '0',
      "legendItemFontSize": '10',
      "legendItemFontColor": '#666666',
      "drawAnchors":"0",
    };
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
    this.rcsaRiskDashboardHeatMap = {
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
    // alternate scale for setting  the heatmap
    this.alternateScale =  { 5:0,4:1,3:2,2:3,1:4 };
  }
  //create heatmap chart data
  createHeatmapChartData(chartData, risk){
    if(risk.inherentRisk != null && risk.residualRisk != null){
      let inherentSeverity = risk.inherentRisk.severity;
      let inherentLikelihood = risk.inherentRisk.likelihood;
      let residualSeverity = parseFloat(risk.residualRisk.severity).toFixed();
      let residualLikelihood = parseFloat(risk.residualRisk.likelihood).toFixed();
      //console.log(residualSeverity, residualLikelihood)
      let dataArray = risk.rcsaRiskDashboardHeatMap.dataset[0].data;
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
      risk.rcsaRiskDashboardHeatMap.annotations.groups[0].items = annotation;
    }
    return risk.rcsaRiskDashboardHeatMap;
  }

  // create general chart data
  createChartData(risk){
    let chartData  = {
      chart: Object.assign({}, this.chartSettings),
      "categories": [
        {
          "category": []
        }
      ],
      "dataset": [
        {
          "seriesName": "Rating",
          "showValues": "1",
          "data": []
        },
        {
          "seriesName": "Avg of prior 4 Quarters",
          "renderAs": "line",
          "data": []

        }
      ]
    };
    return chartData;
  }
  // create categories chart
  createCategoriesForChart(data){
    let categories = [];
    if(data.length > 0){
      data.forEach(
        (rating, index) => {
          if (index < 6) {
            let obj = {
              "label": "Q" + rating.quarter + " " + rating.year
            }
          categories.push(obj);
          }
        }
      )
    };
    return categories;
  }
  // create riskDashboardChartData
  createRiskDashboardChartData(){
    let data = this.riskDashboardData;
    if( data != null && data.length > 0){
      data.forEach(
        risk =>{
          risk.rcsaRiskDashboardHeatMap = JSON.parse(JSON.stringify(this.rcsaRiskDashboardHeatMap));
          risk.rcsaRiskDashboardHeatMap = this.createHeatmapChartData(risk.rcsaRiskDashboardHeatMap, risk);
          risk.rcsaRiskDashboardChart = this.createChartData(risk);
          if(risk.quarterRatings != null && risk.quarterRatings.length > 0){
            risk.rcsaRiskDashboardChart.categories[0].category = this.createCategoriesForChart(risk.quarterRatings);
            risk.quarterRatings.forEach(remediationQuarter=>{
              risk.rcsaRiskDashboardChart.dataset.forEach((series, index)=>{
                  if(series.seriesName == 'Rating'){
                    /*let color = "#ff0000";
                    if(remediationQuarter.finalScore >4 && remediationQuarter.finalScore<8){
                      color = "#ffc000";
                    }else if(remediationQuarter.finalScore >=8 && remediationQuarter.finalScore<= 10){
                      color = "#00b050";
                    }
                    let obj = {
                      "value":remediationQuarter.finalScore ? remediationQuarter.finalScore : 0,
                      "color":color
                    }*/
					let obj = {
                      "value":remediationQuarter.finalScore ? remediationQuarter.finalScore : 0
                    }
                    series.data.push(obj);
                  }
                  if(series.seriesName == 'Avg of prior 4 Quarters'){
                    let obj = {
                      "value":remediationQuarter.average ? remediationQuarter.average : null
                    }
                    series.data.push(obj);
                  }
              });
            });
          }
          console.log('stacked data', risk);
        }
      );
    }

  }
// get remediation data for the selected risk unit
  getRiskDashboardData(){
    this.rcsaService.getRiskDashboardData(this._selectedRiskUnit).subscribe(
      (responseData:any)=>{
        this.riskDashboardData = responseData;
        this.createRiskDashboardChartData();
      },
      (error:any)=>{

      },
      ()=>{

      })
  }
  ngOnInit() {
    console.log('selected rcsa unit', this._selectedRiskUnit );
  }

}
