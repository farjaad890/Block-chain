import Abi from "./Abi";
const { ethers } = require("ethers");
//Address of the contract DERC20
const address = "0x655F2166b0709cd575202630952D71E2bB0d61Af";
function App() {
  async function connectToethers() {
    try {
      //first getting the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //connecting out contract to our contract with provider we can only user read only function
      const newContractobject = new ethers.Contract(address, Abi, provider);
      //read only function to get the name of the contract
      const name = await newContractobject.name();
      console.log(name);
      //to perform the transaction we need a signer
      const SignerObject = newContractobject.connect(provider.getSigner());
      //transfer funtion to send 0.00001 to an address
      const transfer = await SignerObject.transfer(
        "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
        ethers.utils.parseEther("0.00001")
      );
      //printing the transfer object
      console.log(transfer);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" flex w-full justify-center">
      <button
        onClick={() => {
          connectToethers();
        }}
      >
        connect
      </button>
    </div>
  );
}

export default App;
