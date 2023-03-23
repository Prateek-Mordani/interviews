public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date endDate;
  @AuraEnabled
  public Date startDate;
  public QuoteDto() {
  }
  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
  }

  public override SObject refreshSo() {
    return null;
  }
  @AuraEnabled
  public static QuoteDto getOrUpdateQuote(Id recordId, date startDate, date endDate){
      quote__c testQuote = [Select EndDate__c, StartDate__c from Quote__c where id=:recordId];
      QuoteDto WrapperCls= new QuoteDto(); 
      if(startDate == null && endDate==null){
        WrapperCls = new QuoteDto(testQuote);
        system.debug(WrapperCls);
      }
      else{
        testQuote.EndDate__c = endDate;
        testQuote.StartDate__c = startDate; 
        WrapperCls = new QuoteDto(testQuote);
        update testQuote;
      }
      return WrapperCls;

  }
 

}
