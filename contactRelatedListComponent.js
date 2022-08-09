import { LightningElement, api,track, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactDetailsHandler.getContactList';
const columns = [
    { label : 'Name', fieldName : 'Name'},
    { label : 'Phone', fieldName : 'Phone', type : 'phone'},
    { label : 'Email', fieldName : 'Email', type : 'email'},
    { label : 'Contact Active', fieldName : 'isActive__c', type : 'checkbox'}
];

export default class RelatedListComponent extends LightningElement {
    
    @api recordId;
    @track records
    error
    columns = columns;

   
    @wire(getContactList,{Id: '$recordId'})
    contacts({ error, data }) {
        console.log(JSON.stringify(data))
        if (data) {
            this.records = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }
}