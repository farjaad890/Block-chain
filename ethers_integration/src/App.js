const { ethers } = require("ethers");
function App() {
  async function connectToethers() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const account = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log(signer);
      const balance = await provider.getBalance(
        "0x3B1bf91d18B5De8F75ad4e2E435a7fE8Ec88658B"
      );
      const tx = signer.sendTransaction({
        to: "0x3a44c28D48F18AF424AD7623F37F6aE0013314D8",
        value: ethers.utils.parseEther("0.000001"),
      });
      console.log(balance);
    } catch (error) {}
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
