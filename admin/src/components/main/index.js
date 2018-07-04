import React, { Component } from 'react';
import Slide from '../slide';
import Article from '../article';

class Main extends Component {
  render() {
    return (
      <div className="container-wrap">
        <Slide />
        <Article />
      </div>
    );
  }
}

export default Main;


