export interface RefundDetails {
    reference: string, phone: string, amount: number, clientName: string, reason: string, currency?: string 
}

export interface InitPaymentResponse {
    phone: string,
    amount: number,
    reason: string,
    currency: string,
    sourceReference: string
}

interface TransactionAmount {
    amount: number,
    currency: string
}

export interface LookupTransactionResponse {
    amount: TransactionAmount,
    customerMsisdn: string,
    reference: string,
    ecocashReference: string,
    status: string,
    transactionDateTime: string
}

export interface RefundResponse {
    sourceReference: string,
    transactionEndTime: string,
    callbackUrl: string,
    destinationReferenceCode: string,
    sourceMobileNumber: string,
    transactionStatus: string, // COMPLETED
    amount: number,
    destinationEcocashReference: string,
    clientMerchantCode: string,
    clientMerchantNumber: string,
    clienttransactionDate: string,
    description: string,
    responseMessage: string,  // COMPLETED
    currency: string,
    paymentAmount: number,
    ecocashReference: string,
    transactionstartTime: string
}