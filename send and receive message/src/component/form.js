import React from "react";
import { ethers } from "ethers";
import { useState } from "react";
var converter = require("hex2dec");

const LoginForm = (props) => {
  const { sender, provider } = props;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verifymessage, setVerifyMessage] = useState("");
  const [signForm, setSignform] = useState(true);
  const [verifyForm, setVerifyform] = useState(false);
  //=================================================================
  const [signed, setSigned] = useState();
  const [verified, setVerified] = useState({});

  //transfer function is called when the transfers button is clucked on the screen
  async function signMessage(e) {
    e.preventDefault();
    const signer = provider.getSigner();
    try {
      const signedMessage = await signer.signMessage(message);
      setSigned(
        JSON.stringify(
          {
            address: sender,
            message: message,
            signature: signedMessage,
          },
          null,
          2
        )
      );
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }
  async function verifytheMessage(e) {
    e.preventDefault();
    try {
      let verified = JSON.parse(verifymessage);
      const result = ethers.utils.verifyMessage(
        verified.message,
        verified.signature
      );
      if (result.toLowerCase() === verified.address) {
        setVerified({ send: verified.address, msg: verified.message });
      } else {
        setVerified(null);
        setError("Message not verified");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-center">Message form</h1>
      {signForm ? (
        <form
          className="bg-cyan-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px]"
          onSubmit={signMessage}
        >
          <div className="mb-6">
            <div className="flex justify-between">
              <button
                className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-5 mr-2"
                onClick={() => {
                  setSignform(true);
                  setVerifyform(false);
                  setMessage();
                }}
              >
                sign
              </button>
              <button
                className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-5 ml-2"
                onClick={() => {
                  setVerifyform(true);
                  setSignform(false);
                  setSigned(null);
                  setError(null);
                  setMessage();
                }}
              >
                verify
              </button>
            </div>
            <textarea
              rows={10}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="value"
              type="text"
              placeholder="Message"
              required
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              onSubmit={() => {
                signMessage();
              }}
            >
              Sign Message
            </button>
          </div>
        </form>
      ) : (
        <form
          className="bg-cyan-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px]"
          onSubmit={verifytheMessage}
        >
          <div className="mb-6">
            <div className="flex justify-between">
              <button
                className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-5 mr-2"
                onClick={() => {
                  setSignform(true);
                  setVerifyform(false);
                  setMessage();
                  setVerifyMessage("");
                }}
              >
                sign
              </button>
              <button
                className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-5 ml-2"
                onClick={() => {
                  setVerifyform(true);
                  setSignform(false);
                  setSigned(null);
                  setError(null);
                  setMessage();
                }}
              >
                verify
              </button>
            </div>
            <textarea
              rows={10}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="value"
              type="text"
              placeholder="{
                address: 
                message:
                signature:
              }"
              required
              value={verifymessage}
              onChange={(event) => {
                setVerifyMessage(event.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              onSubmit={() => {
                verifytheMessage();
              }}
            >
              verify Message
            </button>
          </div>
        </form>
      )}

      {!error ? (
        <div>
          {!signed ? (
            <div>
              {verified ? (
                <div>
                  <p>Message shown if verified: </p>
                  <p>address: {verified.send}</p>
                  <p>message : {verified.msg}</p>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          ) : (
            <div>
              <p>{signed}</p>
            </div>
          )}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default LoginForm;

// {
//   "address": "0x3B1bf91d18B5De8F75ad4e2E435a7fE8Ec88658B",
//   "msg": "adfasfasfa",
//   "sig": "0x54dc1d73ef1e9925d613d4b6d753b267c0cae0d41a31e5b94a4e3e20a22152f70e0220a69417c9c9dfa1d291a2eef8f57ee093441d0c40dfc8704b4e9a71c2ff1c",
//   "version": "2"
// }
