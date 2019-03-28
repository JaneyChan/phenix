import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { getUidStr } from '@/service/utils';
import { open, close, destroy } from './events';

export default class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.id = getUidStr();
  }

  componentWillUnmount () {
    close({ id: this.id });
    destroy(this.id);
  }

  shouldComponentUpdate (nextProps) {
    if (isEmpty(this.props, nextProps)) return false;
    if (nextProps.visible) return true;
    close({ id: this.id });
    return !isEmpty(this.props, nextProps) && nextProps.visible;
  }

  render () {
    const option = {
      ...this.props,
      content: this.props.children,
      id: this.id
    };
    if (this.props.visible) return open(option, true);
    return null;
  }
}
