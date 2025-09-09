# Ecocash Javascript Library

This is a Javascript SDK library for Ecocash Open API.

## Installation

```bash
npm i ecocash
```

> [!NOTE]
> You can use whichever package manager you prefer, it should work.

### For development

Run build and start scripts concurrently:

```bash
npm run dev
```

Or run build and start scripts separately:

```bash
npm run build
npm run start
```


## Usage

The basic follow is as follows:


### Step 1: Create an Ecocash object

You can create an Ecocash object as follows: 

```javascript
const Ecocash = require("ecocash");

const merchant = new Ecocash("<apiKey>", "<merchant code>");
```

### Step 2: Initialize a payment

```javascript
const response = await merchant.initPayment("26377854266", 20.05, "bread");
```

Response:

```javascript
{
    phone: '26377854266',
    amount: 20.05,
    reason: 'bread',
    currency: 'USD',
    sourceReference: '325a802f-943e-47c2-addf-010285f09cea'
}
```

### Step 3: Poll for transaction status

You can poll for transaction status as follows:

Known statuses(for now):
- `SUCCESS`
- `PENDING_VALIDATION`

```javascript
const transaction = await merchant.lookupTransaction(response.sourceReference, response.phone);

if (transaction.paymentSuccess) {
    console.log("Transaction successful");
}
``` 

Response:

```javascript
{
    amount: { amount: 100, currency: 'USD' },
    customerMsisdn: '263778548832',
    reference: '325a802f-943e-47c2-addf-010285f09cea',
    ecocashReference: 'MP250908.1537.A22242',
    status: 'SUCCESS',
    transactionDateTime: '2025-09-08 15:37:16'
}
```

> [!NOTE]
> The default lookupTransaction method requires you to add poll logic by yourself. But with the pollTransaction method, you can poll for transaction status as follows:

```javascript
merchant.pollTransaction(response, strategy, options);
```

Where:

- response: The response from the `initPayment` method
- strategy: The strategy to use for polling (SIMPLE, INTERVAL, BACKOFF)
- options: The options to use for polling (interval, backoff, multiplier, sleep)

NB: The default strategy is `INTERVAL`.
NB: Options are optional and default to { interval: 10, multiplier: 2, sleep: 1000 }.

#### Polling examples

Interval strategy:
```javascript
// Poll for transaction status with interval
const transaction = await merchant.pollTransaction(response, PollStrategies.INTERVAL, { interval: 10 });

if (transaction.paymentSuccess) {
    console.log("Transaction successful");
}
```


Backoff strategy:
```javascript
// Poll for transaction status with backoff
const transaction = await merchant.pollTransaction(response, PollStrategies.BACKOFF, { multiplier: 2, interval: 15, sleep: 2000 });

if (transaction.paymentSuccess) {
    console.log("Transaction successful");
}
```

Simple strategy:
```javascript
// Poll for transaction status with simple strategy
const transaction = await merchant.pollTransaction(response, PollStrategies.SIMPLE);

if (transaction.paymentSuccess) {
    console.log("Transaction successful");
}

```


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
const Ecocash = require("ecocash");

const merchant = new Ecocash("apiKey", "merchant");
const response = await merchant.initPayment("26377854266", 20.05, "bread");

console.log(response);

// Poll for transaction status
const transaction = await merchant.pollTransaction(response);

if (transaction.paymentSuccess) {
    console.log("Transaction successful");
}
```

## Going Live

To go live, you can set the mode to "live" as follows:

```javascript
const merchant = new Ecocash("<apiKey>", "<merchant>", "live");     
``` 

OR

```javascript
const merchant = new Ecocash("<apiKey>", "<merchant>");     
merchant.setLiveMode();
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.




## Special Thanks

- [Ecocash](https://ecocash.co.zw/)
- [LordSky](https://pypi.org/user/lordskyzw/)
