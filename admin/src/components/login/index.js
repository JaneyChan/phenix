import React, { Component } from 'react';
import Button from '@/lib/button'
import fetch from '@/utils/fetch';
import { withRouter } from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  login = () => {
    let {username, password} = this.state;
    fetch.post('/api/user/signIn', { username: username, password: password })
        .then((res) => {
          if(res.success) {
            window.localStorage.setItem('me-token', res.data.token);
            this.props.history.replace('/');
          }
        });
  }
  changeInputData = (key, e) => {
    this.setState({
      [key]: e.target.value
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
              value={username}
              placeholder="username"
              className="input-field"
              onChange={(e) => { this.changeInputData('username', e); }}
            /></div>
          <div>password:
              <input
                type="password"
                value={password}
                placeholder="password"
                className="input-field"
                onChange={(e) => { this.changeInputData('password', e); }}
              />
          </div>
          <Button onClick={this.login}>登录</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);


