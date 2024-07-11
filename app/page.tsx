'use client'

import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {

  const [signer, setSigner] = useState<any>();

  const connectWallet = async () => {

    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults")
      provider = ethers.getDefaultProvider()
    } else {
      provider = new ethers.BrowserProvider(window.ethereum)
      let signer = await provider.getSigner();
      setSigner(signer)
      console.log(signer)
    }
  }

  const sign = async () => {

    //domain,要和合约中的定义完全一致
    const domain = {
      name: "EIP712Permit",
      version: "1",
      chainId: "11155111",
      verifyingContract: "0xb934E4Ae6b8B0db8F158b768c4E84AFa62EB9eAa",
    };

    //格式化数据的类型，要和合约中的定义完全一致
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    //格式化数据具体内容
    const message = {
      owner: signer.address,
      spender: "0xa9528027dFEa6f57442C6Cc9C8313ad3091D60d8",
      amount: 100,
      deadline: 100000000000
    };
    // 获得signer后调用signTypedData方法进行eip712签名
    const signature = await signer.signTypedData(domain, types, message);
    console.log("Signature:", signature);
  }

  return (
    <main>
      <button onClick={connectWallet}>connect</button>
      <br></br>
      <button onClick={sign}>sign</button>
    </main>
  );
}
