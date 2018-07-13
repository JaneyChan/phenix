import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { setCategoryList } from '@/redux/action/category';
import { getArticlesByCatogoryId } from '@/redux/action/article';

import Dialog from '@/lib/dialog';
import Button from '@/lib/button';
import Input from '@/lib/input';
import Message from '@/lib/message';
import Icon from '@/lib/icon'
import fetch from '@/utils/fetch';

class Category extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialog: {
                open: false,
                cateName: '',
            }
        }
    }
    componentDidMount() {
        fetch.get('/api/category/list')
        .then((res) => {
          if(res.success) {
            this.props.setCategoryList(res.data);
            if(res.data.length > 0) {
                let cid = this.props.match.params.cid,
                    cateId = res.data[0].id;
                if(cid) {
                    let inList = false;
                    res.data.map((item) => {
                        if(item.id == cid) {
                            inList = true;
                        }
                    })
                    cateId = inList ? cid : cateId
                }
                this.props.getArticlesByCatogoryId(cateId);
                this.props.history.replace(`/category/${cateId}`);
            } else {
                Message.error('找不到分类列表');
            }
          }
        });
    }
    componentWillReceiveProps(nextProps) {
        let prevCid = this.props.match.params.cid,
            nextCid = nextProps.match.params.cid;
        if(prevCid != nextCid) {
            this.props.getArticlesByCatogoryId(nextCid);
            this.props.history.replace(`/category/${nextCid}`);
        }
    }
    createCategory = () => {
        let { dialog } = this.state;

        fetch.post('/api/category/create', { name: dialog.cateName})
        .then((res) => {
            if(res.success) {
                let list = [...this.props.categoryList];
                list.unshift(res.data)
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
    render() {
        let { categoryList, match } = this.props, { dialog } = this.state;
        return(
            <div className="side-cate-wrap">
                <div className="side-item-header">
                    <div className="side-item"><Icon type="book" className="side-item-icon" />All Notes</div>
                    <div className="side-item" onClick={this.createArticle}><Icon type="delete" className="side-item-icon" />Trash</div>
                </div>
                
                <div className="side-cate-wrap">
                    <div className="cate-title">
                        <Icon type="bars" className="cate-icon--bar" />
                        Category
                        <Icon type="plus" className="cate-add" onClick={() => {this.initDialog(true) }}/>
                    </div>
                    <div className="cate-list">
                        {
                            categoryList && categoryList.map((category) => (
                                <NavLink
                                    key={category.id}
                                    to={`/category/${category.id}`}
                                    className="cate-item"
                                    activeClassName="selected"
                                    isActive={() => {
                                        return category.id == match.params.cid;
                                    }}
                                >
                                    <i className="cate-icon_drag"></i>
                                    <div className="cate-name-box">
                                        <Icon type="folder" className="cate-folder-close" />{category.name}
                                    </div>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
                <div className="login-out-btn"><Icon type="logout"/>退出</div>
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
        )
    }
}

export default withRouter(connect(
    (state) => ({
        categoryList: state.category.list
    }),
    (dispatch) => ({
        getCategoryList: () => {
            dispatch(getCategoryList());
        },
        setCategoryList: (list) => {
            dispatch(setCategoryList(list));
        },
        getArticlesByCatogoryId: (articleId) => {
            dispatch(getArticlesByCatogoryId(articleId));
        }
    })
)(Category));