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
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.articleDetail !== nextProps.articleDetail) {
        this.setState({
            articleDetail: nextProps.articleDetail
        });
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
  render() {
    let { openDrawer } = this.state;
    return (
      <div className="container">
        {openDrawer ? (
          <React.Fragment>
            <Slide />
            <List />
          </React.Fragment>
        ) : null}

        <Detail
          openDrawer={openDrawer}
          articleDetail={this.state.articleDetail}
          saveArticle={this.saveArticle}
          changeInput={this.changeInput}
          changeArticleContent={this.changeArticleContent}
          toggleDrawerStatus={this.toggleDrawerStatus}
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
