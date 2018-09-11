import React from 'react';
import { connect } from 'react-redux';

import MarkdownPreview from '../markdown/preview';
import MarkdownEditor from '../markdown/editor';
import Toolbar from './toolbar';
import { Dialog } from '@/components/lib';
import fetch from '@/utils/fetch';

import { setArticleList } from '@/redux/action/article';

class Offside extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      fullScreen: false,
      inEdit: false
    };
  }
  toggleFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
      inEdit: false
    });
  }
  toggleEditStatus = () => {
    this.setState({
      inEdit: !this.state.inEdit
    });
  }
  showConfrimDeleteDialog = (category) => {
    Dialog.confirm({
      title: '你确定要删除该文章?',
      content: '删除后可在回车站找回。',
      okType: 'danger',
      onOk: () => {
        this.changeArticleStatus(category);
      },
      onCancel: () => {}
    });
  }
  changeArticleStatus = (category) => {
    fetch.post('/api/article/status', { id: category.id })
      .then((res) => {
        if (res.success) {
          let list = [...this.props.articleList];
          list && list.map((item, index) => {
            if (item.id.toString() === category.id.toString()) {
              list.splice(index, 1);
            }
          });
          this.props.setArticleList(list);
        }
      });
  }
  render () {
    let { articleDetail, handles, openDrawer } = this.props, { fullScreen, inEdit } = this.state;

    const toolbarPanel = (
      <Toolbar
        isFullscreen={fullScreen}
        inEdit={inEdit}
        openDrawer={openDrawer}
        article={articleDetail}
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

export default connect(
  (state) => ({
    articleList: state.article.list.data
  }),
  (dispatch) => ({
    setArticleList: (list) => {
      dispatch(setArticleList(list));
    }
  })
)(Offside);
