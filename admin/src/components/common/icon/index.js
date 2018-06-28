import * as React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';

const Icon = props => {
  const { type, className = "", spin } = props;
  const classString = classNames(
    {
      anticon: true,
      "anticon-spin": !!spin || type === "loading",
      [`anticon-${type}`]: true
    },
    className
  );
  return <i className={classString} />;
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  spin: PropTypes.bool,
}

export default Icon;
