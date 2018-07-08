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
        let keyCode = e.keyCode || e.which || e.charCode,
            { handles } = this.props;
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
            handles.changeArticleContent(this.textControl.value);
        }
    }
    render() {
        let { articleDetail, handles, openDrawer } = this.props;
        return (
            <div className="main-container">
                <div className="detail-header">
                    <div className="detail-title">
                        <input
                            type="text"
                            placeholder="文章名称"
                            value={articleDetail.title || ''}
                            autoFocus
                            onChange={handles.changeInput}
                        />
                    </div>
                    <div className="tool-bar">
                        <Icon type={openDrawer ? 'menu-fold': 'menu-unfold'} className="bar-item" onClick={handles.toggleDrawerStatus} />
                        <Icon type="arrows-alt" className="bar-item"/>
                        
                        <span className="bar-item publish-btn fr" onClick={handles.toggleArticlePublish}>
                            <Icon type={articleDetail.publish ? 'lock': 'unlock'} />
                            { articleDetail.publish ? '转为私密': '公开文章'}
                        </span>
                        <Icon type="delete" className="bar-item fr" onClick={handles.saveArticle}/>
                        <Icon type="save" className="bar-item fr" onClick={handles.saveArticle}/>
                    </div>
                </div>
                <div className="editor-preview-wrap">
                    <textarea
                        id="editor"
                        ref="editor"
                        value={articleDetail.content || ''}
                        placeholder={`Command(⌘) + S   Save Article`}
                        className="editor-box"
                        onChange={(e) => handles.changeArticleContent(e.target.value)}
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