import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@/components/lib';

class Toolbar extends React.PureComponent {
  render () {
    let { openDrawer, article, isFullscreen, inEdit, handles } = this.props;
    return (
      <div className="main-toolbar">
        {
          !isFullscreen ? (
            <Icon type={openDrawer ? 'menu-fold' : 'menu-unfold'} className="bar-item" onClick={handles.toggleDrawerStatus} />
          ) : null
        }
        <Icon type={isFullscreen ? 'shrink' : 'arrows-alt'} className="bar-item" onClick={handles.toggleFullScreen}/>
        {
          isFullscreen ? (
            <Icon type={inEdit ? 'desktop' : 'edit'} className="bar-item" onClick={handles.toggleEditStatus} />
          ) : null
        }

        <span className="bar-item publish-btn fr" onClick={handles.toggleArticlePublish}>
          <Icon type={article.publish ? 'lock' : 'unlock'} />
          { article.publish ? '转为私密' : '公开文章'}
        </span>
        <Icon type="delete" className="bar-item fr" onClick={() => { handles.deleteArticle(article); }}/>
        <Icon type="save" className="bar-item fr" onClick={handles.saveArticle}/>
      </div>
    );
  }
}

Toolbar.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  inEdit: PropTypes.bool.isRequired
};

Toolbar.defaultProps = {
  isFullscreen: false,
  inEdit: true
};

export default Toolbar;
