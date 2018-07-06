import React from 'react';
import { connect } from 'react-redux';
import { updateArticle } from '../../../redux/action/article';
import Icon from '@/lib/icon'
import MarkdownPreview from '../markdown/preview';

class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            articleDetail: props.articleDetail
        }
    }
    componentDidMount() {
        document.getElementById('editor').addEventListener('keydown', this.listenerKeyDown, false);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.articleDetail !== nextProps.articleDetail) {
            this.setState({
                articleDetail: nextProps.articleDetail
            });
        }
    }
    listenerKeyDown = (e) => {
        let keyCode = e.keyCode || e.which || e.charCode;
        let ctrlKey = e.ctrlKey || e.metaKey;
        if(keyCode === 9) {
            // 输入Enter键
            e.preventDefault();
        }
        if(ctrlKey && keyCode === 83) {
            e.preventDefault();
            // control+s 或 command+s 保存文章
            this.saveArticle();
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
        this.props.updateArticle(articleDetail);
    }
    render() {
        let { articleDetail } = this.state;
        return (
            <div className="article-detail-wrap">
                <div className="detail-header">
                    <div className="detail-title">
                        <input
                            type="text"
                            placeholder="文章名称"
                            value={articleDetail.title || ''}
                            autoFocus
                            onChange={this.changeInput}
                        />
                    </div>
                    <div className="tool-bar">
                        <Icon type="save" className="save-btn" onClick={this.saveArticle}/>
                    </div>
                </div>
                <div className="article-editor-wrap">
                    <textarea
                        id="editor"
                        value={articleDetail.content || ''}
                        placeholder={`Command(⌘) + S   Save Article`}
                        className="editor-box"
                        onChange={this.changeArticleContent}
                    ></textarea>
                    
                    <div className="show-box">
                        <MarkdownPreview value={articleDetail.content || ''} markedOptions={{ breaks: true, pedantic: true, sanitize: true, smartypants: true}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        articleDetail: state.article.detail
    }),
    (dispatch) => ({
        updateArticle: (article) => {
            dispatch(updateArticle(article));
        }
    })
)(Detail);