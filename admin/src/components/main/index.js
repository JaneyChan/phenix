import React, { Component } from 'react';
import Article from '../article';

class Main extends Component {
  render() {
    return (
      <div className="container-wrap">
        <div className="slide-box">
          <div className="slide-item_expend">
            <span className="icon_expend"></span>
          </div>
          <div className="slide-item all">All Notes</div>
          <div className="slide-item trash">Trash</div>
          <div className="slide-cate-wrap">
            <div className="cate-title">Category<span className="add"></span></div>
            <div className="cate-list">
              <div className="cate-item">ddd</div>
              <div className="cate-item">ddd</div>
              <div className="cate-item">ddd</div>
              <div className="cate-item">ddd</div>
              <div className="cate-item">ddd</div>
            </div>
          </div>
          <div className="login-out-btn"></div>
        </div>
        <div className="content-box">
          <Article />
        </div>
      </div>
    );
  }
}

export default Main;


