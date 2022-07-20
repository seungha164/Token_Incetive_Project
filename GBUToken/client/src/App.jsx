import { json } from "body-parser";
import React, { Component, useState } from "react";
import getWeb3 from "./getWeb3";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'seungha',          //아이디를 저장하고 있을 state
      account: '0x25618b2776dA4A871fA1789df0E73Dce8f555B43',
      usingid: false, //중복된 아이디 true여야 로그인가능 
      usingpw: false, //비밀번호 두개가 일치하는가
    }
    this.onChange = this.onChange.bind(this);
    this.checkID = this.checkID.bind(this);
    this.test = this.test.bind(this);
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      alert(accounts);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  test(e) {
    alert('hi');
    //fetch('http://localhost:4000/test')
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value	// input 태그에 연결돼 있는 친군데
    })			// 입력 시 이름에 맞는 state 값이 초기화 된다
  }
  checkID(e) {
    e.preventDefault();
    console.log(this.state.id);
    const data = {
      id: this.state.id		// 현재 id state값을 data.id에 넣는다
    }
    fetch('http://localhost:4000/checkid', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),	// json화 해버리기
    })
      .then(res => res.json())
      .then(json => {
        if (json.tf === true) {		// json을 받아왔는데 .tf 값이 true면 사용가능
          alert("사용가능한 ID입니다");  //알람!
          this.setState({
            usingid: true
          })
        }
        else {
          alert("다른 ID를 입력해주세요");
        }
      })
  }

  render() {
    //this.test();
    return (
      <div className="login_content">
        <h1 className="signup_text" style={{ fontSize: '17pt' }}>회원 가입</h1>
        <div className="inputboxz">
          <form onSubmit={this.onSubmit}>
            <p>ACCOUNT : {this.state.account}</p>
            <p>ID : <input type="text" name="id" onChange={this.onChange} /></p>
            <button onClick={this.checkID}>중복 확인</button>
          </form>
        </div>
      </div>
    )
  }
} export default App;
