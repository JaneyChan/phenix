import React from 'react';
import fetch from '@/utils/fetch';
import { Icon } from '@/components/lib';

class Recycle extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      recycleList: [],
      currentIndex: 0
    };
  }
  componentDidMount () {
    fetch.get('/api/article/recycle').then((res) => {
      if (res.success) {
        this.setState({
          recycleList: res.data
        });
      }
    });
  }
  render () {
    let { recycleList, currentIndex } = this.state;
    return (
      <div className="container">
        <div className="recycle-side">
          <div className="recycle-side-header">
            <Icon type="delete" className="recycle-icon__delete" />回收站（2）
          </div>
          <div className="recycle-slide-list">
            {
              recycleList && recycleList.map((item, index) => {
                return (
                  <div className={`recycle-slide-item${currentIndex === index ? ' selected' : ''}`}>
                    <Icon type="file-text" className="recycle-icon__file" />
                    {item.title}
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="recycle-content"></div>
      </div>
    );
  }
}

export default Recycle;
