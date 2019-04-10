import React from 'react';
import { Button, Dialog } from '@/components/lib';

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
      <Dialog
        visible={visible}
        footer={footer}
        onOk={() => {
        }}
        onCancel={() => {
          console.log('取消了');
        }}
        className='exit-dialog'
      >
        <div className="exit-title">当前文章未保存，是否继续编辑？</div>
      </Dialog>
    );
  }
}

export default ExitEditorDialog;
