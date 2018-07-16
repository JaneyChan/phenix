import React from 'react';

import MarkdownPreview from '../markdown/preview';
import MarkdownEditor from '../markdown/editor';
import Toolbar from './toolbar';

class Offside extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      fullScreen: false
    };
  }
  toggleFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  }
  render () {
    let { articleDetail, handles, openDrawer } = this.props, { fullScreen } = this.state;
    return (
      <div className="main-container">
        {
          fullScreen ? (
            <div className="full-screen">
              <Toolbar
                isFullscreen={fullScreen}
                openDrawer={openDrawer}
                publish={articleDetail.publish}
                handles={{
                  toggleDrawerStatus: handles.toggleDrawerStatus,
                  toggleFullScreen: this.toggleFullScreen,
                  toggleArticlePublish: handles.toggleArticlePublish,
                  saveArticle: handles.saveArticle
                }}
              />
              <div className="screen-wrap">
                <div className="screen-content">
                  <div className="offside-title">
                    <input
                      type="text"
                      placeholder="文章名称"
                      value={articleDetail.title || ''}
                      autoFocus
                      onChange={handles.changeInput}
                    />
                  </div>
                  <MarkdownPreview
                    className="screen-body"
                    value={articleDetail.content || ''}
                  />
                  <MarkdownEditor
                    className="screen-body"
                    value={articleDetail.content || ''}
                    onChange={(e) => handles.changeArticleContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className="offside-header">
                <div className="offside-title">
                  <input
                    type="text"
                    placeholder="文章名称"
                    value={articleDetail.title || ''}
                    autoFocus
                    onChange={handles.changeInput}
                  />
                </div>

                <Toolbar
                  openDrawer={openDrawer}
                  publish={articleDetail.publish}
                  isFullscreen={fullScreen}
                  handles={{
                    toggleDrawerStatus: handles.toggleDrawerStatus,
                    toggleFullScreen: this.toggleFullScreen,
                    toggleArticlePublish: handles.toggleArticlePublish,
                    saveArticle: handles.saveArticle
                  }}
                />
              </div>
              <div className="offside-content">
                <MarkdownEditor
                  value={articleDetail.content || ''}
                  onChange={(e) => handles.changeArticleContent(e.target.value)}
                />
                <MarkdownPreview
                  className="content-preview"
                  value={articleDetail.content || ''}
                />
              </div>
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

export default Offside;
