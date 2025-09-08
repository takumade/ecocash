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