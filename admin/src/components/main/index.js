import React, { Component } from 'react';
import Slide from '../slide';
import Article from '../article';

class Main extends Component {
  render() {
    return (
      <div className="container-wrap">
        <Slide />
        <div className="content-box">
          <Article />
        </div>
      </div>
    );
  }
}

export default Main;


