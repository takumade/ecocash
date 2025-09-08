import { randomUUID } from "node:crypto";
import axios from "axios";
import { InitPaymentResponse, LookupTransactionResponse, RefundDetails, RefundResponse } from "./interfaces";



class EcoCash {
    apiKey: string;
    merchant: string;

    baseUrl: string = "https://developers.ecocash.co.zw/api/ecocash_pay/";
    mode: string;


    constructor(apiKey: string, merchant: string, mode: string = "sandbox") {
        this.apiKey = apiKey;
        this.merchant = merchant;
        this.mode = mode;
    }

    setLiveMode() {
        this.mode = "live";
    }

    getHeaders() {
      return {
        "Content-Type": "application/json",
        "X-API-KEY": this.apiKey,
        "Merchant": this.merchant,
      };
    }

    async initPayment(phone: string, amount: number, reason: string): Promise<InitPaymentResponse> {
      let reference = randomUUID();


      let url = `${this.baseUrl}api/v2/payment/instant/c2b/${this.mode}`;

      let body = {
        "customerMsisdn": phone,
        "amount": amount,
        "reason": reason,
        "currency": "USD",  
        "sourceReference": reference
      };

      let response = await this.makeRequest(url, "POST", body);

      return {
        ...response,
        ...body
      }
    }

    async refundPayment(details: RefundDetails): Promise<RefundResponse> {
      let url = `${this.baseUrl}/api/v2/refund/instant/c2b/${this.mode}`;

      let body = {
        "origionalEcocashTransactionReference": details.reference,
        "refundCorelator": "012345l61975",
        "sourceMobileNumber": details.phone,
        "amount": details.amount,
        "clientName": details.clientName,
        "currency": details.currency || "USD",
        "reasonForRefund": details.reason
      };

      let response = await this.makeRequest(url, "POST", body);

      return response
    }

    async lookupTransaction(reference: string, phone: string): Promise<LookupTransactionResponse> {
      let url = `${this.baseUrl}/api/v1/transaction/c2b/status/${this.mode}`;

      let body = {
        "sourceMobileNumber": phone,
        "sourceReference": reference
      };

      let response = await this.makeRequest(url, "POST", body);

      return response
    }

    async makeRequest(url: string, method: string, body: any) {

      try {
      let headers = this.getHeaders();

      let response = await axios({
        method: method,
        url: url,
        headers: headers,
        data: body
      });

      return response.data;
    } catch (error) {
      throw error;
    }
    }
}

export default EcoCash
