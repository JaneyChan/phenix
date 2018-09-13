import React from 'react';
import fetch from '@/utils/fetch';
import { Icon } from '@/components/lib';

class Recycle extends React.PureComponent {
  componentDidMount () {
    fetch.get('/api/article/recycle').then((res) => {
      console.log('res: ' + JSON.stringify(res));
    });
  }
  render () {
    return (
      <div className="container">
        <div className="recycle-side">
          <div className="recycle-side_header">
            <Icon type="delete" className="recycle-icon__delete" />回收站（2）
          </div>
        </div>
        <div className="recycle-content"></div>
      </div>
    );
  }
}

export default Recycle;
