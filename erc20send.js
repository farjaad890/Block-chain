// function to perform transaction from one wallet to another
//----------------------------------------------------------------------------------------

//first we will get our provider
//provder only gives us access to read only funcions like getBalance
//if we want to perform transastion we need to sign our transaction through our signer.
//----------------------------------------------------------------------------------------
//we are importing ethers library.
const { ethers } = require("ethers");
async function transferFromwallet() {
  //we are getting our provider from our browser this will gives us access to read only funcion
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //we will get the signer against the provider that we have gotten:
  const signer = provider.getSigner();
  //performing read only functions
  //for parameter you can also add ENS name.
  //it will return the balance of the given address.
  const balance = await provider.getbalance("Your wallet addresss");
  //to perform a transaction on the chain we use the signer to sign of on our transaction
  //returns thransaction object.
  signer.sendTransaction({ to: " Sender address", value: "Value to be send" });
}
//<=========================================================================================>
//Function to perform transaction between an erc20 tokken to the wallet.
//------------------------------------------------------------------------------------------

async function transferfromContract() {
  //to perform this transaction we need the contract address of the tokken.
  //you can also use the ens name.
  //then we need the ABI of the contract.Abi is the refrence to the contract methods which are imported into our project.
  //which are used to communicate with the contract.
  const addresss = "Contract address";
  // we will connect out contract to our provider by creating a new contract object
  const newContractobject = await new ethers.Contract(
    addresss,
    "Abi object of the contract",
    "And the provider object"
  );
  //as the contract is connected to the provider we can perform read only methods described in our contract.
  //to perform a transaction from the contract we need a signer.

  const newcontractSigner = newContractobject.connect(
    "The signers wallet adress"
  );

  //now You can use the transfer method in the contract through the signer.

  newcontractSigner.Transfer(
    "to address of the wallet",
    "value you want to send"
  );
}
