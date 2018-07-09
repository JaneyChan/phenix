import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { getArticlesByCatogoryId, createArticle, setDetailArticle } from '@/redux/action/article';
import Message from '@/lib/message';
import Icon from '@/lib/icon'
import { parseTime } from '@/service/utils';

class List extends React.PureComponent {
    componentWillReceiveProps(nextProps) {
        let { match } = nextProps, categoryId = match.params.cid;
        if(this.props.match.params.cid !== nextProps.match.params.cid || this.props.categoryList !== nextProps.categoryList) {
    
            if(nextProps.match.params.cid && nextProps.categoryList) {
                this.props.getArticlesByCatogoryId(nextProps.match.params.cid);
            } else {
                Message.error('找不到记录');
            }
        }
    }
    createArticle = () => {
        let { categoryList, match } = this.props,
            category = {},
            categoryId = match.params.cid;
        categoryId && categoryList && categoryList.map((item) => {
            if(item.id == match.params.cid) {
                category = item;
            }
        })

        if(!category.id) {
            Message.error('找不到记录');
            return;
        }
        this.props.createArticle(categoryId);
    }
    changeSelectedArticle = (article) => {
        this.props.setDetailArticle(article);
    }
    render() {
        let { articleList, articleDetail } = this.props;
        return (
            <div className="article-list-wrap">
                <div className="article-list-title">文章列表
                    <Icon type="plus" className="article-add-btn" onClick={this.createArticle}/>
                </div>
                <div className="article-list-boxs">
                {
                    articleList && articleList.map((article) => {
                        return (
                            <div className="article-item" key={article.id} onClick={() => { this.changeSelectedArticle(article);}}>
                                <div className={`box${ article.id === articleDetail.id ? ' active': ''}`}>
                                    <div className="item-title">{article.title}</div>
                                    <div className="item-time">{parseTime(article.createTime)}</div>
                                    <div className="item-paragraph">
                                        <Icon type={article.publish ? 'unlock': 'lock'} />
                                        {article.publish ? '公开' : '私密'}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        categoryList: state.category.list,
        articleList: state.article.list,
        articleDetail: state.article.detail
    }),
    (dispatch) => ({
        getArticlesByCatogoryId: (articleId) => {
            dispatch(getArticlesByCatogoryId(articleId));
        },
        createArticle: (categoryId) => {
            dispatch(createArticle(categoryId));
        },
        setDetailArticle: (article) => {
            dispatch(setDetailArticle(article));
        }
    })
)(List));
