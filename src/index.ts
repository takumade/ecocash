import EcoCash from "./ecocash";


async function example() {
    let m = new EcoCash("<apiKey>", "<merchant>");

    //@ts-ignore
    let response = await m.initPayment("<phone number>", '<amount>', "test");

    let transaction = await m.lookupTransaction(response.sourceReference, response.phone);

    console.log("Response; ", {response});
    console.log("Transaction; ", {transaction});
}
