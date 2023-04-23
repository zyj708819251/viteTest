import request from '@/utils/request';

// 列表查询部门

export const getDept = (fun) => {
  return request({
    url: `/supplies/materialDemandReport/getDept`,
    method: 'get'
  });
};