/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import getQuoteData from '@salesforce/apex/QuoteDto.getOrUpdateQuote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EditQuote extends LightningElement {
  @api recordId;
  endDate;
  startDate;

  connectedCallback(){
    getQuoteData({recordId:this.recordId, startDate:this.startDate , endDate:this.endDate}).then(result=>{
        console.log(JSON.parse(JSON.stringify(result)));
        this.endDate = result.endDate;
        this.startDate = result.startDate;
    })
  }
  handleChange(event){
    if(event.target.label == 'Start Date'){
      this.startDate = event.target.value;
      console.log('startDate',this.startDate);
    }
    else{
      this.endDate = event.target.value;
      console.log('endDate',this.endDate);
    }
  }
  handleSave(){
    getQuoteData({recordId:this.recordId, startDate:this.startDate , endDate:this.endDate}).then(result=>{
      console.log(result);
      const event = new ShowToastEvent({
        title: 'Record updated',
        message:
            'Updation successful',
    });
    this.dispatchEvent(event);
    })
  }

  renderedCallback() {}
}