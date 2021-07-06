import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Web3 from 'web3';
import { ethers } from "ethers";
import { Contract } from 'ethers';
import Async from 'react-async';
import { batch, contract } from '@pooltogether/etherplex'

import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import cabi from './contract/erc20.json';

const select = [
  {
    value : "0x75107940Cf1121232C0559c747A986DEfbc69DA9",
    label : "SXP"
  },
  {
    value : "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
    label : "BUSD"
  }
]

function App() {
  const [account, SetAccount] = useState('');
  const [balance, SetBalance] = useState(0);
  const [selectedCoin, SetSelectedCoin] = useState(select[0].value);

  const ethEnabled = async () => {
    if (window.ethereum) {
      // Web 3
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      getBlance();
      SetAccount(accounts[0])
      return true;
    } else {
      ethDisabled();
      return false;
    }
  }

  const ethDisabled = async () => {
    SetAccount('');
    SetBalance(0);
  }

  const getBlance = async (address = selectedCoin) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const coin = new Contract(address, cabi, provider);
    const balance = await coin.balanceOf(signer.getAddress());
    SetBalance(parseFloat(ethers.utils.formatEther(balance)).toPrecision(4));
  }

  const handleCoinChange = async (e) => {
    SetSelectedCoin(e.target.value)
    getBlance(e.target.value)
  }

  const ShowBalance = () => {
    if (account) {
      return (
        <>
          <h1>{balance}</h1>
          <Row className="justify-content-center">
            <Col lg="3">
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control as="select" custom value={selectedCoin} onChange={handleCoinChange}>
                    {
                      select.map((item, index) =>
                        <option key={index} value={item.value} label={item.label}>{item.label}</option>
                      )
                    }
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Button variant="success">Address : {account}</Button>
        </>
      ) 
    } else {
      return <Button variant="success">Please connect to the Wallet.</Button>
    }
    
  }

  return (
    <Layout account={account} SetAccount={SetAccount} ethEnabled={ethEnabled} ethDisabled={ethDisabled}>
      <ShowBalance></ShowBalance>
    </Layout>
  );
}

export default App;
