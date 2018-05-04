import React from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../../../redux/action/article';

class List extends React.PureComponent {
    componentDidMount() {
        this.props.fetchArticles();
    }
    render() {
        let { articleList } = this.props;
        return (
            <div className="article-list-wrap">
                <div className="article-list-title">新博客完成啦！</div>
                {
                    articleList && articleList.map((article) => {
                        return(
                            <div className="article-item" key={article.id}>
                                <div className="box">
                                    <div className="item-title">我是标题</div>
                                    <div className="item-time">2018-05-01 12:00:00</div>
                                    <div className="item-paragraph">我是段落</div>
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
