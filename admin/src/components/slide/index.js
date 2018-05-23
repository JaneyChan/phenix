import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableHandle } from 'react-sortable-hoc'
import { getCategoryList, createCategory } from '../../redux/action/category';
import Dialog from '../common/dialog';
import Button from '../common/button';
import Input from '../common/input';

const DraggableIcon = SortableHandle(() => (
    <i className="cate-icon_drag"></i>
))

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: {
                open: false
            }
        }
    }
    componentDidMount() {
        this.props.getCategoryList();
    }
    createCategory = (category) => {
        this.setState({
            dialog: {
                open: true
            }
        });
        // this.props.createCategory({name: '测试'});
    }
    createArticle = () => {
        console.log('createArticle');
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
                            onClick={this.createCategory}
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
                    <Input placeholder="请输入分类名" />
                    <Button type="green">我是按钮</Button>
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
        createCategory: (category) => {
            dispatch(createCategory(category));
        }
    })
)(Slide);
