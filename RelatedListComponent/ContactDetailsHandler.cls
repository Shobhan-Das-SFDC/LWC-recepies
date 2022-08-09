public with sharing class ContactDetailsHandler {
    public ContactDetailsHandler() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String Id){
        try {
            return [Select Id,Name,Phone,Email,isActive__c,AccountId From Contact Where AccountId=:Id];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
