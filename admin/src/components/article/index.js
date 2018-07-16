import React, { PureComponent } from "react";
import Category from "@/components/article/side/category";
import ArticleList from "@/components/article/side/articleList";
import Offside from "@/components/article/offside";

import { connect } from "react-redux";
import { updateArticle } from "@/redux/action/article";

class Article extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      articleDetail: props.articleDetail
    };
  }
  componentDidMount() {
    // window.onbeforeunload = () => {
    //   // 提示用户是继续浏览页面还是离开当前页面。
    // 	return '你可能有数据没有保存';
    // }
    document.body.addEventListener('keydown', this.toSaveArticle, false);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.articleDetail !== nextProps.articleDetail) {
        this.setState({
            articleDetail: nextProps.articleDetail
        });
    }
  }
  toSaveArticle = (e) => {
    let keyCode = e.keyCode || e.which || e.charCode,
        ctrlKey = e.ctrlKey || e.metaKey;
    if(ctrlKey && keyCode === 83) {
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
  changeInput = e => {
    this.setState({
      articleDetail: {
        ...this.state.articleDetail,
        title: e.target.value
      }
    });
  }
  changeArticleContent = value => {
    this.setState({
      articleDetail: {
        ...this.state.articleDetail,
        content: value
      }
    });
  }
  saveArticle = () => {
    let { articleDetail } = this.state;
    this.props.updateArticle(articleDetail);
  }
  toggleArticlePublish = () => {
    let { articleDetail } = this.state;
    this.props.updateArticle({...articleDetail, publish: articleDetail.publish ? 0: 1});
  }
  render() {
    let { openDrawer, articleDetail } = this.state;
    return (
      <div className="container">
        <div className={`side-container${openDrawer ? '': ' close'}`}>
          <div className="side-panel">
            <Category />
            <ArticleList />
          </div>
        </div>

        {
          articleDetail && articleDetail.id ? (
            <Offside
              openDrawer={openDrawer}
              articleDetail={articleDetail}
              handles={{
                saveArticle: this.saveArticle,
                changeInput: this.changeInput,
                changeArticleContent: this.changeArticleContent,
                toggleDrawerStatus: this.toggleDrawerStatus,
                toggleArticlePublish: this.toggleArticlePublish
              }}
            />
          ): (
            <div className="main-container">
              <div className="empty-article"></div>
            </div>
          )
        }
        
      </div>
    );
  }
}

export default connect(
  state => ({
    articleDetail: state.article.detail
  }),
  dispatch => ({
    updateArticle: article => {
      dispatch(updateArticle(article));
    }
  })
)(Article);
