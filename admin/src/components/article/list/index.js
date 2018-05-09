import React from 'react';
import { connect } from 'react-redux';
import { getArticleList, createArticle, setDetailArticle } from '../../../redux/action/article';
import { parseTime } from '../../../service/utils';

class List extends React.PureComponent {
    componentDidMount() {
        this.props.getArticleList();
    }
    createArticle = () => {
        this.props.createArticle();
    }
    changeSelectedArticle = (article) => {
        this.props.setDetailArticle(article);
    }
    render() {
        let { articleList, articleDetail } = this.props;
        return (
            <div className="article-list-wrap">
                <div className="article-list-title">文章列表
                    <span className="article-add-btn" onClick={this.createArticle}></span>
                </div>
                {
                    articleList && articleList.map((article) => {
                        return (
                            <div className="article-item" key={article.id} onClick={() => { this.changeSelectedArticle(article);}}>
                                <div className={`box${ article.id === articleDetail.id ? ' active': ''}`}>
                                    <div className="item-title">{article.title}</div>
                                    <div className="item-time">{parseTime(article.createTime)}</div>
                                    <div className="item-paragraph">公开:{article.publish ? '是' : '否'}</div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        );
    }
}

export default connect(
    (state) => ({
        articleList: state.article.list,
        articleDetail: state.article.detail
    }),
    (dispatch) => ({
        getArticleList: () => {
            dispatch(getArticleList());
        },
        createArticle:  () => {
            dispatch(createArticle());
        },
        setDetailArticle: (article) => {
            dispatch(setDetailArticle(article));
        }
    })
)(List);
