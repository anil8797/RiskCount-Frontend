import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, ResponseContentType} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'environments/environment';
@Injectable()
export class RcsaService {
  apiHost: any                                 = './assets/data/';
  hostUrl: any                                 = environment.apiEndPoint;

  urlForCommonFileUpload: any = this.hostUrl+'file/upload/';
  urlForUploadFile: any = this.hostUrl+'policy/uploadfile/';
  urlForDownloadFile: any = this.hostUrl+'policy/downloadfile/';
  //URL for risk
  urlForRisk: any = this.hostUrl+'risk/';
  //URL for policy
  urlForPolicy: any = this.hostUrl+'policy/';
  //URL for Control Category
  urlForControlCategory: any = this.hostUrl+'controlcategory/';
  //URL for Control Procedures
  urlForControlProcedures: any = this.hostUrl+'controlprocedures/';
  //URL for severity
  urlForSeverity: any = this.hostUrl+'severity/';
  //URL for Inherrent
  urlForInherrent:any = this.hostUrl+'inherentRisks/'
  //URL for regions
  urlForRegion:any = this.hostUrl+'region/'
  //URL for regions
  urlForBusinessUnit:any = this.hostUrl+'businessunit/'
  //URL for severity
  urlForSeverities: any = this.hostUrl+'severity/';
  //URL for Likelihoods
  urlForLikelihoods:any = this.hostUrl+'master/likelihoods/';
  //URL for currency
  urlForCurrency:any = this.hostUrl+'master/currency/'
  //URL for assessor
  urlForAssessor:any = this.hostUrl+'ext/assessor/assessment/';
  urlForAddAttachement:any = this.hostUrl + 'ext/assessor/addFiles/';
  urlForDeleteAttachement:any = this.hostUrl + 'ext/assessor/removeFile/';
  urlToDownloadAttachment:any = this.hostUrl + 'ext/assessor/downloadFile/'
  urlToSaveAssessment : any = this.hostUrl + 'ext/assessor/assessment/save/';
  urlToSubmitAssessment :any = this.hostUrl + 'ext/assessor/assessment/submit/';
  // URL for coordinator
  urlToFetchCoordinatorAssessment:any = this.hostUrl + 'coordinator/getAssessmentDetails';
  urlToFetchAssessmentUnits:any = this.hostUrl + 'coordinator/getAssessmentUnits';
  urlToFetchCoordinatorDashboardata:any = this.hostUrl + 'coordinator/dashboard';
  urlToFetchUnitRiskManagerDashboardata:any = this.hostUrl + 'unitRiskManager/dashboard';
  urlToSaveCoordinatorAssessment:any = this.hostUrl + 'coordinator/save';
  urlToSubmitCoordinatorAssessment:any = this.hostUrl + 'coordinator/submit';
  // URL for unit risk manager
  urlToFetchUnitRmAssessment:any = this.hostUrl + 'unitRiskManager/getRCSA/';
  urlToSaveUnitRmAssessment:any = this.hostUrl + 'unitRiskManager/saveRCSA/';
  urlToSubmitUnitRmAssessment:any = this.hostUrl + 'unitRiskManager/submitRCSA/';
  urlToExtendRcsaEndDate:any = this.hostUrl + 'rcsa/updateEndDate';
  // URL for unit rm remediation summary report
  urlToFetchremediationSummary:any = this.hostUrl + 'unitRiskManager/getRemediationSummary/';
  urlToFetchBusinessUnits:any = this.hostUrl + 'businessFunctionalUnits';
  urlToSaveRemediationSummary:any = this.hostUrl + 'unitRiskManager/saveRemediation';
  urlToGetUnassignedRemediations:any = this.hostUrl + 'unitRiskManager/getUnassignedRemediations';
  urlToGetUnassignedRemediationsByRcsaUnit:any = this.hostUrl + 'rcsa/getUnassignedRemediations?rcsaUnitId=';

  // URL for coordinator remediations
  urlToFetchCoordinatorRemediations:any = this.hostUrl +'coordinator/openRemediations';
  urlToUpdateCoordinatorRemediations:any = this.hostUrl +'coordinator/updateRemediation';
  // URL for unit rm remediations
  urlToFetchUnitrmRemediations:any = this.hostUrl + 'unitRiskManager/getOutstandingRemediations?rcsaUnitId=';
  urlToSaveUnitrmRemediation:any = this.hostUrl + 'unitRiskManager/saveRemediation';
  urlToNotifyBfusAndCoowners:any = this.hostUrl + 'unitRiskManager/notifyBfusAndCoowners/remediation/';
  // URL for unit rm test documents
  urlFetchAttachmentsCategories:any = this.hostUrl + 'unitRiskManager/getRCSAAttachmentCount/';
  urlFetchAttachmentsByCategory:any = this.hostUrl + 'unitRiskManager/getControlCategoryAttachments?masterDetailId=';
  urlDownloadDocumentAttachment:any = this.hostUrl + '/unitRiskManager/downloadFile/';
  // URL for start rcsa
  urlToStartRcsa:any = this.hostUrl + 'rcsa';
  urlToFetchAssociatedRisks:any = this.hostUrl + 'unitRiskManager/getAssociatedRCSAUnits';
  // URL for rcsa unit setup
  urlToFetchRcsaUnits:any = this.hostUrl + 'rcsaunits';
  urlToFetchRcsaByRcsaUnits:any = this.hostUrl + 'rcsa/getRCSAsForRCSAUnit?rcsaUnitId=';
  urlToSearchUnitRm:any = this.hostUrl + 'unitRiskManager/search/';
  utlToChangeRcsaStatus:any = this.hostUrl + 'rcsaunits/';
  urlForAddNewRcsaUnit:any = this.hostUrl + 'rcsaunits';
  // URL for set business functions
  urlForGetBusinessFunctionUnits:any = this.hostUrl + 'businessFunctionalUnits/getByRCSAUnit?rcsaUnitId=';
  urlForGetAllRcsaUnits:any = this.hostUrl + 'unitRiskManager/getAllRCSAUnits'; // for unit rm riskunit list is different
  urlToSaveBfu:any = this.hostUrl + 'businessFunctionalUnits/save';
  urlToBulkBfuUpload:any = this.hostUrl + 'businessFunctionalUnits/upload/';
  urlToSaveAssessor:any = this.hostUrl + 'businessFunctionalUnits/saveAssessor';
  urlToSaveSetup:any = this.hostUrl + 'businessFunctionalUnits/saveSetup';
  urlToDeleteBfu:any = this.hostUrl + 'businessFunctionalUnits/';
  urlToDeleteAssessor:any = this.hostUrl + 'businessFunctionalUnits/deleteAssessor?id=';
  urlToTagRisk:any = this.hostUrl +'businessFunctionalUnits/tagRisks';
  urlToDeletTaggedRisk:any = this.hostUrl +'businessFunctionalUnits/deleteRisk';
  urlToSearchRisk:any = this.hostUrl + 'risk/getRiskBySearchKey?searchKey=';
  urlToGetRisksTaggedControlCategories:any = this.hostUrl + 'risk/getRisksTaggedToControlCategories';
  // URL for dashboard
  urlToFetchRcsaUnitsForDashboard:any = this.hostUrl + 'rcsaunits?fetchAll=false';
  urlToGetDashboardRemediationData:any = this.hostUrl + 'enterpriseRiskManager/remediationDashboard/';
  urlToGetDashboardRiskData:any = this.hostUrl + 'enterpriseRiskManager/riskDashboard/';
  // URL to notify User
  urlToSendReminder:any = this.hostUrl + 'rcsa/sendReminder';
  // URL for remediation units
  urlToSaveRemediationUnit:any = this.hostUrl + 'remediationUnits/save';
  urlToBulkRemediationUpload:any = this.hostUrl + 'remediationUnits/upload/';
  urlForGetRemediationUnits:any =  this.hostUrl + 'remediationUnits/';
  urlToRemediationCordinator:any = this.hostUrl + 'remediationUnits/saveCoordinator';
  urlToGetAllRCMs:any = this.hostUrl + 'superuser/getRCSAs';
  urlToResetRCM:any = this.hostUrl + 'superuser/reset-rcsa';

  constructor(
    private http: Http,
    private httpClient : HttpClient
  ) { }

  //Service to fetch all the locally stored JSON data - - - - - - -
  fetchJsonData(jsonFileName: any) {
    let jsonFileLoc: any = this.apiHost+jsonFileName;
    return this.http.get(jsonFileLoc)
      .map((response: Response) => response.json());
  }

  fetchRisk(): Observable<any> {

    return this.httpClient.get(this.urlForRisk).map((response: any) => response);
  }

  addRisk(riskData: any): Observable<any> {

    return this.httpClient.post(this.urlForRisk, riskData).map((response: any) => response);
  }

  updateRisk(riskData: any): Observable<any> {

    return this.httpClient.put(this.urlForRisk, riskData).map((response: any) => response);
  }

  deleteRisk(id: any): Observable<any> {

    return this.httpClient.delete(this.urlForRisk+id).map((response: any) => response);
  }

  //api's for policy
  fetchPolicy(): Observable<any> {

    return this.httpClient.get(this.urlForPolicy).map((response: any) => response);
  }

  fileUpload(files:any, uploadName:string): Observable<any> {

    let file: File = files[0];

    let headers = new Headers();

    let formData = new FormData();
    formData.append('file', file);
    formData.append('uploadName', uploadName);

    return this.httpClient.post(this.urlForCommonFileUpload, formData).map((response: any) => response);
  }

  downloadFile(id: number, name: string): Observable<any> {

    return this.httpClient.get(this.urlForDownloadFile+id+"/"+name, {responseType: 'blob'})
      .map((response: any) => response);
  }

  addPolicy(policyData: any): Observable<any> {

    return this.httpClient.post(this.urlForPolicy, policyData).map((response: any) => response);
  }

  updatePolicy(policyData: any): Observable<any> {

    return this.httpClient.put(this.urlForPolicy, policyData).map((response: any) => response);
  }

  deletePolicy(id: any): Observable<any> {

    return this.httpClient.delete(this.urlForPolicy+id).map((response: any) => response);
  }

  //api's for control category
  fetchControlCategory(): Observable<any> {

    return this.httpClient.get(this.urlForControlCategory).map((response: any) => response);
  }

  addControlCategory(controlCategoryData: any): Observable<any> {

    return this.httpClient.post(this.urlForControlCategory, controlCategoryData).map((response: any) => response);
  }

  updateControlCategory(controlCategoryData: any): Observable<any> {

    return this.httpClient.put(this.urlForControlCategory, controlCategoryData).map((response: any) => response);
  }

  deleteControlCategory(id: any): Observable<any> {

    return this.httpClient.delete(this.urlForControlCategory+id).map((response: any) => response);
  }

  //api's for control Procedures
  deleteControlProcedures(id: any): Observable<any> {

    return this.httpClient.delete(this.urlForControlProcedures+id).map((response: any) => response);
  }

  //api's for severity
  fetchSeverity(): Observable<any> {

    return this.httpClient.get(this.urlForSeverity).map((response: any) => response);
  }

  addSeverity(severityData: any): Observable<any> {

    return this.httpClient.post(this.urlForSeverity, severityData).map((response: any) => response);
  }

  updateSeverity(severityData: any): Observable<any> {

    return this.httpClient.put(this.urlForSeverity, severityData).map((response: any) => response);
  }

  deleteSeverity(id: any): Observable<any> {

    return this.httpClient.delete(this.urlForSeverity+id).map((response: any) => response);
  }

  //api's for inherrent risk rating
  getInherentRating(id:any):Observable<any>{
    return this.httpClient.get(this.urlForInherrent + id).map((response: any) => response);
  }
  updateInherentRating(id:any, inherrentData:any):Observable<any>{
    return this.httpClient.patch(this.urlForInherrent + id, inherrentData).map((response: any) => response);
  }
  saveInherentRating(inherrentData:any):Observable<any>{
    return this.httpClient.post(this.urlForInherrent, inherrentData).map((response: any) => response);
  }
  fetchRiskDetails(id:any):Observable<any>{
    return this.httpClient.get(this.urlForInherrent+id).map((response: any) => response);
  }
  //api's for getting Severity Master
  fetchSeverities():Observable<any>{
    return this.httpClient.get(this.urlForSeverities).map((response: any) => response);
  }
  fetchLikelihoods():Observable<any>{
    return this.httpClient.get(this.urlForLikelihoods).map((response: any) => response);
  }
//  api's for regions
  fetchRegion(): Observable<any> {

    return this.httpClient.get(this.urlForRegion).map((response: any) => response);
  }

  addRegion(regionData: any): Observable<any> {

    return this.httpClient.post(this.urlForRegion, regionData).map((response: any) => response);
  }

  updateRegion(regionData: any): Observable<any> {

    return this.httpClient.put(this.urlForRegion, regionData).map((response: any) => response);
  }

  deleteRegion(id: any): Observable<any> {

    return this.httpClient.delete(this.urlForRegion+id).map((response: any) => response);
  }

  //  api's for business unit
  fetchBusinessUnit(): Observable<any> {

    return this.httpClient.get(this.urlForBusinessUnit).map((response: any) => response);
  }

  addBusinessUnit(businessUnitData: any): Observable<any> {

    return this.httpClient.post(this.urlForBusinessUnit, businessUnitData).map((response: any) => response);
  }

  updateBusinessUnit(businessUnitData: any): Observable<any> {

    return this.httpClient.put(this.urlForBusinessUnit, businessUnitData).map((response: any) => response);
  }

  deleteBusinessUnit(id: any): Observable<any> {
    return this.httpClient.delete(this.urlForBusinessUnit+id).map((response: any) => response);
  }

  //api for currency
  fetchCurrency(): Observable<any> {
    return this.httpClient.get(this.urlForCurrency).map((response: any) => response);
  }
  //api for assessor views
  fetchAssessorData(id:any):Observable<any>{
    return this.http.get(this.urlForAssessor + id).map((response:any) => response.json());
  }
  addAttachment(id:any, files):Observable<any>{
    let fileCount: number = files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        formData.append('inputFiles', files[i]);
      }
    };
    return this.http.post(this.urlForAddAttachement + id, formData).map((response:any) => response.json());
  }
  deleteAttachment(id:any, fileId:number):Observable<any>{
    return this.http.delete(this.urlForDeleteAttachement + id + '/' + fileId).map((response:any) => response.json());
  }
  downloadAttachment(id:any, fileId:number):Observable<any>{
    return this.http.get(this.urlToDownloadAttachment + id + '/' + fileId + '?fileViewType=DOWNLOAD',{ responseType: ResponseContentType.Blob }).map((response:any) => response);
  }
  saveAssessment(id:any, data){
    return this.http.post(this.urlToSaveAssessment + id, data).map((response:any) => response.json());
  }
  submitAssessment(id:any){
    return this.http.post(this.urlToSubmitAssessment + id, {}).map((response:any) => response.json());
  }
  // api's for coordinator view
  fetchGetAssessmentForCoordinator(assessmentId): Observable<any> {
    return this.httpClient.get(this.urlToFetchCoordinatorAssessment + '?assessmentUnitId=' + assessmentId).map((response: any) => response);
  }
  fetchAssessmentUnits(): Observable<any> {
    return this.httpClient.get(this.urlToFetchAssessmentUnits).map((response: any) => response);
  }
  fetchCoordinatorDashboardData(): Observable<any> {
    return this.httpClient.get(this.urlToFetchCoordinatorDashboardata).map((response: any) => response);
  }
  fetchUnitRiskManagerDashboardData(): Observable<any> {
    return this.httpClient.get(this.urlToFetchUnitRiskManagerDashboardata).map((response: any) => response);
  }
  saveCoordinatorAssessment(data){
    return this.httpClient.post(this.urlToSaveCoordinatorAssessment, data).map((response:any) => response);
  }
  submitCoordinatorAssessment(assessmentId){
    return this.httpClient.post(this.urlToSubmitCoordinatorAssessment + '?assessmentUnitId=' + assessmentId, {}).map((response:any) => response);
  }
  // api's for unit risk manager view
  fetchGetAssessmentForUnitRm(rcsaId:any){
    return this.httpClient.get(this.urlToFetchUnitRmAssessment + rcsaId).map((response:any) => response);
  }
  saveUnitRmAssessment(data, rcsaId){
    return this.httpClient.post(this.urlToSaveUnitRmAssessment + rcsaId, data).map((response:any) => response);
  }
  submitUnitRmAssessment(rcsaId) {
    return this.httpClient.post(this.urlToSubmitUnitRmAssessment + rcsaId, {}).map((response: any) => response);
  }
  extendRcsaEndDate(data){
    return this.httpClient.patch(this.urlToExtendRcsaEndDate, data).map((response: any) => response);
  }
  // api's for unit RM test documents
  fetchAttachmentsCategories(rcsaId){
    return this.httpClient.get(this.urlFetchAttachmentsCategories + rcsaId).map((response:any) => response);
  }
  fetchAttachmentsByCategory(masterDetailId, rcsaId){
    return this.httpClient.get(this.urlFetchAttachmentsByCategory + masterDetailId + '&rcsaId=' + rcsaId).map((response:any) => response);
  }
  downloadDocumentAttachment(fileId:number):Observable<any>{
    return this.httpClient.get(this.urlDownloadDocumentAttachment + fileId + '?fileViewType=DOWNLOAD',{ responseType: 'blob', observe: 'response'}).map(res => ({content: res.body,
      fileName: res.headers.get('content-filename')}));
  }
  // api's for unit RM remediation summary
  getUnassignedRemediations(){
    return this.httpClient.get(this.urlToGetUnassignedRemediations).map((response:any) => response);
  }
  getUnassignedRemediationsByRcsaUnit(rcsaUnitId){
    return this.httpClient.get(this.urlToGetUnassignedRemediationsByRcsaUnit + rcsaUnitId).map((response:any) => response);
  }
  fetchBusinessFunctionUnits(){
    return this.httpClient.get(this.urlToFetchBusinessUnits).map((response:any) => response);
  }
  fetchRemediationSummary(rcsaId:any){
    return this.httpClient.get(this.urlToFetchremediationSummary + rcsaId).map((response:any) => response);
  }
  saveRemediationSummary(data) {
    return this.httpClient.post(this.urlToSaveRemediationSummary, data).map((response: any) => response);
  }

  //api's for coordinator remediations
  fetchRemediationCoordinatorSummary(){
    return this.httpClient.get(this.urlToFetchCoordinatorRemediations).map((response:any) => response);
  }
  updateRemediationCoordinatorSummary(data){
    return this.httpClient.patch(this.urlToUpdateCoordinatorRemediations,data).map((response:any) => response);
  }
  //api's for the unit rm remediations
  fetchRemediationsUnitrmSummary(rcsaUnitId, days){
    return this.httpClient.get(this.urlToFetchUnitrmRemediations+rcsaUnitId + '&days=' + days).map((response:any)=>response);
  }
  saveUnitRmRemediation(data){
    return this.httpClient.post(this.urlToSaveUnitrmRemediation, data).map((response: any) => response);
  }
  notifyBfusAndCoowners(remediationId){
    return this.httpClient.post(this.urlToNotifyBfusAndCoowners + remediationId, {}).map((response: any) => response);
  }
  // api's for start rcsa
  startRcsa(data){
    return this.httpClient.post(this.urlToStartRcsa, data).map((response: any) => response);
  }
  fetchAssociatedRisks(){
    return this.httpClient.get(this.urlToFetchAssociatedRisks).map((response: any) => response);
  }
  // api's for admin rcsa unit setups
  fetchRcsaUnits(){
    // fetch all rcsa units
    return this.httpClient.get(this.urlToFetchRcsaUnits).map((response: any) => response);
  }
  fetchRcsaByRcsaUnits(rcsaUnitId){
    // fetch all rcsa based on rcsa units
    return this.httpClient.get(this.urlToFetchRcsaByRcsaUnits + rcsaUnitId).map((response: any) => response);
  }
  searchForUnitRiskManager(query){
    return this.httpClient.get(this.urlToSearchUnitRm+ query).map((response: any) => response);
  }
  changeRcsaUnitStatus(rcsaUnitId, status){
    return this.httpClient.patch(this.utlToChangeRcsaStatus + rcsaUnitId + '/status', status).map((response: any) => response);
  }
  addNewRcsaUnit(data){
    return this.httpClient.post(this.urlForAddNewRcsaUnit, data).map((response: any) => response);
  }
  updateRcsaUnit(data, rcsaUnitId){
    return this.httpClient.patch(this.urlForAddNewRcsaUnit+'/'+rcsaUnitId, data).map((response: any) => response);
  }
  // api's for setup business functionn unit
  getBusinessFunctionUnitsData(rcsaUnitId){
    return this.httpClient.get(this.urlForGetBusinessFunctionUnits+ rcsaUnitId).map((response: any) => response);
  }
  getAllrcsaUnits(){
    return this.httpClient.get(this.urlForGetAllRcsaUnits).map((response: any) => response);
  }
  saveBfu(data){
    return this.httpClient.post(this.urlToSaveBfu, data).map((response: any) => response);
  }
  uploadBfuData(rcsaUnitId:any, files):Observable<any>{
    let fileCount: number = files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        formData.append('inputFile', files[i]);
      }
    };
    return this.httpClient.post(this.urlToBulkBfuUpload + rcsaUnitId, formData).map((response:any) => response.json());
  }
  saveAssessor(data){
    return this.httpClient.post(this.urlToSaveAssessor, data).map((response: any) => response);
  }
  saveSetupForRcsa(data){
    return this.httpClient.post(this.urlToSaveSetup, data).map((response: any) => response);
  }
  deleteBfu(id){
    return this.httpClient.delete(this.urlToDeleteBfu + id).map((response: any) => response);
  }
  deleteAssessor(id,assessmentUnitId){
    return this.httpClient.delete(this.urlToDeleteAssessor + id + '&assessmentUnitId=' + assessmentUnitId).map((response: any) => response);
  }
  tagRisk(assessmentUnitId, riskId, allRisks){
    let url ='';
    if(riskId){
        url = this.urlToTagRisk + '?assessmentUnitId=' + assessmentUnitId + '&riskId=' + riskId + '&allRisks=' + allRisks;
    }else{
        url = this.urlToTagRisk + '?assessmentUnitId=' + assessmentUnitId +  '&allRisks=' + allRisks;
    }
    return this.httpClient.post(url, {}).map((response: any) => response);
  }
  deleteTaggedRisk(id){
    return this.httpClient.delete(this.urlToDeletTaggedRisk + '/' + id).map((response: any) => response);
  }
  searchRisk(key){
    return this.httpClient.get(this.urlToSearchRisk + key).map((response: any) => response);
  }
  getRisksTaggedControlCategories(){
    return this.httpClient.get(this.urlToGetRisksTaggedControlCategories).map((response: any) => response);
  }
  //api's for dashboard
  fetchRcsaUnitsForDashboard(){
    // fetch all rcsa units
    return this.httpClient.get(this.urlToFetchRcsaUnitsForDashboard).map((response: any) => response);
  }
  getRemediationDashboardData(riskUnitId){
    return this.httpClient.get(this.urlToGetDashboardRemediationData + riskUnitId).map((response: any) => response);
  }
  getRiskDashboardData(riskUnitId){
    return this.httpClient.get(this.urlToGetDashboardRiskData + riskUnitId).map((response: any) => response);
  }
  // Notify Users for RM  and Coordinator
  sendReminder(data){
    return this.httpClient.post(this.urlToSendReminder, data).map((response: any) => response);
  }

  //api's for remediation units
  saveRemediationUnit(data){
    return this.httpClient.post(this.urlToSaveRemediationUnit, data).map((response: any) => response);
  }
  uploadRemediationData(rcsaUnitId:any, files):Observable<any>{
    let fileCount: number = files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        formData.append('inputFile', files[i]);
      }
    };
    return this.httpClient.post(this.urlToBulkRemediationUpload + rcsaUnitId, formData).map((response:any) => response.json());
  }
  getRemediationUnits(rcsaUnitId){
    return this.httpClient.get(this.urlForGetRemediationUnits + rcsaUnitId).map((response: any) => response);
  }
  saveRemediationCordinator(data){
    return this.httpClient.post(this.urlToRemediationCordinator, data).map((response: any) => response);
  }
  getAllRCMs(){
    return this.httpClient.get(this.urlToGetAllRCMs).map((response: any) => response);
  }
  resetRcm(rcsaId){
    return this.httpClient.delete(`${this.urlToResetRCM}/${rcsaId}`).map((response: any) => response);
  }
}
