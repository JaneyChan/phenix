import React from 'react';
import ReactDOM from 'react-dom';

import Icon from '@/lib/icon'
import MarkdownPreview from '../markdown/preview';

class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.textControl = ReactDOM.findDOMNode(this.refs.editor);
        this.textControl && this.textControl.addEventListener('keydown', this.listenerKeyDown, false);
    }
    listenerKeyDown = (e) => {
        let keyCode = e.keyCode || e.which || e.charCode;
        let ctrlKey = e.ctrlKey || e.metaKey;
        if(keyCode === 9) {
            // 输入Tab键, 填入两个空格
            e.preventDefault();
            let text = '  ';
            const start = this.textControl.selectionStart;
            const end = this.textControl.selectionEnd;
            const origin = this.textControl.value;
            
            this.textControl.value = origin.slice(0, start) + text + origin.slice(end)
            // pre-select
            this.textControl.setSelectionRange(start + 2, start + 2)
            this.props.changeArticleContent(this.textControl.value);
        }
        if(ctrlKey && keyCode === 83) {
            e.preventDefault();
            // control+s 或 command+s 保存文章
            this.props.saveArticle();
        }
        
    }
    render() {
        let { articleDetail } = this.props;
        return (
            <div className="article-detail-wrap">
                <div className="detail-header">
                    <div className="detail-title">
                        <input
                            type="text"
                            placeholder="文章名称"
                            value={articleDetail.title || ''}
                            autoFocus
                            onChange={this.props.changeInput}
                        />
                    </div>
                    <div className="tool-bar">
                        <Icon type={this.props.openDrawer ? 'menu-unfold': 'menu-fold'} className="bar-info" onClick={this.props.toggleDrawerStatus} />
                        <Icon type="save" className="bar-info" onClick={this.saveArticle}/>
                        <Icon type="delete" className="bar-info" onClick={this.saveArticle}/>
                        <span className="bar-info publish-btn"><Icon type={articleDetail.publish ? 'close': 'cloud-upload-o'} />{ articleDetail.publish ? '取消发布': '发布文章'}</span>
                    </div>
                </div>
                <div className="article-editor-wrap">
                    <textarea
                        id="editor"
                        ref="editor"
                        value={articleDetail.content || ''}
                        placeholder={`Command(⌘) + S   Save Article`}
                        className="editor-box"
                        onChange={(e) => this.props.changeArticleContent(e.target.value)}
                    ></textarea>
                    
                    <div className="show-box">
                        <MarkdownPreview value={articleDetail.content || ''} markedOptions={{ breaks: true, pedantic: true, sanitize: true, smartypants: true}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;