import React from 'react';

class Detail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }
    componentDidMount() {
        document.getElementById('editor').addEventListener('keydown', (e) => {
            if(e.keyCode===9) {
              e.preventDefault();
            }
        },false);
    }
    changeInput = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    changeArticleContent = (e) => {
        this.setState({
            content: e.target.value
        });
    }
    saveArticle = () => {
        console.log('title: ' + this.state.title + ', ' + this.state.content);
    }
    render() {
        let { title, content } = this.state;
        return (
            <div className="article-detail-wrap">
                <div className="detail-title">
                    <input
                        type="text"
                        placeholder="文章名称"
                        value={title}
                        onChange={this.changeInput}
                    />
                </div>
                <div className="tool-bar">
                    <span className="save-btn" onClick={this.saveArticle}></span>
                </div>
                <textarea
                    id="editor"
                    value={content}
                    className="editor-box"
                    onChange={this.changeArticleContent}
                ></textarea>
            </div>
        );
    }
}

export default Detail;