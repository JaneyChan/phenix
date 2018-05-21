import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

class Dialog extends PureComponent {
	static propTypes = {
		open: PropTypes.bool
	}
	static defaultProps = {
		open: false
	}
	render() {
		let { open } = this.props;
		if(open) {
			return createPortal(
				<div className="dialog">
				  {this.props.children}
				</div>,
				document.body
			);
		}
		return null;
	}
}

export default Dialog;
