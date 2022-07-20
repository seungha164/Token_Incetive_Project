import React, { useEffect, useState } from 'react';
import tokenContract from './contracts/GBUToken.json';
import getWeb3 from "./getWeb3";

const sign = () => {
    const [accounts, setAccounts] = useState("");
    const [web3, setWeb3] = useState({});
    const [contract, setContract] = useState({});
    // 1. web3 인스턴스, accounts, contracts 가져오기
    const getweb = async () => {
        let web3 = await getWeb3();
        console.log(web3);
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);

        // Get the contract instance.
        const networkId = web3.eth.net.getNetworkType()

        //const deployedNetwork = tokenContract.networks[networkId];
        console.log(networkId);
        //console.log(deployedNetwork);
        // useState
        setWeb3(web3);
        setAccounts(accounts);
    }
    // componentDidMount => Web3가져와서 메타마스크 연결
    useEffect(() => {
        getweb()
    }, [])
    return (
        <div>
            <h1>사과 가격 : 10 ETH</h1>
            <p>MY BLANCE : {accounts}</p>
        </div>
    )
}
export default sign;