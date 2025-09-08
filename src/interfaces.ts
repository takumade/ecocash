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