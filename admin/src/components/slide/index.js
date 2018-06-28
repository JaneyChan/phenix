import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategoryList, setCategoryList } from '../../redux/action/category';
import Dialog from '../common/dialog';
import Button from '../common/button';
import Input from '../common/input';
import fetch from '@/utils/fetch';

const DraggableIcon = () => (
    <i className="cate-icon_drag"></i>
)

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
            <div className="slide-box">
                <div className="slide-item_expend">
                    <span className="icon_expend"></span>
                </div>
                <div className="slide-item_top">
                    <div className="slide-item all">All Notes</div>
                    <div className="slide-item trash" onClick={this.createArticle}>Trash</div>
                </div>
                
                <div className="slide-cate-wrap">
                    <div className="cate-title">
                        Category
                        <span
                            className="add"
                            onClick={() => {this.initDialog(true) }}
                        ></span>
                    </div>
                    <div className="cate-list">
                        {
                            categoryList && categoryList.map((category) => (
                                <div className="cate-item" key={category.id}>
                                    <DraggableIcon />
                                    <div className="cate-name-box">{category.name}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="login-out-btn"></div>
                <Dialog open={dialog.open} className="category-modal">
                    <i className="close-btn" />
                    <Input
                        value={dialog.cateName || ''}
                        placeholder="请输入分类名"
                        onChange={this.changeInputValue}
                    />
                    <Button type="green" onClick={this.createCategory}>我是按钮</Button>
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
