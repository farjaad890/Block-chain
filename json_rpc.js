const { Network, Alchemy } = require("alchemy-sdk");
const converter = require("hex2dec");
const settings = {
  apiKey: "NkmRnh8V2iHm99YDqMc7a51JpySUdkHD",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

// alchemy.core
//   .getBlockNumber()
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// alchemy.core
//   .getBalance("0x3B1bf91d18B5De8F75ad4e2E435a7fE8Ec88658B")
//   .then(function (data) {
//     console.log(converter.hexToDec(data._hex));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// alchemy.core
//   .getGasPrice()
//   .then(function (data) {
//     console.log(converter.hexToDec(data._hex));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });