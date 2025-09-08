import EcoCash from "./ecocash";



let m = new EcoCash("0XelmqKaarSfHlgftK2vtkwWFRaQoSVh", "08658");

// m.initPayment("263778548832", 100, "test").then((response) => {
//     console.log("Response; ", {response});
// }).catch((error) => {
//     console.log(error);
// });

m.lookupTransaction("325a802f-943e-47c2-addf-010285f09cea", "263778548832").then((response) => {
    console.log("Response; ", {response});
}).catch((error) => {
    console.log(error);
});
    