import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound-wrap">
    <div className="nf-box">
      <div className="nf-bg"></div>
      <div className="ng-footer">
        <p>Oops! Page Not Found!</p>
        <Link to="/">去首页看看</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
