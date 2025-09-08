

# EcoCash Javascript Library

This is a Javascript SDK library for EcoCash Open API.

## Installation

```bash
npm i ecocash
```

## Usage

```javascript
const EcoCash = require("ecocash");

const wallet = new EcoCash("apiKey", "merchant");
const response = await wallet.initPayment("phone", "amount", "reason");

console.log(response);

// Poll for transaction status
const transaction = await wallet.lookupTransaction(response.reference, response.phone);

if (transaction.status === "SUCCESS") {
    console.log("Transaction successful");
}
```

## Special Thanks

- [Ecocash](https://ecocash.co.zw/)
- [LordSky](https://pypi.org/user/lordskyzw/)
