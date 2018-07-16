import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import marked from 'marked';
import highlight from 'highlight.js';

class MarkdownPreview extends React.PureComponent {
  constructor (props) {
    super(props);
    // init marked
    highlight.initHighlightingOnLoad();
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true, // 允许 GitHub标准的markdown
      tables: true, // 允许支持表格语法,默认为true
      breaks: true, // 允许回车换行,默认为false
      pedantic: false,
      sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
      smartLists: true,
      smartypants: true,
      highlight: (code) => {
        return highlight.highlightAuto(code).value;
      }
    });
  }

  render () {
    const { value, className } = this.props;
    const classString = classNames(
      {
        'markdown-preview': true
      },
      className
    );
    return <div className={classString} dangerouslySetInnerHTML={{ __html: marked(value) }} />;
  }
}

MarkdownPreview.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired
};

MarkdownPreview.defaultProps = {
  value: ''
};

export default MarkdownPreview;
