import axios from 'axios';
import { SET_CATEGORY_LIST } from '../constants'

// 获取文章列表
export const getCategoryList = () => {
    return (dispatch, getState)=> {
        axios.get('/api/category/list')
        .then((res) => {
          if(res.data.success) {
            dispatch(setCategoryList(res.data.data));
          }
        });
    };
}

export const updateCategory = (category) => {
    return (dispatch, getState) => {
        axios.post('/api/category/update', category)
        .then((res) => {
            if(res.data.success) {
                let list = getState().category.list;
                for(let i = 0; i < list.length; i++) {
                    if(list[i].id === category.id) {
                        list[i] = category;
                    }
                }
                dispatch(setCategoryList(list));
            }
        });
    };
}

export const setCategoryList = (list) => {
    return {
        type: SET_CATEGORY_LIST,
        categoryList: list
    };
}