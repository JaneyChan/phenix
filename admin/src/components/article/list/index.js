import React from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../../../redux/action/article';
import { parseTime } from '../../../service/utils';

class List extends React.PureComponent {
    componentDidMount() {
        this.props.fetchArticles();
    }
    render() {
        let { articleList } = this.props;
        return (
            <div className="article-list-wrap">
                <div className="article-list-title">文章列表
                    <span className="article-add-btn"></span>
                </div>
                {
                    articleList && articleList.map((article) => {
                        return (
                            <div className="article-item" key={article.id}>
                                <div className="box">
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
        articleList: state.article.list
    }),
    (dispatch) => ({
        fetchArticles: (type, payload, succ, error) => {
            dispatch(fetchArticles());
        }
    })
)(List);
