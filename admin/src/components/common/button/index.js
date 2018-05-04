import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * 组件props属性说明
 * @param type ['blue', 'green', 'default']分别为蓝色按钮、绿色按钮，默认白灰色按钮
 * @param size ['middle', 'small']分别为按钮高度为40px、32px
 */
class Button extends PureComponent {
	static propTypes = {
		type: PropTypes.oneOf(['blue', 'green', 'default']),
		size: PropTypes.oneOf(['middle', 'small']),
		onClick: PropTypes.func,
		className: PropTypes.string
	}
	static defaultProps = {
		type: 'default',
		size: 'middle'
	}
	render() {
		let { type, size, onClick } = this.props;
		let btnType = type !== 'default' ? ' btn-'+type : '',
			btnSize = size !== 'middle' ? ' btn-'+size: '';
		return (
			<button
				type="button"
				className={`btn${btnType}${btnSize}`}
				onClick={onClick}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
