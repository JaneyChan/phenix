import React, { PureComponent } from 'react';
import Category from '@/components/main/side/category';
import ArticleList from '@/components/main/side/article';
import Offside from '@/components/main/offside';
import { Message } from '@/components/lib';
import ExitEditorDialog from '@/components/common/exitEditorDialog';

import { connect } from 'react-redux';
import { setArticleDraft, setDetailArticle, setArticleList } from '@/redux/action/article';
import fetch from '@/utils/fetch';

class Main extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      openDrawer: true
    };
  }
  componentDidMount () {
    let { articleDetail } = this.props;
    if (articleDetail && articleDetail.id) {
      this.props.saveDraft(articleDetail);
    }
    // window.onbeforeunload = () => {
    //   // 提示用户是继续浏览页面还是离开当前页面。
    //   return '你可能有数据没有保存';
    // };
    document.body.addEventListener('keydown', this.toSaveArticle, false);
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.articleDetail !== nextProps.articleDetail) {
      this.props.saveDraft(nextProps.articleDetail);
    }
  }
  toSaveArticle = (e) => {
    let keyCode = e.keyCode || e.which || e.charCode,
      ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && keyCode === 83) {
      e.preventDefault();
      // control+s 或 command+s 保存文章
      this.saveArticle();
    }
  }
  toggleDrawerStatus = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    });
  }
  changeInput = (key, value) => {
    let article = { ...this.props.articleDraft };
    article[key] = value;
    this.props.saveDraft(article);
  }
  changeArticleContent = value => {
    let article = { ...this.props.articleDraft };
    article.content = value;
    this.props.saveDraft(article);
  }
  saveArticle = () => {
    let { articleDraft } = this.props;
    this.updateArticle(articleDraft).then(() => {
      Message.success('保存文章成功');
    });
  }
  toggleArticlePublish = () => {
    let {articleDraft, articleDetail} = this.props,
      data = {
        id: articleDraft.id,
        publish: articleDraft.publish ? 0 : 1
      };
    this.updateArticle({...articleDetail, ...data}).then(() => {
      Message.success(data.publish ? '已将文章公开' : '已将文章转为私密');
      this.props.saveDraft({ ...articleDraft, ...data });
    });
  }
  updateArticle = (article) => {
    return new Promise((resolve, reject) => {
      fetch.post('/api/article/update', article)
        .then((res) => {
          if (res.success) {
            let list = [...this.props.articleList];
            for (let i = 0; i < list.length; i++) {
              if (list[i].id === article.id) {
                list[i] = article;
              }
            }
            this.props.setArticleList(list);
            this.props.setDetailArticle(article);
            resolve();
          } else {
            reject(res.message);
          }
        }).catch((err) => {
          reject(err);
        });
    });
  }
  render () {
    let { isEnd, articleDraft, exitDialog } = this.props, { openDrawer } = this.state;
    return (
      <div className="container">
        <div className={`side-container${openDrawer ? '' : ' close'}`}>
          <div className="side-panel">
            <Category />
            <ArticleList />
          </div>
        </div>

        {
          articleDraft && articleDraft.id ? (
            <Offside
              openDrawer={openDrawer}
              articleDetail={articleDraft}
              handles={{
                saveArticle: this.saveArticle,
                changeInput: this.changeInput,
                changeArticleContent: this.changeArticleContent,
                toggleDrawerStatus: this.toggleDrawerStatus,
                toggleArticlePublish: this.toggleArticlePublish
              }}
            />
          ) : null
        }
        {
          isEnd && !articleDraft.id ? (
            <div className="main-container">
              <div className="empty-article"></div>
            </div>
          ) : null
        }

        <ExitEditorDialog visible={exitDialog.open} />
      </div>
    );
  }
}

export default connect(
  state => ({
    isEnd: state.article.list.isEnd,
    articleDraft: state.article.draft,
    articleDetail: state.article.detail,
    articleList: state.article.list.data,
    exitDialog: state.appSetting.exitDialog
  }),
  dispatch => ({
    saveDraft: article => {
      dispatch(setArticleDraft(article));
    },
    setDetailArticle: article => {
      dispatch(setDetailArticle(article));
    },
    setArticleList: list => {
      dispatch(setArticleList(list));
    }
  })
)(Main);
