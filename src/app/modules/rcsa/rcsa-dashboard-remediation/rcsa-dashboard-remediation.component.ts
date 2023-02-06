import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {Observable} from "rxjs/Observable";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'app-rcsa-dashboard-remediation',
  templateUrl: './rcsa-dashboard-remediation.component.html',
  styleUrls: ['./rcsa-dashboard-remediation.component.scss']
})
export class RcsaDashboardRemediationComponent implements OnInit {
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
      this.getRemediationDashboardData();
    }
  }

  chartSettings:object;
  chartlineSettings:object;
  stackedlineChartSettings: object;
  piechartSettings: object;
  multiseriesChartSetting: object;
  controlEffectivenessPieChartData:any;
  assignedClosedRemediationChartData:any;
  assessmentStatusChartData:any;
  assignedRemediationsStackedData:any;
  public remediationDashboardData:any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {
    //general chart settings
    this.chartSettings = {
      useDataPlotColorForLabels: "1",
      paletteColors: "",
      theme: "fint",
      divLineColor: '#bababa',
      showvalues: "1",
      showLegend: "1",
      showShadow: "0",
      numberPrefix: "$",
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
      thousandSeparator: ",",
      chartLeftMargin: "40",
      chartTopMargin: "10",
      chartRightMargin: "40",
      chartBottomMargin: "40",
      thousandSeparatorPosition: "3,3",
      use3DLighting: "0",
    };
    this.stackedlineChartSettings = {
      "xAxisname": "",
      "yAxisName": "",
      "numberPrefix": "",
      "paletteColors": "#4685bf,#ff2a1a,#98b455,#8266a4, #BDE4A7, #7A9CC6, #B9A394, #355834, #FAA613, #2F4858, #33658A, #B6A6CA, #6D1A36 , #53917E, #FCD0A1, #DD1C1A, #F0C808, #61C9A8, #BA3B46, #122C34, #2A4494, #4EA5D9, #45050C, #190B28  ",
      "bgColor": "#ffffff",
      "borderAlpha": "20",
      "showBorder": "0",
      "showCanvasBorder": "0",
      "usePlotGradientColor": "0",
      "plotGradientColor": "#4d4c4c",
      "plotFillAngle": "270",
      "plotFillAlpha": "90",
      "plotFillRatio": "0,100",
      "plotBorderAlpha": "10",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "legendBgAlpha": "0",
      "legendPosition": "top",
      "drawCustomLegendIcon": "1",
      "legendIconSides": "4",
      "valueFontColor": "#ffffff",
      "showXAxisLine": "1",
      "xAxisLineColor": "#999999",
      "divlineColor": "#999999",
      "divLineDashed": "1",
      "showAlternateHGridColor": "0",
      "showvalue": "1",
      "showValues":"1",
     // "subcaptionFontBold": "0",
     // "subcaptionFontSize": "14",
      "showHoverEffect": "1"
    }
    this.piechartSettings = {
      //"caption": "Split of revenue by product categories",
     // "subCaption": "Last year",
      "numberPrefix": "",
      "paletteColors": "#ff2a1a,#a3d469,#08bff1",
      "bgColor": "#ffffff",
      "showBorder": "0",
      "use3DLighting": "0",
      "showShadow": "0",
      //Smart Labels
      "enableSmartLabels": "1",
      "startingAngle": "0",
      "showPercentValues": "1",
      "showPercentInTooltip": "0",
      "decimals": "1",
      "captionFontSize": "14",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "legendBgAlpha": "0",
      "legendPosition": "top",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "placevaluesInside":"1",
      "toolTipColor": "#ffffff",
      "toolTipBorderThickness": "0",
      "toolTipBgColor": "#000000",
      "toolTipBgAlpha": "80",
      "toolTipBorderRadius": "2",
      "toolTipPadding": "5",
      "showHoverEffect":"1",
      "showLegend": "1",
      "showvalue": "1",
      "showValues":"1",
      "showLabels":"1"

    }
    this.multiseriesChartSetting ={
      "plotFillAlpha": "80",
      "paletteColors": "#ff2a1a,#4d8fcd",
      "baseFontColor": "#333333",
      "baseFont": "Helvetica Neue,Arial",
      "captionFontSize": "14",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "showBorder": "0",
      "bgColor": "#ffffff",
      "showShadow": "0",
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
      "rotateValues": "0",
      "showXAxisLine": "1",
      "xAxisLineThickness": "1",
      "xAxisLineColor": "#999999",
      "showAlternateHGridColor": "0",
      "showLegend": "0"
    }
    this.chartlineSettings ={
      "theme": "fint",
      //"caption": "Quarterly Revenue",
      //"subcaption": "Last year",
      //"xAxisName": "Quarter",
     // "yAxisName": "Amount (In USD)",
     // "numberPrefix": "$",
      "valueFontColor": "000000",
      "rotateValues": "0",
      "placeValuesInside": "0",
     // "yAxisMinValue" : "0",
     // "yAxisMaxValue" : "45"
    }
    // chart data for changes in rating from last quarteer
    this.controlEffectivenessPieChartData = {
      chart: Object.assign({}, this.piechartSettings),
      "data": []
    };

    // chart data for assigned closed remediation chart
    this.resetAssignedClosedRemediationChartDataToDefault();

    // chart data for remediation behind schedule
    this.resetAssignedRemediationsStackedDataToDefault();
    // chart data for assessement status
    this.resetAssessmentStatusChartDataToDefault();

    this.assessmentStatusChartData.chart.paletteColors = '#4d8fcd';
    this.assessmentStatusChartData.chart.numberPrefix =  "";
    this.assessmentStatusChartData.chart.showvalue= "1"
    this.assessmentStatusChartData.chart.placeValuesInside= "0";
  }
  // setting default data for asssigned closed remediation chart
  resetAssignedClosedRemediationChartDataToDefault(){
    this.assignedClosedRemediationChartData = {
      chart: Object.assign({}, this.multiseriesChartSetting),
      "categories": [{
        "category": []
      }],
      "dataset": [{
        "seriesname": "assignedCount",
        "plotToolText": "Assigned Count : $dataValue",
        "data": []
      }, {
        "seriesname": "closedCount",
        "plotToolText": "Closed Count : $dataValue",
        "data": []
      }]
    };
  };
  // setting default chart data for remediation behind schedule
  resetAssignedRemediationsStackedDataToDefault(){
    this.assignedRemediationsStackedData = {
      chart: Object.assign({}, this.stackedlineChartSettings),
      "categories": [
        {
          "category": []
        }
      ],
      "dataset": [
      ]
    };
  };
  // setting default data assessement status
  resetAssessmentStatusChartDataToDefault(){
    this.assessmentStatusChartData = {
      chart: Object.assign({}, this.chartlineSettings),
      data: []
    };
  }
  // create control effectiveness pie chart data
  createControlEffectivenessPieChartData(){
    let data = this.remediationDashboardData;
    if(data.controlEffectiveness != null){
      let chartData = [];
      Object.keys(data.controlEffectiveness).map((key)=>{
        // hardcoding the label values
        let dummyObj = {
          exceedsExpectations:'Satisfactory',
          meetsExpectation:'Strong',
          needsImprovement:'Needs Improvement'
        };
        let obj = {
          "label":dummyObj[key],
          "value":data.controlEffectiveness[key]
        }
        chartData.push(obj);
      });
      this.controlEffectivenessPieChartData.data = chartData;
    }
  }
  // create assigned remediations stacked data
  createAssignedRemediationsStackedData(){
    let data = this.remediationDashboardData;
    if(data.remediationQuarters != null && data.remediationQuarters.length > 0){
      this.resetAssignedRemediationsStackedDataToDefault();
      this.assignedRemediationsStackedData.categories[0].category = this.createCategoriesForAssignedStackedChart(data.remediationQuarters);
      this.assignedRemediationsStackedData.dataset = this.createDatasetForAssignedStackedChart(data);
      /*data.remediationQuarters.forEach(remediationQuarter=>{
        if(remediationQuarter.remediationCounts != null && remediationQuarter.remediationCounts.length > 0){
          remediationQuarter.remediationCounts.forEach(count=>{
            this.assignedRemediationsStackedData.dataset.forEach(series=>{
                if(series.seriesname == count.name){
                  let obj = {
                    "value":count.assignedCount.toString()
                  }
                  series.data.push(obj);
                }
            });
          });
        }
      });*/
      data.remediationQuarters.forEach(remediationQuarter=>{
        this.assignedRemediationsStackedData.dataset.forEach(series=>{
          if(remediationQuarter.remediationCounts != null && remediationQuarter.remediationCounts.length > 0){
            var index = remediationQuarter.remediationCounts.map(function(e) { return e.name; }).indexOf(series.seriesname);
            if(index != -1){
              let obj = {
                "value":remediationQuarter.remediationCounts[index].assignedCount.toString()
              }
              series.data.push(obj);
            }else{
              let obj = {
                "value":""
              }
              series.data.push(obj);
            }
          }
        });
      });
      console.log('stacked data', this.assignedRemediationsStackedData);
    }else{
      this.assignedRemediationsStackedData = null;
    }
  }
  // create dataset for assigned remediations stacked chart
  createDatasetForAssignedStackedChart(data){
    let dataset = [];
   /* if(data.length > 0 && data[0].remediationCounts != null && data[0].remediationCounts.length > 0){
      data[0].remediationCounts.forEach(
        remediation =>{
          let obj = {
            "seriesname": remediation.name,
            "showValues": "1",
            "data": []
          }
          dataset.push(obj);
        }
      )
    };*/
    if(data.risks.length > 0){
      data.risks.forEach(
        risk =>{
          let obj = {
            "seriesname": risk,
            "showValues": "1",
            "data": []
          }
          dataset.push(obj);
        }
      )
    };
    return dataset;
  }
  // create categories assigned remediations stacked chart
  createCategoriesForAssignedStackedChart(data){
    let categories = [];
    if(data.length > 0){
      data.forEach(
        assessment =>{
          let obj = {
            "label":"Q" + assessment.quarter + " " + assessment.year
          }
          categories.push(obj);
        }
      )
    };
    return categories;
  }
  //create asessment status chart data
  createAssessmentStatusChartData(){
    let data = this.remediationDashboardData;
      if(data.assessmentStatuses != null && data.assessmentStatuses.length > 0){
        this.resetAssessmentStatusChartDataToDefault();
          let chartData = [];
          let assigned = 0;
          data.assessmentStatuses.forEach(
            assessment =>{
                let obj = {
                  "label":assessment.displayName,
                  "value":assessment.count
                }
                chartData.push(obj);
                assigned += assessment.count;
            }
          );
          let assignedObj = {
            "label":"Assigned",
            "value" : assigned
          };
          chartData.unshift(assignedObj);
          this.assessmentStatusChartData.data = chartData;
      }else{
        this.assessmentStatusChartData = null;
      }
  }
  // create outstanding closed remediation chart data
  createAssignedClosedRemediationChartData(){
    let data = this.remediationDashboardData;
    if(data.remediationCounts != null && data.remediationCounts.length > 0){
      this.resetAssignedClosedRemediationChartDataToDefault();
      this.assignedClosedRemediationChartData.categories[0].category = this.createCategoriesForAssignedClosedRemediation(data.remediationCounts);
      data.remediationCounts.forEach(remediation=>{
        this.assignedClosedRemediationChartData.dataset.forEach(series=>{
            let obj = {
                value : remediation[series.seriesname]
            }
            series.data.push(obj);
        });
      });
    }else{
      this.assignedClosedRemediationChartData = null;
    }
  }
  // create categories for chart
  createCategoriesForAssignedClosedRemediation(data){
    let categories = [];
    if(data.length > 0){
      data.forEach(
        assessment =>{
          let obj = {
            "label":assessment.name
          }
          categories.push(obj);
        }
      )
    };
    return categories;
  }
  // get remediation data for the selected risk unit
  getRemediationDashboardData(){
    this.appSpinnerService.display(true);
    this.rcsaService.getRemediationDashboardData(this._selectedRiskUnit).subscribe(
      (responseData:any)=>{
        console.log('remediation data', responseData);
        this.remediationDashboardData = responseData;
        /*this.remediationDashboardData = {
          "year": 2018,
          "quarter": 2,
          "controlEffectiveness": {
            "needsImprovement": 1,
            "meetsExpectation": 2,
            "exceedsExpectations": 3
          },
          "assessmentStatuses": [
            {
              "status": "NEW",
              "count": 3
            },
            {
              "status": "COMPLETED",
              "count": 0
            },
            {
              "status": "IN_PROGRESS",
              "count": 0
            }
          ],
          "remediationQuarters": [
            {
              "year": 2018,
              "quarter": 1,
              "remediationCounts": [
                {
                  "name": "Information Security",
                  "assignedCount": 10,
                  "closedCount": 5
                },
                {
                  "name": "Business Continuity",
                  "assignedCount": 22,
                  "closedCount": 13
                }
              ]
            },
            {
              "year": 2017,
              "quarter": 4,
              "remediationCounts": [
                {
                  "name": "Information Security",
                  "assignedCount": 11,
                  "closedCount": 1
                },
                {
                  "name": "Business Continuity",
                  "assignedCount": 9,
                  "closedCount": 8
                }
              ]
            }
          ],
          "remediationCounts": [
            {
              "name": "Information Security",
              "assignedCount": 10,
              "closedCount": 5
            },
            {
              "name": "Business Continuity",
              "assignedCount": 22,
              "closedCount": 13
            }
          ]
        };*/
        this.createAssessmentStatusChartData();
        this.createAssignedClosedRemediationChartData();
        this.createControlEffectivenessPieChartData();
        this.createAssignedRemediationsStackedData();
    },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      })
  }
  ngOnInit() {
    console.log('selected rcsa unit', this._selectedRiskUnit );
  }

}
