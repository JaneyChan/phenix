import React, { Component } from 'react';
import Detail from './detail';
import List from './list';

class Article extends Component {
  render() {
    return (
      <div className="article-wrap">
          <List />
          <Detail />
      </div>
    );
  }
}

export default Article;


