import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Select2OptionData, Select2TemplateFunction} from "ng2-select2";
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import index from "@angular/cli/lib/cli";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-rcsa-coordinator-view',
  templateUrl: './rcsa-coordinator-view.component.html',
  styleUrls: ['./rcsa-coordinator-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaCoordinatorViewComponent implements OnInit {
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;
  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg
  public rcsaStartStatus:boolean = false;
  public rcsaStatusMessage:any = "";
  public rcsaErrorMessage:any = "";
  public showRcsaErrorMessage:boolean = false;
  summarRatingList: Array<Select2OptionData>;
  options:Select2Options;
  auOptions:Select2Options;
  scoreScale:any;
  scoreScaleOptions:any;
  chartSettings:object;
  assessorScoreChartdata:any;
  distributionChartData:any;
  riskList:any;
  verticalGuageData:any;
  public ckeditorContent: string = '<p>Some html</p>';
  public editorConfig:any;

  // declarations for binding
  public assessmentData:any;
  public selectedRisk:any;
  public selectedRiskOption:number;
  public responseScoreDummyData :any = [];
  public showSubmitToButton:any = false;
  public showSaveReviewButton:any = true;

  public assessmentUnitData:any;
  public assessmentUnitList: Array<Select2OptionData> = [];
  public selectedAssessmentUnitOption:any = null;
  public selectedAssessment:any;
  public selectedAssessmentOption:number;

  // function for result template
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      //console.log(state);
      return state.text;
    }
    let icon = `<svg>
        <use xlink:href="assets/svg/icons.svg#completed"></use>
        </svg>` ;
    let className = "" ;
    if(state.additional.status == 'COMPLETED') {
      let className = "completed"
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
    else if(state.additional.status == 'IN_PROGRESS'){
      let className = "inprogress"
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
    else{
      let className = "inprogress"
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
  }

  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let icon = `<svg>
        <use xlink:href="assets/svg/icons.svg#completed"></use>
        </svg>` ;
    let className = "" ;
    if(state.additional.status == 'COMPLETED') {
      let className = "completed"
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
    else if(state.additional.status == 'IN_PROGRESS'){
      let className = "inprogress"
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }else{
      let className = "inprogress"
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
  }


  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {
    this.editorConfig = {
      skin:'bootstrapck',
      resize_enabled : false,
      removePlugins : 'elementspath',
      placeholder : 'Enter suggested remediation',
      toolbar:[
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] }
        // { name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ,'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ]
    }
    /*this.riskList = [
      {
        id: "1",
        text: "NAME OF RISK",
        additional: {
          completed: false
        }
      }
    ];*/
    this.options = {
      placeholder: { id: '', text: 'Select Quarter'},
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    }
    this.auOptions = {
      placeholder: { id: '', text: 'Select Assessment Unit'}
    }
    /*this.riskList =[
      {
        title:'GENERAL',
        value:6
      },
      {
        title:'RISK MANAGEMENT - PLANNING',
        value:2
      },
      {
        title:'RISK MANAGEMENT - DUE DILIGENCE',
        value:8
      },
      {
        title:'VENDOR CONTRACTS',
        value:4
      },
      {
        title:'OVERSIGHT & ACCOUNTABILITY',
        value:7
      }
    ]*/
    this.scoreScaleOptions = {
      placeholder: { id: '', text: 'Score on a scale of 0-10' }
    }
    this.scoreScale = [
      { id: '', text: 'Empty'},
      {
        id: 10,
        text: '0'
      },
      {
        id: 11,
        text: '1'
      },
      {
        id: 12,
        text: '2'
      },
      {
        id: 13,
        text: '3'
      },
      {
        id: 14,
        text: '4'
      },
      {
        id: 15,
        text: '5'
      },
      {
        id: 16,
        text: '6'
      },
      {
        id: 17,
        text: '7'
      },
      {
        id: 18,
        text: '8'
      },
      {
        id: 19,
        text: '9'
      },
      {
        id: 20,
        text: '10'
      }
    ];
    //general chart settings
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
    // chart data for changes in rating from last quarteer
    this.assessorScoreChartdata = {
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
    this.assessorScoreChartdata.chart.paletteColors = "#218838,#f4a535,#e3151a";
    this.assessorScoreChartdata.chart.labelFontColor = '#d6d6d6';
    //distribution chart data
    this.distributionChartData= {
      "chart": {
        "decimals": "1",
        "caption": "",
        "xAxisname": "",
        "yAxisName": "",
        "numberPrefix": "",
        "plotFillAlpha": "100",
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
        "usePlotGradientColor": "0",
        "plotGradientColor":"#fff",
        "plotBorderDashed" :"0",
        "showplotborder": "1",
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
          "category": [/*
            {
              "label": "General"
            },
            {
              "label": "Risk Management - Planning"
            },
            {
              "label": "Risk Management - Due Diligence"
            },
            {
              "label": "Vendor Contracts"
            },
            {
              "label": "Oversight & Accountability"
            }*/
          ]
        }
      ],
      "dataset": [
        /*{
          "seriesname": "Assessor Score",
          "data": [
            {
              "value": "2",
              "color": "#e3151a",
            },
            {
              "value": "4",
              "color": "#e3151a"
            },
            {
              "value": "6",
              "color": "#f4a535"
            },
            {
              "value": "8",
              "color": "#218838"
            },
            {
              "value": "4",
              "color": "#e3151a"
            }
          ]
        },
        {
          "alpha":"50",
          "dashed": "1",
          "seriesname": "RCSA Coordinator Score",
          "data": [
            {
              "value": "4",
              "color": "#e3151a"
            },
            {
              "value": "3",
              "color": "#e3151a"
            },
            {
              "value": "1",
              "color": "#e3151a"
            },
            {
              "value": "8",
              "color": "#218838"
            },
            {
              "value": "6",
              "color": "#f4a535"
            }
          ]
        }*/
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
        "pointerOnTop": "1",
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
            "value": "0"
          }
        ]
      }
    }
    // response score dummy data
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
  //creating the distrubution chart data based  on selected risk
  createDistributionDataForChart(risk){
    risk.distributionChart = JSON.parse(JSON.stringify(this.distributionChartData));
    if(risk.controlCategories.length > 0){
      let datasetData = [
        {
          "seriesname": "Assessor Score",
          "data": []
        },
        {
          "alpha":"50",
          "dashed": "0",
          "seriesname": "RCSA Coordinator Score",
          "data": []
        }
      ];
      let category = [];
      risk.controlCategories.forEach((response)=>{
        datasetData.forEach((series, index)=>{
          if(index == 0) {
            let color = "#e3151a";
            if(response.weightedScore != null && response.weightedScore >= 4.1 && response.weightedScore <=7.9){
              color = '#f4a535';
            }else if (response.weightedScore != null && response.weightedScore >= 8 && response.weightedScore <=10){
              color = '#218838';
            }
            const obj = {
              'value': response.weightedScore ? response.weightedScore : 0,
              'color': color
            };
            series.data.push(obj);
          }else{
            let color = "#e3151a";
            if(response.finalScore != null && response.finalScore >= 4.1 && response.finalScore <=7.9){
              color = '#f4a535';
            }else if (response.finalScore != null && response.finalScore >= 8 && response.finalScore <=10){
              color = '#218838';
            }
            const obj = {
              'value': response.finalScore ? response.finalScore : 0,
              'color':color
            };
            series.data.push(obj);
          }
        });
        const obj ={
          "label": response.name
        }
        category.push(obj);
      });
      risk.distributionChart.categories[0].category = category;
      risk.distributionChart.dataset = datasetData;
    }
  }
  //create assessor chart data for each conrol categories
  createAssessorChartData(assessorchartData, controlCategory){
      let strong = 0;
      let satisfactory = 0;
      let improvement = 0
      if(controlCategory.consolidatedResponses.length>0){
        controlCategory.consolidatedResponses.forEach((response)=>{
          if(response.choice >=8 && response.choice <=10){
            strong += response.responseCount;
          }else if(response.choice >=5 && response.choice <=7){
            satisfactory += response.responseCount;
          }else if(response.choice >=0 && response.choice <=4){
            improvement += response.responseCount;
          }
        });
        assessorchartData.data.forEach((data)=>{
          if(data.label == 'Strong'){
            data.value = strong;
          }else if(data.label == 'Satisfactory'){
            data.value = satisfactory;
          }else if(data.label == 'Needs Improvement'){
            data.value = improvement;
          }
        });
        return assessorchartData;
      }
  }
  //creating options for the dropdown
  createOptionsData(data){
    this.riskList = [];
    if(data.length>0){
      data.forEach(risk => {
        const riskObj = {
          id: risk.id,
          text: risk.name,
          additional: {
            status: risk.status
          }
        };
        if(risk.controlCategories.length > 0){
          this.riskList.push(riskObj);
        }
      });
      console.log(this.riskList);
    }
    if(this.riskList.length>0){
      this.changeSelectedRisk(data);
    }
  }
  changeSelectedRisk(data){
    if(this.selectedRisk == null){
      this.selectedRisk = data[0];
      this.selectedRiskOption = this.selectedRisk.id;
    }else{
      let riskId = this.selectedRisk.id;
      const index = data.findIndex(risk => risk.id === riskId);
      if(index != -1){
        this.selectedRisk = data[index];
      }
    }
  }
  //change risk on selecting from top dropdown
  changeRisk(e: any){
    this.assessmentData.risks.forEach((risk)=>{
      if(risk.id == e.value){
        this.selectedRisk = risk;
        // for showing/hiding the save and review button
        const currentRiskId = this.selectedRisk.id;
        let index = this.riskList.findIndex(item => item.id === currentRiskId);
        if(index != -1){
          index = index + 1;
          const nextRisk = this.riskList[index];
          if(nextRisk == null){
            this.showSaveReviewButton = false;
          }else{
            this.showSaveReviewButton = true;
          }
        };
      }
    });
  }
  // create options data for assessment unit dropdown
  createAssessmentOptionsData(data){
    this.assessmentUnitList = [];
    if(data.length>0){
      data.forEach(assessment => {
        const riskObj = {
          id: assessment.id,
          text: assessment.name,
          additional: {
            status: assessment.status
          }
        };
        this.assessmentUnitList.push(riskObj);
      });
      console.log(this.assessmentUnitList);
    }
    if(this.assessmentUnitList.length>0){
      this.changeSelectedAssessment(data);
    }
  }
  changeSelectedAssessment(data){
    if(this.selectedAssessment == null){
      this.selectedAssessment = data[0];
      this.selectedAssessmentUnitOption = this.selectedAssessment.id;
      this.getAssessmentDetails(this.selectedAssessment);
    }else{
      let riskId = this.selectedAssessment.id;
      const index = data.findIndex(risk => risk.id === riskId);
      if(index != -1){
        this.selectedAssessment = data[index];
      }
    }
  }
  // change assessment units
  changeAssessmentUnit(e: any){
    this.assessmentUnitData.forEach((assessment:any)=>{
      if(assessment.id == e.value){
        this.selectedAssessment = assessment;
        this.getAssessmentDetails(this.selectedAssessment);
        // for showing/hiding the save and review button
        const currentAssessmentId = this.selectedAssessment.id;
        let index = this.assessmentUnitList.findIndex(item => item.id === currentAssessmentId);
        if(index != -1){
          index = index + 1;
          const nextAssessment = this.assessmentUnitList[index];
          if(nextAssessment == null){
            this.showSaveReviewButton = false;
          }else{
            this.showSaveReviewButton = true;
          }
        };
      }
    });
  }


  changeControlCategoryFinalScore(value, finalScoreChartdata, modelValue){
    if(value != '' && value >= 0 && value <=10 ){
    //if(value != '' && (value.length == 1 || value.length == 3 || value == 10) ){
      finalScoreChartdata.pointers.pointer[0].value = value;
    }else{
      finalScoreChartdata.pointers.pointer[0].value = 0;
    }
  };
  // go to next risk after save
  goToNextRisk(){
      const currentRiskId = this.selectedRisk.id;
      let index = this.riskList.findIndex(item => item.id === currentRiskId);
      if(index != -1){
        index = index + 1;
        const nextRisk = this.riskList[index];
        if(nextRisk != null){
          this.assessmentData.risks.forEach((item: any) => {
            if(item.id == nextRisk.id){
              this.selectedRisk = item;
              this.selectedRiskOption = this.selectedRisk.id;
              window.scrollTo(0, 0)
            }
          });
        }
      };
  }
  // Check Coordinator submission Status
  checkRiskManagementSubmissionStatus() {
    let errors = 0;
    if (this.assessmentData.risks != null) {
      this.assessmentData.risks.forEach((item: any) => {
        /*item.controlCategories.forEach((category: any) => {
          if (category.status != 'COMPLETED') {
            errors++;
          }
        })*/
        if (item.status != 'COMPLETED') {
          errors++;
        }
      });
    }
    if(errors == 0){
      this.showSubmitToButton = true;
      return true;
    }
  };
  // for validating the control category coordinator response
  validateControlCategoryResponse(nextaction){
    let validationErrors = 0;
    this.selectedRisk.controlCategories.forEach((item:any)=>{
      if(item.finalScore == null || item.finalScore == ""){
        item.valid = false;
        validationErrors++
      }else{
        item.valid = true;
      }
    });
    if(this.selectedRisk.choiceId == null){
      this.selectedRisk.isValid = false;
      validationErrors++
    }else{
      this.selectedRisk.isValid = true;
    }
    if(validationErrors == 0){
      this.saveCoordinatorAssessment(this.selectedRisk, nextaction, this.selectedAssessment);
    }
    console.log(this.selectedRisk.finalScore, validationErrors);
  }
  createFrequencyAndScore(){
    this.assessmentData.risks.forEach((risk)=>{
      if(risk.controlCategories.length > 0){
        risk.controlCategories.forEach((controlCategory)=>{
          if(controlCategory.consolidatedResponses != null) {
            this.responseScoreDummyData.forEach((response)=>{
              const index = controlCategory.consolidatedResponses.findIndex(item => item.choice === response.choice);
              if(index == -1){
                controlCategory.consolidatedResponses.push(response);
              }
            })
            // only for calculating final total frequency score
            let totalFrequencyScore = 0;
            controlCategory.consolidatedResponses.forEach((response)=>{
              totalFrequencyScore += response.responseCount;
            });
            controlCategory.totalFrequencyScore = totalFrequencyScore;
            if(controlCategory.finalScore == null || controlCategory.finalScore == ''){
              controlCategory.finalScore = controlCategory.weightedScore;
            }
            //controlCategory.finalScoreChartdata = Object.assign({}, this.verticalGuageData);
            controlCategory.finalScoreChartdata = JSON.parse(JSON.stringify(this.verticalGuageData));
            let assessorchartData = JSON.parse(JSON.stringify(this.assessorScoreChartdata));
            controlCategory.assessorScoreChartdata = this.createAssessorChartData(assessorchartData, controlCategory);
            if(controlCategory.finalScore != null){
              controlCategory.finalScoreChartdata.pointers.pointer[0].value = controlCategory.finalScore;
            }else{
              controlCategory.finalScoreChartdata.pointers.pointer[0].value = 0;
            }
            controlCategory.consolidatedResponses.sort((a, b) => {
              if (a.choice > b.choice) return -1;
              else if (a.choice < b.choice) return 1;
              else return 0;
            });
          }
        });
        this.createDistributionDataForChart(risk);
      }
    })
    console.log(this.assessmentData.risks);
    this.appSpinnerService.display(false);
  }
  getAssessmentDetails(selectedAssessment){
    this.assessmentData = null;
    this.selectedRisk = null;
    this.rcsaService.fetchGetAssessmentForCoordinator(selectedAssessment.id).subscribe(
      (responseData:any)=>{
        if(responseData){
          console.log(responseData);
          if(responseData && responseData.risks != null){
            this.assessmentData = responseData;
            this.createFrequencyAndScore(); // phase2
            this.createOptionsData(this.assessmentData.risks); // phase2
            this.checkRiskManagementSubmissionStatus();// phase2
            this.rcsaStartStatus = true;
          }else{
            this.rcsaStatusMessage = "The RCSA you are trying to access is closed.";
            this.rcsaStartStatus = false; // false phase 2
            this.appSpinnerService.display(false);
          }
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{

      }
    )
  }
  getAssessmentUnits(){
    this.rcsaService.fetchAssessmentUnits().subscribe(
      (responseData:any)=>{
        if(responseData){
          console.log(responseData);
          if(responseData && responseData.length != 0){
            this.assessmentUnitData = responseData;
            this.createAssessmentOptionsData(responseData);
          }else{
            this.appSpinnerService.display(false);
            this.rcsaStatusMessage = "The RCSA you are trying to access is closed.";
            this.rcsaStartStatus = false;
          }
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{

      }
    )
  }
  saveCoordinatorAssessment(risk, nextAction, assessment){
    this.appSpinnerService.display(true);
    let postData:any = {
      riskId : risk.id,
      response : risk.suggestedRemediation ? risk.suggestedRemediation : "",
      assessmentUnitId:assessment.id,
      controlCategoryScores : []
    }
    if(risk.choiceId != null){
      postData.riskScoreId = risk.choiceId;
    }
    if(risk.controlCategories.length > 0){
      risk.controlCategories.forEach((category)=>{
        if(category.finalScore != null && category.finalScore >=0 && category.finalScore <=10 ){
          let obj ={
            controlCategoryId : category.id,
            score : category.finalScore,
            response:category.response
          }
          postData.controlCategoryScores.push(obj);
        }
      })
    }
    console.log('data for saving', postData);
    this.rcsaService.saveCoordinatorAssessment(postData).subscribe((responseData:any)=>{
        console.log(responseData);
        //this.successModalMsg = 'Saved Successfully';
        //this.successModal.show();
        this.assessmentData = responseData;
        this.createFrequencyAndScore();
        this.createOptionsData(this.assessmentData.risks);
        this.checkRiskManagementSubmissionStatus();
        if(nextAction == 'goToNextRisk'){
          this.goToNextRisk();
        }else if(nextAction == 'submit'){
          this.appSpinnerService.display(false);
          this.submitToRiskManagement();
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
  submitToRiskManagement(){
    this.appSpinnerService.display(true);
    this.showRcsaErrorMessage = false;
    this.rcsaService.submitCoordinatorAssessment(this.selectedAssessment.id).subscribe((responseData:any)=>{
        console.log(responseData);
        //this.successModalMsg = 'Submitted Successfully';
        //this.successModal.show();
        if(responseData != null && responseData == 'IN_PROGRESS'){
          this.rcsaErrorMessage = "To continue with the submission,  please complete the assessments for all the Assessment Units.";
          this.showRcsaErrorMessage = true;
        }
        if(responseData != null && responseData == 'COMPLETED'){
          this.rcsaStatusMessage = "Thank you for submitting your responses.";
          this.rcsaStartStatus = false;
          this.getAssessmentUnits();
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
  showReminderSendMessage(){
    if(this.assessmentData){
      this.assessmentData.lastReminderSentDate = new Date().getTime();
    }
  }
  // send reminders
  sendReminder(){
    let obj ={
      "rcsaId": Number(this.assessmentData.rcsaId),
      "notifyRiskCoordinator": false
    }
    this.appSpinnerService.display(true);
    this.rcsaService.sendReminder(obj).subscribe(
      (responseData:any)=>{
        this.showReminderSendMessage();
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  ngOnInit() {
    //this.getAssessmentDetails();
    this.getAssessmentUnits();
    // this.appSpinnerService.display(true); // phase2
  }

}
