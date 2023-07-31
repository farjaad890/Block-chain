import logo from "./assets/MetaMask_Fox.svg.png";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";
import Form from "./component/form";

// global variables
let provider;
let accounts;
let chainId;
function App() {
  const [address, setAddress] = useState();
  const [error, setError] = useState();

  //function to check if we are on the goreli network or not

  //function to connect to meta mask
  async function connectToMetamask() {
    try {
      //to check if metamask is installed or not
      provider = new ethers.providers.Web3Provider(window.ethereum);
      //get user active account
      accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-100">
      <div>
        <img src={logo} className="w-52 h-52  mx-auto" alt=""></img>
        {!address ? (
          <button
            type="button"
            className="w-full mt-2 mb-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            //className="w-full bg-green-500 mt-2 mb-2 h-10"
            onClick={() => {
              connectToMetamask();
            }}
          >
            Connect
          </button>
        ) : (
          <div className="bg-cyan-200 mt-2 mb-2 ml-2 mr-2 h-6">
            <p>{address}</p>
          </div>
        )}
        {!error ? <p></p> : <p>{error}</p>}
        {address ? (
          <Form provider={provider} sender={address}></Form>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default App;
