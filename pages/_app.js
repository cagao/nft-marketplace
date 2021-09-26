import React, { useEffect, useState } from"react";
import Link from "next/link";
import "../styles/globals.css";
import getWeb3 from "./getWeb3";


function App({ Component, pageProps }) {
  const [currentAccount, setCurrentAccount] = useState('');
  const[web3,setWeb3] = useState();

  const getweb3data = async() => {
    try {
      const web3 = await getWeb3();
      setWeb3(web3);
      //get the address from metamask
      const accounts = await web3.eth.getAccounts();
      console.log("cameo current account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      
      //get the networkid 
      const networkid = await web3.eth.net.getId();
      console.log(networkid);
    }
    catch(error){
      alert("consult console");
      console.log(error);
    }
  }

  useEffect(()=>{
    getweb3data();
  },[currentAccount]);

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Macroverse Marketplace</p>
        <p className="text-4x">current account: {currentAccount}</p>
        <div className="flex mt-4">
          <Link href={
              {
                pathname: '/',
                query: {currentAccount: currentAccount}
              }
          }>
            <a className="mr-4 text-pink-500">Home</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-pink-500">Sell Digital Asset</a>
          </Link>
          <Link href= {
              {
                pathname: '/my-assets',
                query: {currentAccount: currentAccount}
              }
          }>
            <a className="mr-6 text-pink-500">My Digital Assets</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">Creator Dashboard</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
