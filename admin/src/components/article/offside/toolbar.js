import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@/lib/icon';

class Toolbar extends React.PureComponent {
  render () {
    let { openDrawer, publish, isFullscreen, handles } = this.props;
    return (
      <div className="main-toolbar">
        {
          !isFullscreen ? (
            <Icon type={openDrawer ? 'menu-fold' : 'menu-unfold'} className="bar-item" onClick={handles.toggleDrawerStatus} />
          ) : null
        }
        <Icon type={isFullscreen ? 'shrink' : 'arrows-alt'} className="bar-item" onClick={handles.toggleFullScreen}/>
        <span className="bar-item publish-btn fr" onClick={handles.toggleArticlePublish}>
          <Icon type={publish ? 'lock' : 'unlock'} />
          { publish ? '转为私密' : '公开文章'}
        </span>
        <Icon type="delete" className="bar-item fr" onClick={handles.saveArticle}/>
        <Icon type="save" className="bar-item fr" onClick={handles.saveArticle}/>
      </div>
    );
  }
}

Toolbar.propTypes = {
  isFullscreen: PropTypes.bool.isRequired
};

Toolbar.defaultProps = {
  status: 'normal'
};

export default Toolbar;
