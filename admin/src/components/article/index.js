import React, { PureComponent } from "react";
import Slide from "@/components/article/slide";
import Detail from "@/components/article/detail";
import List from "@/components/article/list";

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
    console.log('props.match :  ' + JSON.stringify(this.props.match));
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
    this.props.updateArticle({...articleDetail, publish: !articleDetail.publish});
  }
  render() {
    let { match } = this.props, { openDrawer } = this.state;
    return (
      <div className="container">
        {openDrawer ? (
          <React.Fragment>
            <Slide
              categoryId={match.params && match.params.cid || ''}
            />
            <List />
          </React.Fragment>
        ) : null}

        <Detail
          openDrawer={openDrawer}
          articleDetail={this.state.articleDetail}
          handles={{
            saveArticle: this.saveArticle,
            changeInput: this.changeInput,
            changeArticleContent: this.changeArticleContent,
            toggleDrawerStatus: this.toggleDrawerStatus,
            toggleArticlePublish: this.toggleArticlePublish
          }}
        />
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
