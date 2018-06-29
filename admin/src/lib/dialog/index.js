import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

class Dialog extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		open: PropTypes.bool
	}
	static defaultProps = {
		open: false
	}
	render() {
		let { open, className } = this.props;
		if(open) {
			return createPortal(
				<div className="dialog-overlay">
					<div className={`dialog-wrap ${className}`}>{this.props.children}</div>
				</div>,
				document.body
			);
		}
		return null;
	}
}

export default Dialog;
