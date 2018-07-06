import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryList, setCategoryList } from '@/redux/action/category';
import Dialog from '@/lib/dialog';
import Button from '@/lib/button';
import Input from '@/lib/input';
import Icon from '@/lib/icon'
import fetch from '@/utils/fetch';

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: {
                open: false,
                cateName: ''
            }
        }
    }
    componentDidMount() {
        this.props.getCategoryList();
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
        let { categoryList } = this.props, { dialog } = this.state;
        return(
            <div className="article-slide-wrap">
                <div className="slide-item-header">
                    <div className="slide-item"><Icon type="book" className="slide-item-icon" />All Notes</div>
                    <div className="slide-item" onClick={this.createArticle}><Icon type="delete" className="slide-item-icon" />Trash</div>
                </div>
                
                <div className="slide-cate-wrap">
                    <div className="cate-title">
                        <Icon type="bars" className="cate-icon--bar" />
                        Category
                        <Icon type="plus" className="cate-add" onClick={() => {this.initDialog(true) }}/>
                    </div>
                    <div className="cate-list">
                        {
                            categoryList && categoryList.map((category) => (
                                <div className="cate-item" key={category.id}>
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

export default connect(
    (state) => ({
        categoryList: state.category.list
    }),
    (dispatch) => ({
        getCategoryList: () => {
            dispatch(getCategoryList());
        },
        setCategoryList: (list) => {
            dispatch(setCategoryList(list));
        }
    })
)(Slide);