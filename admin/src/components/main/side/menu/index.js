import React from 'react';
import { Icon } from '@/components/lib';

class Menu extends React.PureComponent {
  render () {
    let { menu, handles } = this.props;
    return (
      <div className="menu-wrap">
        <div className="menu-mask" id="menu-mask" onClick={handles.closeMenusPanel}></div>
        <ul className="menu-list" style={{...menu.style}}>
          {
            menu.options.map((opt, index) => {
              return (
                <li key={index}
                  className="menu-option"
                  onClick={(e) => {
                    opt.onClick(e);
                    handles.closeMenusPanel();
                  }}
                >
                  {
                    opt.icon ? (
                      <Icon type={opt.icon} className="menu-icon" />
                    ) : null
                  }
                  <span>{opt.label}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
export default Menu;
