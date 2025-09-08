# EcoCash Javascript Library

This is a Javascript SDK library for EcoCash Open API.

## Installation

```bash
npm i ecocash
```

## Usage

The basic follow is as follows:


### Step 1: Create an EcoCash object

You can create an EcoCash object as follows: 

```javascript
const EcoCash = require("ecocash");

const merchant = new EcoCash("<apiKey>", "<merchant code>");
```

### Step 2: Initialize a payment as follows

```javascript
const response = await merchant.initPayment("26377854266", 20.05, "bread");
```

### Step 3: Poll for transaction status

You can poll for transaction status as follows:

```javascript
const transaction = await merchant.lookupTransaction(response.reference, response.phone);

if (transaction.status === "SUCCESS") {
    console.log("Transaction successful");
}
``` 

You can use bare loops on their own or add a timeout to poll for transaction status or add an exponential backoff to poll for transaction status.


### Step 4: Refunding a payment

```javascript
const response = await merchant.refundPayment({
    reference: "reference",
    phone: "263778548266",
    amount: 20.05,
    clientName: "bread",
    reason: "The bread was rotten"
});
```


### Full Example

```javascript
const EcoCash = require("ecocash");

const merchant = new EcoCash("apiKey", "merchant");
const response = await merchant.initPayment("26377854266", 20.05, "bread");

console.log(response);

// Poll for transaction status
const transaction = await merchant.lookupTransaction(response.reference, response.phone);

if (transaction.status === "SUCCESS") {
    console.log("Transaction successful");
}
```

## Going Live

To go live, you can set the mode to "live" as follows:

```javascript
const merchant = new EcoCash("<apiKey>", "<merchant>", "live");     
``` 

OR

```javascript
const merchant = new EcoCash("<apiKey>", "<merchant>");     
merchant.setLiveMode();
```

## Special Thanks

- [Ecocash](https://ecocash.co.zw/)
- [LordSky](https://pypi.org/user/lordskyzw/)
