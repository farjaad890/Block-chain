import React from "react";
import { useState } from "react";
var converter = require("hex2dec");

const LoginForm = (props) => {
  const { sender, provider, checkNetwork } = props;
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState({});

  provider.on("chainChanged", function (chain) {
    //console.log(chain);
    checkNetwork();
  });


  //this is a async function to get the information of the transaction through transaction hash
  async function getTransactionreceipt(hash) {
    try {
      const transactionObject = await provider.request({
        method: "eth_getTransactionByHash",
        params: [`${hash}`],
      });
      setError("");
      return transactionObject;
    } catch (error) {
      setError(error);
    }
  }
  //function to conver the amount gives to wei smallest unit
  function convertTowei(value) {
    //console.log(value);
    let wei = 1000000000000000000 * value;
    return wei;
  }

  //transfer function is called when the transfers button is clucked on the screen
  async function tranfer(e) {
    e.preventDefault();
    try {
      //first the amount is converted from text to float
      let calculatedWei = convertTowei(parseFloat(amount));
      //eth_sendTransaction returns the transaction hash
      const transactionHash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: sender,
            to: receiver,
            value: calculatedWei.toString(16),
          },
        ],
      });
      //hash is send to the getReceipt function to get transaction information
      const transactionObject = await getTransactionreceipt(transactionHash);
      //object is set to display on the screen
      setTransaction({
        from: transactionObject.from,
        to: transactionObject.to,
        gasUsed: converter.hexToDec(transactionObject.gas),
        hash: transactionObject.hash,
      });
      setAmount("");
      setReceiver("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <h1 className="text-center">Transfer form</h1>
      <form
        className="bg-cyan-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={tranfer}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="address"
            required
            value={receiver}
            onChange={(event) => {
              setReceiver(event.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ether
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="value"
            type="text"
            placeholder="Amount"
            value={amount}
            required
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            onSubmit={() => {
              tranfer();
            }}
          >
            Transfer
          </button>
        </div>
      </form>
      {!error ? (
        <div>
          {transaction ? (
            <div>
              <p>From:{transaction.from}</p>
              <p>to:{transaction.to}</p>
              <p>gasUsed:{transaction.gasUsed}</p>
              <p>hash:{transaction.hash}</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default LoginForm;
