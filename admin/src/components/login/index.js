import React, { Component } from 'react';
import Button from '../common/button'
import axios from 'axios';
import { withRouter } from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'JaneChan',
      password: '123456'
    }
  }
  login = () => {
    let {username, password} = this.state;
    axios.post('/api/user/signIn', { username: username, password: password })
        .then((res) => {
          if(res.data.success) {
            this.props.history.replace('/');
          }
        });
  }
  render() {
    let {username, password} = this.state;
    return (
      <div className="login-wrap">
        <div className="box">
          Login
          <div>username:
            <input
              type="text"
              defaultValue={username}
              placeholder="username"
              className="input-field"
            /></div>
          <div>password:
              <input
                type="password"
                defaultValue={password}
                placeholder="password"
                className="input-field"
              />
          </div>
          <Button onClick={this.login}>登录</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);


