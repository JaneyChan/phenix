import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setCategoryList } from '@/redux/action/category';
import { getArticlesByCatogoryId } from '@/redux/action/article';

import CategoryMemu from '@/components/main/side/menu';

import Dialog from '@/lib/dialog';
import Button from '@/lib/button';
import Input from '@/lib/input';
import Icon from '@/lib/icon';
import fetch from '@/utils/fetch';

class Category extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      dialog: {
        open: false,
        cateName: ''
      },
      menu: {
        open: false,
        options: [],
        style: {}
      }
    };
  }
  componentDidMount () {
    fetch.get('/api/category/list')
      .then((res) => {
        if (res.success) {
          this.props.setCategoryList(res.data);
          if (res.data.length > 0) {
            let { match } = this.props;
            this.changeRoute(res.data, match.params.cid, match.params.nid);
          }
        }
      });
  }
  changeRoute = (categoryList, cateId, noteId) => {
    const cateIds = categoryList.map(category => category.id.toString());
    const category = categoryList[0];
    let categoryId = cateIds.includes(cateId) ? cateId : (category && category.id);
    if (noteId) {
      this.props.history.replace(`/category/${categoryId}/note/${noteId}`);
    } else {
      this.props.history.replace(`/category/${categoryId}`);
    }
    if (cateId === categoryId) {
      this.props.getArticlesByCatogoryId(categoryId);
    }
  }
  changeCategory = (cateId) => {
    console.log('切换分类前请确认是否保存了文章');
    this.props.history.replace(`/category/${cateId}`);
  }
  createCategory = () => {
    let { dialog } = this.state;

    fetch.post('/api/category/create', { name: dialog.cateName })
      .then((res) => {
        if (res.success) {
          let list = [...this.props.categoryList];
          list.push(res.data);
          this.props.setCategoryList(list);
          this.initDialog();
        }
      });
  }
  initDialog = (open = false) => {
    this.setState({
      dialog: {
        open,
        cateName: ''
      }
    });
  }
  changeInputValue = (e) => {
    this.setState({
      dialog: {
        ...this.state.dialog,
        cateName: e.target.value
      }
    });
  }
  _changeHoverCateId = (id) => {
    this.setState({
      hoverCateItem: id
    });
  }
  // 关闭菜单面板
  _closeMenusPanel = () => {
    this.setState({
      menu: {
        ...this.state.menu,
        open: false
      },
      hoverCateItem: ''
    });
  }
  // 右键菜单设置
  showContextMenu = (e, category) => {
    e = e || window.event;
    e.preventDefault(); // 阻止默认的右键事件
    let cursorX = e.clientX, cursorY = e.clientY;
    let opts = [{
      label: '编辑分类',
      icon: 'edit',
      onClick: () => {
        console.log('编辑分类');
      }
    }, {
      label: '删除分类',
      icon: 'delete',
      onClick: () => {
        console.log('删除分类');
      }
    }];

    let menuHeight = 24 + opts.length * 30, // 计算菜单高度
      menuStyle = {
        left: cursorX + 'px'
      };
    if (menuHeight + cursorY < document.body.clientHeight) {
      menuStyle.top = cursorY + 'px';
    } else {
      menuStyle.bottom = (document.body.clientHeight - cursorY) + 'px';
    }
    this.setState({
      menu: {
        open: true,
        options: opts,
        style: menuStyle
      }
    });
    return false;
  }
  render () {
    let { categoryList, match } = this.props, { dialog, menu } = this.state;
    return (
      <div className="side-cate-wrap">
        <div className="side-item-header">
          <div className="side-item"><Icon type="book" className="side-item-icon" />All Notes</div>
          <div className="side-item" onClick={this.createArticle}><Icon type="delete" className="side-item-icon" />Trash</div>
        </div>
        <div className="side-cate-wrap">
          <div className="cate-title">
            <Icon type="bars" className="cate-icon--bar" />
              Category
            <Icon type="plus" className="cate-add" onClick={() => { this.initDialog(true); }}/>
          </div>
          <div className="cate-list">
            {
              categoryList && categoryList.map((category) => (
                <div
                  key={category.id}
                  className={`cate-item${category.id.toString() === match.params.cid ? ' selected' : ''}${category.id === this.state.hoverCateItem ? ' item-hover' : ''}`}
                  onClick={() => {
                    this.changeCategory(category.id);
                  }}
                  onMouseOver={() => { this._changeHoverCateId(category.id); }}
                  onMouseOut={() => {
                    !menu.open && this._changeHoverCateId('');
                  }}
                  onContextMenu={(e) => {
                    this.showContextMenu(e, category);
                  }}
                >
                  <i className="cate-icon_drag"></i>
                  <div className="cate-name-box">
                    <Icon type="folder" className="cate-folder-close" />{category.name}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="login-out-btn"><Icon type="logout"/>退出</div>

        {
          menu.open ? (
            <CategoryMemu
              menu={menu}
              handles={{
                closeMenusPanel: this._closeMenusPanel
              }}
            />
          ) : null
        }

        <Dialog open={dialog.open} className="category-modal">
          <Icon type="close" className="close-btn"/>
          <Input
            value={dialog.cateName || ''}
            placeholder="请输入分类名"
            onChange={this.changeInputValue}
          />
          <Button type="green" onClick={this.createCategory} className="category-add-btn">我是按钮</Button>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    categoryList: state.category.list
  }),
  (dispatch) => ({
    setCategoryList: (list) => {
      dispatch(setCategoryList(list));
    },
    getArticlesByCatogoryId: (articleId) => {
      dispatch(getArticlesByCatogoryId(articleId));
    }
  })
)(Category));
