import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            articleDetail: props.articleDetail
        }
    }
    componentDidMount() {
        document.getElementById('editor').addEventListener('keydown', (e) => {
            if(e.keyCode === 9) {
              e.preventDefault();
            }
        },false);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.articleDetail !== nextProps.articleDetail) {
            this.setState({
                articleDetail: nextProps.articleDetail
            });
        }
    }
    changeInput = (e) => {
        this.setState({
            articleDetail: {
                ...this.state.articleDetail,
                title: e.target.value
            }
        });
    }
    changeArticleContent = (e) => {
        this.setState({
            articleDetail: {
                ...this.state.articleDetail,
                content: e.target.value
            }
        });
    }
    saveArticle = () => {
        let { articleDetail } = this.state;
        axios.post('/api/article/create', { title: articleDetail.title, content: articleDetail.content})
        .then((res) => {
        });
    }
    render() {
        let { articleDetail } = this.state;
        return (
            <div className="article-detail-wrap">
                <div className="detail-title">
                    <input
                        type="text"
                        placeholder="文章名称"
                        value={articleDetail.title || ''}
                        onChange={this.changeInput}
                    />
                </div>
                <div className="tool-bar">
                    <span className="save-btn" onClick={this.saveArticle}></span>
                </div>
                <textarea
                    id="editor"
                    value={articleDetail.content || ''}
                    className="editor-box"
                    onChange={this.changeArticleContent}
                ></textarea>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        articleDetail: state.article.detail
    }),
    null
)(Detail);