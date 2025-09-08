import { randomUUID } from "node:crypto";
import fetch from "node-fetch";

interface RefundDetails {
    reference: string, phone: string, amount: number, clientName: string, reason: string, currency?: string 
}

class EcoCash {
    apiKey: string;
    merchant: string;

    baseUrl: string = "https://developers.ecocash.co.zw/api/ecocash_pay/";
    mode: string = "sandbox";


    constructor(apiKey: string, merchant: string) {
        this.apiKey = apiKey;
        this.merchant = merchant;
    }

    getHeaders() {
      return {
        "Content-Type": "application/json",
        "X-API-KEY": this.apiKey,
        "Merchant": this.merchant,
      };
    }

    async initPayment(phone: string, amount: number, reason: string) {
      let reference = randomUUID();

      let url = `${this.baseUrl}api/v2/payment/instant/c2b/${this.mode}`;

      let headers = this.getHeaders();

      let body = {
        "customerMsisdn": phone,
        "amount": amount,
        "reason": reason,
        "currency": "USD",  
        "reference": reference
      };

      let response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      return response.json();
    }

    async refundPayment(details: RefundDetails) {
      let url = `${this.baseUrl}/api/v2/refund/instant/c2b/${this.mode}`;

      let headers = this.getHeaders();

      let body = {
        "origionalEcocashTransactionReference": details.reference,
        "refundCorelator": "012345l61975",
        "sourceMobileNumber": details.phone,
        "amount": details.amount,
        "clientName": details.clientName,
        "currency": details.currency || "USD",
        "reasonForRefund": details.reason
      };

      let response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      return response.json();
    }

}

export default EcoCash
