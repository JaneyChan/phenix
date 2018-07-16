import fetch from '@/utils/fetch';
import { SET_CATEGORY_LIST } from '../constants';

// 获取分类列表
export const getCategoryList = () => {
  return (dispatch) => {
    return fetch.get('/api/category/list')
      .then((res) => {
        if (res.success) {
          dispatch(setCategoryList(res.data));
        }
      });
  };
};

// 更新分类类别
export const updateCategory = (category) => {
  return (dispatch, getState) => {
    fetch.post('/api/category/update', category)
      .then((res) => {
        if (res.success) {
          let list = getState().category.list;
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === category.id) {
              list[i] = category;
            }
          }
          dispatch(setCategoryList(list));
        }
      });
  };
};

export const setCategoryList = (list) => {
  return {
    type: SET_CATEGORY_LIST,
    categoryList: list
  };
};
