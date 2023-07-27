const { Network, Alchemy, Wallet } = require("alchemy-sdk");
const { ethers } = require("ethers");
const apiKey =
  "https://eth-goerli.g.alchemy.com/v2/NkmRnh8V2iHm99YDqMc7a51JpySUdkHD";
const provider = new ethers.providers.JsonRpcProvider(apiKey);
const privateKey =
  "587335e9258f7f08d5c1b2eaf11411ee06641e7e664cda0be2c02ec70b7130fe";
const walletPrivateKey = new Wallet(privateKey);
const wallet = walletPrivateKey.connect(provider);
const tx = {
  to: "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
  value: ethers.utils.parseEther("0.00001"),
};
const sx = {
  to: "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
  value: ethers.utils.parseEther("0.00001"),
};
async function test() {
  try {
    //const balance = await wallet.getBalance();
    const signedTransaction = walletPrivateKey.signTransaction(tx);
    const transaction = await wallet.sendTransaction(sx);
    //const address = await walletPrivateKey.getAddress();
    console.log(transaction);
  } catch (error) {
    console.log(error);
  }
}
test();
//===================================================================================
// const { Abi } = require("./Abi");
// const { ethers } = require("ethers");
// const apiKey =
//   "https://eth-goerli.g.alchemy.com/v2/NkmRnh8V2iHm99YDqMc7a51JpySUdkHD";
// const address = "0x655F2166b0709cd575202630952D71E2bB0d61Af";
// const privateKey =
//   "587335e9258f7f08d5c1b2eaf11411ee06641e7e664cda0be2c02ec70b7130fe";
// const provider = new ethers.providers.JsonRpcProvider(apiKey);
// const wallet = new ethers.Wallet(privateKey, provider);
// const newContractobject = new ethers.Contract(address, Abi, wallet);
// const trans = {
//   to: "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
//   value: ethers.utils.parseEther("0.00001"),
// };
// async function transfer3() {
//   try {
//     const signedTransaction = await wallet.signTransaction(trans);
//     transaction = await wallet.sendTransaction(signedTransaction);
//     //const balance = await wallet.getBalance();
//     console.log(transaction);
//   } catch (error) {
//     console.log(error);
//   }
// }
// transfer3();

// async function transfer2() {
//   try {

//     const transaction = await newContractobject.transfer(
//       "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
//       ethers.utils.parseEther("0.00001")
//     );
//     console.log(transaction);
//   } catch (error) {
//     console.log(error);
//   }
// }
// transfer2();
// async function getDecimal() {
//   try {
//     const decimal = await newContractobject.decimals();
//     console.log(decimal);
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function getName() {
//   try {
//     const name = await newContractobject.name();
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function getSymbol() {
//   try {
//     const symbol = await newContractobject.symbol();
//     console.log(symbol);
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function transfer() {
//   try {
//     const transfer = await newContractobject.transfer(
//       "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
//       ethers.utils.parseEther("0.00001")
//     );
//     console.log(transfer);
//   } catch (error) {
//     console.log(error);
//   }
// }
//transfer();
//getName();
//getSymbol();
//getDecimal();

//============================================================================================

// const { Abi } = require("./Abi");
// const { ethers } = require("ethers");
// const apiServiceProvider =
//   "https://eth-goerli.g.alchemy.com/v2/NkmRnh8V2iHm99YDqMc7a51JpySUdkHD";
// const address = "0x655F2166b0709cd575202630952D71E2bB0d61Af";
// const provider = new ethers.providers.JsonRpcProvider(apiServiceProvider);
// const signer = provider.getSigner("0x3a44c28D48F18AF424AD7623F37F6aE0013314D8");
// const newContractobject = new ethers.Contract(address, Abi, provider);
// const newcontractSigner = newContractobject.connect(signer);
// console.log(signer);
//console.log(newcontractSigner);
//const newcontractSigner = newContractobject.connect(signer);

// async function name() {
//   try {
//     const name = await newContractobject.name();
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//   }
// }
// name();
// async function transfer() {
//   try {
//     const transfer = await newcontractSigner.transfer(
//       "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
//       ethers.utils.parseEther("0.00003")
//     );
//     console.log(transfer);
//   } catch (error) {
//     console.log(error);
//   }
// }

// transfer();
//console.log(newContractobject);

//console.log(signer);
//const wallet = new ethers.Wallet(signer, provider);
//console.log(wallet);
//console.log(provider.getSigner());
//console.log(provider.connection);
//console.log(provider);
