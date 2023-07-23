import logo from "./assets/MetaMask_Fox.svg.png";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";
import Form from "./component/form";
let provider;
let accounts;
let chainId;
function App() {
  const [address, setAddress] = useState();
  const [error, setError] = useState();
  const [netWork, setNetwork] = useState();
  async function checkNetwork() {
    chainId = await provider.request({ method: "eth_chainId" });
    if (chainId === "0x5") {
      setNetwork(true);
    }
  }

  async function connectToMetamask() {
    try {
      provider = await detectEthereumProvider();
      accounts = await provider.request({ method: "eth_requestAccounts" });
      //console.log(chainId);
      //console.log(accounts);
      setAddress(accounts[0]);
      setError(null);
      checkNetwork();
    } catch (error) {
      //return <p>{error.message}</p>;
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
          <div>
            {netWork ? (
              <Form sender={address} provider={provider}></Form>
            ) : (
              <div>
                <p>Your are not connected to goreli network</p>
                <button
                  className="w-full bg-green-500 mt-2 mb-2 h-10"
                  onClick={() => {
                    checkNetwork();
                  }}
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default App;
