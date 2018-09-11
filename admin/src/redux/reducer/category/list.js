import { SET_CATEGORY_LIST } from '../../constants';

const categoryList = (state = [], action) => {
  switch (action.type) {
    // 获取分类列表
    case SET_CATEGORY_LIST:
      return [...action.categoryList];
    default:
      return state;
  }
};

export default categoryList;
