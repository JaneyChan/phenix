import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { createArticle, setDetailArticle } from '@/redux/action/article';
import { getArticlesByCatogoryId } from '@/redux/action/article';
import Message from '@/lib/message';
import Icon from '@/lib/icon'
import { parseTime } from '@/service/utils';

class NoteList extends React.PureComponent {
    componentWillReceiveProps(nextProps) {
        let prevCid = this.props.match.params.cid,
            nextCid = nextProps.match.params.cid,
            prevNid = this.props.match.params.nid,
            nextNid = nextProps.match.params.nid;

        if(prevCid != nextCid) {
            this.props.getArticlesByCatogoryId(nextCid);
        }
        if(this.props.articleList != nextProps.articleList && nextProps.articleList.length > 0) {
            let noteId = nextNid ? nextNid: nextProps.articleList[0];
            this.changeRoute(nextCid, nextProps.articleList, noteId);
        }
    }
    changeRoute = (cateId, articleList, noteId) => {
        const articleIds = articleList.map(article => article.id);
        const article = articleList[0];
        const articleId = articleIds.includes(noteId) ? noteId : article && article.id;
        this.props.history.replace(`/category/${cateId}/note/${articleId}`);
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
            Message.error('找不到文章记录');
            return;
        }
        this.props.createArticle(categoryId);
    }
    changeSelectedArticle = (article) => {
        this.props.setDetailArticle(article);
    }
    render() {
        let { articleList, articleDetail, match } = this.props;
        return (
            <div className="side-note-wrap">
                <div className="note-list-title">文章列表
                    <Icon type="plus" className="note-add-btn" onClick={this.createArticle}/>
                </div>
                <div className="note-list-boxs">
                {
                    articleList && articleList.map((article) => {
                        return (
                            <NavLink
                                key={article.id}
                                to={`/category/${match.params.cid}/note/${article.id}`}
                                className="note-item"
                                activeClassName="selected"
                                onClick={() => { this.changeSelectedArticle(article);}}
                                isActive={() => {
                                    return false;
                                }}
                            >
                                <div className={`box${ article.id === articleDetail.id ? ' active': ''}`}>
                                    <div className="item-title">{article.title}</div>
                                    <div className="item-time">{parseTime(article.createTime)}</div>
                                    <div className="item-paragraph">
                                        <Icon type={article.publish ? 'unlock': 'lock'} />
                                        {article.publish ? '公开' : '私密'}
                                    </div>
                                </div>
                            </NavLink>
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
        createArticle: (categoryId) => {
            dispatch(createArticle(categoryId));
        },
        setDetailArticle: (article) => {
            dispatch(setDetailArticle(article));
        },
        getArticlesByCatogoryId: (articleId) => {
            dispatch(getArticlesByCatogoryId(articleId));
        }
    })
)(NoteList));
