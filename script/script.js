const { Abi } = require("./Abi");
const { ethers } = require("ethers");
const apiKey =
  "https://eth-goerli.g.alchemy.com/v2/NkmRnh8V2iHm99YDqMc7a51JpySUdkHD";
const address = "0x655F2166b0709cd575202630952D71E2bB0d61Af";
const privateKey =
  "587335e9258f7f08d5c1b2eaf11411ee06641e7e664cda0be2c02ec70b7130fe";
const provider = new ethers.providers.JsonRpcProvider(apiKey);
const wallet = new ethers.Wallet(privateKey, provider);
const newContractobject = new ethers.Contract(address, Abi, wallet);

async function getDecimal() {
  try {
    const decimal = await newContractobject.decimals();
    console.log(decimal);
  } catch (error) {
    console.log(error);
  }
}
async function getName() {
  try {
    const name = await newContractobject.name();
    console.log(name);
  } catch (error) {
    console.log(error);
  }
}
async function getSymbol() {
  try {
    const symbol = await newContractobject.symbol();
    console.log(symbol);
  } catch (error) {
    console.log(error);
  }
}
async function transfer() {
  try {
    const transfer = await newContractobject.transfer(
      "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
      ethers.utils.parseEther("0.00001")
    );
    console.log(transfer);
  } catch (error) {
    console.log(error);
  }
}
//transfer();
//getName();
//getSymbol();
//getDecimal();
