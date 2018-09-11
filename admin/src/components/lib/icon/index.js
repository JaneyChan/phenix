import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Icon = props => {
  const { type, className = '', onClick } = props;
  const classString = classNames(
    {
      anticon: true,
      [`anticon-${type}`]: true
    },
    className
  );
  return <i className={classString} onClick={onClick}/>;
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  spin: PropTypes.bool
};

export default Icon;
