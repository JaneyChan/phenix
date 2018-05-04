import React, { Component } from 'react';
import Article from '../article';

class Main extends Component {
  render() {
    return (
      <div className="container-wrap">
        <div className="slide-box">
          <div className="logo"></div>
          <div className="item-icon article"></div>
          <div className="item-icon category"></div>
          <div className="item-icon tag"></div>
          <div className="item-icon user"></div>
          <div className="item-icon login-out"></div>
        </div>
        <div className="content-box">
          <Article />
        </div>
      </div>
    );
  }
}

export default Main;


