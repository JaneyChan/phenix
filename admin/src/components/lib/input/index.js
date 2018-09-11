import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  }
  static defaultProps = {
    open: false
  }
  render () {
    let { value, placeholder, onChange } = this.props;
    return (
      <input
        className="input-field"
        type="text"
        placeholder={placeholder || ''}
        value={value || ''}
        onChange={onChange}
      />
    );
  };
}

export default Input;
