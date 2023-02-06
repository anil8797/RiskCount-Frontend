import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Select2OptionData} from "ng2-select2";
import {RcsaService} from "../../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../../services/common/app-spinner";
import {distinctUntilChanged, debounceTime, switchMap, tap, catchError, concat, mergeMap} from 'rxjs/operators';
import { Subject, Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'app-rcsa-admin-setup-rcsa-unit',
  templateUrl: './rcsa-admin-setup-rcsa-unit.component.html',
  styleUrls: ['./rcsa-admin-setup-rcsa-unit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaAdminSetupRcsaUnitComponent implements OnInit {
  public options: Select2Options;
  public options2: Select2Options;
  // declarations
  public rcsaUnitsData: any = [];
  public regionData: Array<Select2OptionData>;
  public businessUnitData: Array<Select2OptionData>;
  public unitRiskManagerData: any;
  public showUniqueBuRegionError: boolean = false;
  public showCommonErrors: boolean = false;
  public errorMessage: any = '';

  public typeaheadLoading:boolean;
  public subscription:any;
/*  public people2Loading: any = false;
  people3Typeahead = new Subject<string>();
  asyncSelected: string;
  dataSource: Observable<any>;*/
  typeAheadSearch = new Subject();

  constructor(
    private rcsaService: RcsaService,
    private appSpinner: AppSpinnerService
  ) {
    this.options = {
      placeholder: {id: '', text: 'Select Business Unit'}
    };
    this.options2 = {
      placeholder: {id: '', text: 'Select Region'}
    }
    // typeahead search observable
    this.typeAheadSearch
      .debounceTime(300)
      .subscribe(val => {
        this.rcsaService.searchForUnitRiskManager(val).subscribe(
          (responseData: any) => {
            if (responseData) {
              this.unitRiskManagerData = responseData;
            }
          },
          (error: any) => {
            //this.appSpinner.display(false);
          },
          () => {
            //this.appSpinner.display(false);
          }
        );
      });
  }

  // fired every time search string is changed
  /* filterResults(token: string) {
    // adjust the remote url.
    console.log(token);
    return of(this.rcsaService.searchForUnitRiskManager(token).subscribe(x=>{
      return x;
    }));
  }*/

  //validations
  validateRcsaUnit(data) {
    let errors = 0;
    if (data.isNewUnit == true) {
      if (data.regionId == null || data.regionId == '') {
        errors++;
      }
      if (data.businessUnitId == null || data.businessUnitId == '') {
        errors++;
      }
    }
    if (data.unitRiskManager) {
      if (data.unitRiskManager.firstName == null || data.unitRiskManager.firstName == '') {
        errors++;
      }
      if (data.unitRiskManager.lastName == null || data.unitRiskManager.lastName == '') {
        errors++;
      }
      if (data.unitRiskManager.email == null || data.unitRiskManager.email == '') {
        errors++;
      }
    }
    return errors;
  }
  // validate for unique bu region pair
  validateUniqueBuRegionPair(rowData) {
    let errors = 0;
    if (rowData.isNewUnit && this.rcsaUnitsData.length > 0 && (rowData.regionId != null || rowData.regionId != '') && (rowData.businessUnitId != null || rowData.businessUnitId != '')) {
      this.rcsaUnitsData.forEach(unit => {
        if (!unit.isNewUnit && unit.regionId == rowData.regionId && unit.businessUnitId == rowData.businessUnitId) {
          this.showUniqueBuRegionError = true;
          this.errorMessage = 'RCSA Unit already exists';
          errors++;
        }
      })
    }
    return errors;
  }

  // reset Error messages
  resetErrorMessage() {
    this.showCommonErrors = false;
    this.showUniqueBuRegionError = false;
    this.errorMessage = '';
  }
  // reset unit risk manager data-  used once disabling the rcsa risk unit
  resetUnitRiskManager(rowData){
    let unitRiskManager = {
      firstName :'',
      lastName:'',
      email:'',
      phoneNumber:''
    }
    rowData.unitRiskManager = unitRiskManager;
  }
  // For RCSA Business Units
  editRegionRow(row) {
    this.resetrcsaUnitErrorMessage();
    row.isUserEditable = true;
  }

  cancelEditRegionRow(row) {
    this.resetrcsaUnitErrorMessage();
    row.isUserEditable = false;
    row.isNewUnit = false;
  }

  // ADD RCSA BUSINESS UNIT
  addRcsaUnit() {
    const setupRcsaUnitsData: any = [...this.rcsaUnitsData];
    const obj = {
      businessUnitId: "",
      regionId: "",
      unitRiskManager: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
      },
      isNewUnit: true,
      isUserEditable: true,
      enabled: true
    }
    setupRcsaUnitsData.unshift(obj);
    this.rcsaUnitsData = setupRcsaUnitsData;
  }

  // REMOVE ROW ON CLICK BUTTON
  removeRow(row) {
    const setupRcsaUnitsData: any = [...this.rcsaUnitsData];
    const index: number = setupRcsaUnitsData.indexOf(row);
    if (index !== -1) {
      setupRcsaUnitsData.splice(index, 1);
      this.rcsaUnitsData = setupRcsaUnitsData;
    }
  }

  // search for unit risk Manager
  serachUnitRiskManager(value: any){
    if (value === "") {
      this.unitRiskManagerData = [];
    } else if (value.length > 3) {
      //this.appSpinner.display(true);
      if ( this.subscription ) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.rcsaService.searchForUnitRiskManager(value).subscribe(
        (responseData: any) => {
          if (responseData) {
            this.unitRiskManagerData = responseData;
          }
        },
        (error: any) => {
          //this.appSpinner.display(false);
        },
        () => {
          //this.appSpinner.display(false);
        }
      )
    }
  }
  // typeahead observable search
  searchRcsaUsers(value){
    if (value === "") {
      this.unitRiskManagerData = [];
    } else if (value.length > 3) {
      this.typeAheadSearch.next(value);
    }
  }
  // Typeahead loading
  changeTypeaheadLoading(e: boolean, row): void {
    row.typeaheadLoading = e;
  }
  // on selecting unit rm
  onUnitRmSelect(event, row) {
    console.log(event, row);
    if (event.item) {
      row.unitRiskManager.firstName = event.item.firstName ? event.item.firstName : row.unitRiskManager.firstName;
      row.unitRiskManager.lastName = event.item.lastName ? event.item.lastName : row.unitRiskManager.lastName;
      row.unitRiskManager.phoneNumber = event.item.phoneNumber ? event.item.phoneNumber : row.unitRiskManager.phoneNumber;
      row.unitRiskManager.email = event.item.email ? event.item.email : row.unitRiskManager.email;
    }
  }

  // enable diable rcsa unit
  changeRcsaUnitStatus(rowData, event) {
    this.cancelEditRegionRow(rowData);
    this.resetErrorMessage();
    this.appSpinner.display(true);
    let obj = {
      enabled: event
    }
    this.rcsaService.changeRcsaUnitStatus(rowData.id, obj).subscribe(
      (responseData: any) => {
        console.log(responseData);
        if (responseData.status == 'FAILURE') {
          this.showCommonErrors = true;
          rowData.enabled = true;
          this.errorMessage = 'RCSA in progress';
        }
        if(responseData.status == 'SUCCESS' && !event){
          //this.resetUnitRiskManager(rowData);
        }
      },
      (error: any) => {
        this.appSpinner.display(false);
      },
      () => {
        this.appSpinner.display(false);
      }
    );
  }

  // create  business units options Data for business Units
  createBusinessUnitOptionData(data) {
    this.businessUnitData = [];
    data.forEach(bfu => {
      let obj = {
        id: bfu.id,
        text: bfu.geography
      }
      this.businessUnitData.push(obj);
    })
  }

  // create regionsData for business Units
  createRegionstOptionData(data) {
    this.regionData = [];
    data.forEach(region => {
      let obj = {
        id: region.id,
        text: region.geography
      }
      this.regionData.push(obj);
    })
  }

  // fetch region data for the dropdown
  fetchRegion() {
    this.rcsaService.fetchRegion().subscribe(
      (responseData: any) => {
        if (responseData) {
          this.createRegionstOptionData(responseData);
          console.log('region data ::', this.regionData);
        }
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
      },
      () => {
        this.fetchBusinessUnits();
      }
    );
  }

  // fetch business Units data for the dropdown
  fetchBusinessUnits() {
    this.rcsaService.fetchBusinessUnit().subscribe(
      (responseData: any) => {
        if (responseData) {
          this.createBusinessUnitOptionData(responseData);
          console.log('businessUnits data ::', this.businessUnitData);
        }
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
      },
      () => {
        this.fetchRcsaUnits();
      }
    );
  }

  // fetch rcsa units
  fetchRcsaUnits() {
    this.rcsaService.fetchRcsaUnits().subscribe(
      (responseData: any) => {
        if (responseData) {
          this.rcsaUnitsData = responseData;
          //this.createUniqueBuRegionPair(this.rcsaUnitsData)
          console.log('rcsa units data ::', this.rcsaUnitsData);
        }
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
      },
      () => {
        this.appSpinner.display(false);
      }
    );
  }
  // reset error message
  resetrcsaUnitErrorMessage(){
    this.rcsaUnitsData.forEach(unit => {
      unit.rcsaUnitErrorMessage = '';
    })
  }
  //save rcsa unit
  saveRcsaUnit(rowData) {
    this.resetrcsaUnitErrorMessage();
    let errors = this.validateRcsaUnit(rowData);
    var uniquePairErrors = this.validateUniqueBuRegionPair(rowData);
    if (errors != 0) {
      rowData.isValid = false;
    } else {
      rowData.isValid = true;
    }
    if (errors == 0 && uniquePairErrors == 0) {
      this.resetErrorMessage();
      let rcsaObj = {
        "businessUnitId": rowData.businessUnitId,
        "regionId": rowData.regionId,
        "unitRiskManager": {
          "firstName": rowData.unitRiskManager.firstName,
          "lastName": rowData.unitRiskManager.lastName,
          "email": rowData.unitRiskManager.email,
          "phoneNumber": rowData.unitRiskManager.phoneNumber,
        }
      }
      if (rowData.isNewUnit) {
        this.addNewRcsaUnit(rcsaObj, rowData);
      } else {
        this.updateRcsaUnit(rcsaObj, rowData.id, rowData)
      }
    }

    console.log('data for saving ::', rowData, errors, uniquePairErrors)
  }

  // save new rcsa unit
  addNewRcsaUnit(rcsaObj,rowData) {
    this.appSpinner.display(true);
    this.rcsaService.addNewRcsaUnit(rcsaObj).subscribe(
      (responseData: any) => {
        console.log('add new rcsa unit', responseData);
        this.fetchRegion();
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        rowData.rcsaUnitErrorMessage = JSON.parse(errorData.error).message;
      },
      () => {

      }
    )
  }

  // update if rcsa unit is existing
  updateRcsaUnit(rcsaObj, rcsaId,rowData) {
    this.appSpinner.display(true);
    this.rcsaService.updateRcsaUnit(rcsaObj, rcsaId).subscribe(
      (responseData: any) => {
        console.log('update rcsa unit', responseData);
        this.fetchRegion();
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        rowData.rcsaUnitErrorMessage = JSON.parse(errorData.error).message;
      },
      () => {

      }
    )
  }

  ngOnInit() {
    this.appSpinner.display(true);
    this.fetchRegion();
    /*// commenting typeahead
    this.people3Typeahead.pipe(
      tap(() => this.people2Loading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.rcsaService.searchForUnitRiskManager(term)),
    ).subscribe(x => {
      this.unitRiskManagerData = x;
      this.people2Loading = false;
      //this.cd.markForCheck();
    }, () => {
      this.unitRiskManagerData = [];
    });*/

  }
}
