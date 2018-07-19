import React from 'react';

import MarkdownPreview from '../markdown/preview';
import MarkdownEditor from '../markdown/editor';
import Toolbar from './toolbar';
import { Dialog } from '@/components/lib';

class Offside extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      fullScreen: false,
      inEdit: true
    };
  }
  toggleFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
      inEdit: true
    });
  }
  toggleEditStatus = () => {
    this.setState({
      inEdit: !this.state.inEdit
    });
  }
  showConfrimDeleteDialog = () => {
    Dialog.confirm({
      title: '你确定要删除该文章?',
      okType: 'danger',
      onOk: () => {},
      onCancel: () => {}
    });
  }
  render () {
    let { articleDetail, handles, openDrawer } = this.props, { fullScreen, inEdit } = this.state;

    const toolbarPanel = (
      <Toolbar
        isFullscreen={fullScreen}
        inEdit={inEdit}
        openDrawer={openDrawer}
        publish={articleDetail.publish}
        handles={{
          toggleDrawerStatus: handles.toggleDrawerStatus,
          toggleFullScreen: this.toggleFullScreen,
          toggleEditStatus: this.toggleEditStatus,
          toggleArticlePublish: handles.toggleArticlePublish,
          saveArticle: handles.saveArticle,
          deleteArticle: this.showConfrimDeleteDialog
        }}
      />
    );
    return (
      <div className="main-container">
        {
          fullScreen ? (
            <div className="full-screen">
              {toolbarPanel}
              <div className={`screen-wrap${fullScreen && !inEdit ? ' screen-preview' : ''}`}>
                {
                  inEdit ? (
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
                      <MarkdownEditor
                        className="screen-body"
                        value={articleDetail.content || ''}
                        onChange={(e) => handles.changeArticleContent(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="screen-content">
                      <div className="offside-title">
                        <div className="preview-title">{articleDetail.title || ''}</div>
                      </div>
                      <MarkdownPreview
                        className="screen-body"
                        value={articleDetail.content || ''}
                      />
                    </div>
                  )
                }
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
                {toolbarPanel}
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
