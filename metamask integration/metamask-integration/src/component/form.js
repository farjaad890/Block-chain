import React from "react";
import { useState } from "react";
var converter = require("hex2dec");

const LoginForm = (props) => {
  const { sender, provider } = props;
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState({});

  async function getTransactionreceipt(hash) {
    try {
      const transactionObject = await provider.request({
        method: "eth_getTransactionByHash",
        params: [`${hash}`],
      });
      setTransaction({
        from: transactionObject.from,
        to: transactionObject.to,
        gasUsed: converter.hexToDec(transactionObject.gas),
        hash: hash,
      });
    } catch (error) {
      setError(error);
    }
  }
  function convertTowei(value) {
    //console.log(value);
    let wei = 1000000000000000000 * value;
    return wei;
  }
  async function tranfer() {
    try {
      let calculatedWei = convertTowei(parseFloat(amount));
      //console.log(calculatedWei);
      //console.log(calculatedWei.toString(16));
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
      getTransactionreceipt(transactionHash);
      setAmount("");
      setReceiver("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <h1 className="text-center">Transfer form</h1>
      <form className="bg-cyan-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="address"
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
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={() => {
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
