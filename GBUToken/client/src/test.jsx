import React, { useEffect, useState } from 'react';
import { t } from './contracts/index';

const test = () => {
    const [accounts, setAccounts] = useState("");
    const [web3, setWeb3] = useState({});
    const getweb = async () => {
        console.log(t);
        console.log(t);
        setWeb3(t);

    }
    useEffect(() => {
        getweb()
    }, [])
    return (
        <div>d</div>
    )
}
export default test;