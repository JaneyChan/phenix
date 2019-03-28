let uid = Date.now();

export function getUid () {
  uid += 1;
  return uid;
}

export function getUidStr () {
  return getUid().toString(36);
}

export const parseTime = (timestamp, fmt) => {
  let d = new Date(timestamp),
    f = fmt || 'yyyy-MM-dd hh:mm:ss',
    o = {
      'M+': d.getMonth() + 1, // 月份
      'd+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      'S': d.getMilliseconds() // 毫秒
    };
  if (/(y+)/.test(f)) {
    f = f.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(f)) {
      f = f.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return f;
};

/**
 * 将N个方法合并为一个链式调用的方法
 * @return {Function}     合并后的方法
 * 参考 https://github.com/react-component/util/
 *
 * @example
 * func.makeChain(this.handleChange, this.props.onChange);
 */
export const makeChain = (...fns) => {
  if (fns.length === 1) {
    return fns[0];
  }

  return function chainedFunction (...args) {
    for (let i = 0, j = fns.length; i < j; i++) {
      if (fns[i] && fns[i].apply) {
        fns[i].apply(this, args);
      }
    }
  };
};
