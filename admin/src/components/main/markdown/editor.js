import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class MarkdownEditor extends React.PureComponent {
  componentDidMount () {
    this.textControl = ReactDOM.findDOMNode(this.refs.editor);
    this.textControl && this.textControl.addEventListener('keydown', this.listenerKeyDown, false);
  }
  listenerKeyDown = (e) => {
    let keyCode = e.keyCode || e.which || e.charCode,
      { handles } = this.props;
    if (keyCode === 9) {
      // 输入Tab键, 填入两个空格
      e.preventDefault();
      let text = '  ';
      const start = this.textControl.selectionStart;
      const end = this.textControl.selectionEnd;
      const origin = this.textControl.value;
      this.textControl.value = origin.slice(0, start) + text + origin.slice(end);
      // pre-select
      this.textControl.setSelectionRange(start + 2, start + 2);
      handles.changeArticleContent(this.textControl.value);
    }
  }
  render () {
    let { value, onChange, className } = this.props;
    const classString = classNames(
      {
        'content-editor': true
      },
      className
    );
    return (
      <textarea
        id="editor"
        ref="editor"
        value={value}
        placeholder={`Command(⌘) + S   Save Article`}
        className={classString}
        onChange={onChange}
      ></textarea>
    );
  }
}

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

MarkdownEditor.defaultProps = {
  vaulue: ''
};

export default MarkdownEditor;
