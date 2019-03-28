import React from 'react';
import { Button, Modal } from '@/components/lib';

class ExitEditorDialog extends React.PureComponent {
  render () {
    let { visible } = this.props;
    const footer = (
      <div className="dialog__footer">
        <Button className="exit-unsave-btn" size="small" onClick={this.onClose}>不保存</Button>
        <Button size="small" onClick={this.onClose}>取消</Button>
        <Button type='green' size="small" onClick={this.handleOK}>保存</Button>
      </div>
    );
    return (
      <Modal
        visible={visible}
        footer={footer}
        onOk={() => {
        }}
        onClose={() => {
          console.log('取消了');
        }}
        className='exit-dialog'
      >
        <div className="exit-title">当前文章未保存，是否继续编辑？</div>
      </Modal>
    );
  }
}

export default ExitEditorDialog;
