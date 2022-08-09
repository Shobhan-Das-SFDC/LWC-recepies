import { api, LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getPolicyRecords from '@salesforce/apex/FetchPolicyExceptionTemplates.records';
import ACCOUNT_FIELD from '@salesforce/schema/LLC_BI__Product_Package__c.LLC_BI__Account__c';
import { NavigationMixin } from 'lightning/navigation';

export default class NCinoPolicyException extends NavigationMixin(LightningElement) {
@api recordId 
@api accId
@track policy = {}
@api peId
@track records
@track showComponent = false;

@track columns = [
    { label: 'Policy Exception Name', fieldName: 'Name', type: 'text' },
    { label: 'Policy Exception Type', fieldName: 'LLC_BI__Type__c', type: 'text' },
    { label: 'Proposed Exception', fieldName: 'Proposed_Exception__c'},
    { label: 'Brief Commentary', fieldName: 'Brief_Commentary__c'},
    { type: "button", typeAttributes: { label: "Edit",name: "editPolicyException",variant: "brand"}}
];

handleRowAction(event) {
    //const actionName = event.detail.action.name;
    this.policy = event.detail.row;
    console.log("Policy Record "+JSON.stringify(this.policy));
    this.peId = event.detail.row.Id;    
    //this.accId = event.detail.row.LLC_BI__Relationship__c;
    console.log("Pe record Id "+this.peId);
    //console.log("Account record Id "+this.accId);
    if(this.peId != undefined){
        this.accId = undefined;
        this.showComponent = true;
    }
    
}

@wire (getPolicyRecords, {recordId: '$recordId'})
wireRecord({data,error}){
    console.log('data' + data);
    if(data){
        this.records = data;
        this.error = undefined;
    }
    else{
        this.error = error;
        this.data=undefined;
    }
}
}