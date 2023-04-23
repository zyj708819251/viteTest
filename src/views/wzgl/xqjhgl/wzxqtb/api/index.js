import request from '@/utils/request';

// 查询列表
export const listGybg = (data) => {
  return request({
    url: `/supplies/materialDemandReport/list`,
    method: 'post',
    data: data
  });
};
//删除
export const deleteGybg = (data) => {
  return request({
    url: `/supplies/materialDemandReport/deleteTb`,
    method: 'get',
    params: data
  });
};




// 新增、修改接口
export const saveOrUpdateGybg = (data) => {
  return request({
    url: `/supplies/materialDemandReport/saveOrUpdate`,
    method: 'POST',
    data: data
  });
};

export const listInfo = (data) => {
  return request({
    url: `/supplies/materialDemandReport/listInfo`,
    method: 'get',
    params: data
  });
};
//删除填报数据
export const deleteInfo = (data) => {
  return request({
    url: `/supplies/materialDemandReport/deleteInfo`,
    method: 'get',
    params: data
  });
};



// 文件上传
export const upDateFiles = (data,fun) => {
  return request({
    url: `/file/minio/uploadFileId`,
    method: 'POST',
    data: data,
     onUploadProgress: fun
  });
};
// 获取文件列表
export const getFilesPrames = (data) => {
  return request({
    url: `/file/minio/listFiles`,
    method: 'POST',
    data: data
  });
};
// 删除文件
export const deleteFilesById = (data) => {
  return request({
    url: `/file/minio/deleteFiles`,
    method: 'GET',
    params: data
  });
};


//获取变更等级评估表
export const getEditLevelList = (data) => {
  return request({
    url: `/equi/equiEdit/getEditLevelList`,
    method: 'GET',
    params: data
  });
};
//获取变更范围
export const getEditAreaList = (data) => {
  return request({
    url: `/equi/equiEdit/getEditAreaList`,
    method: 'GET',
    params: data
  });
};

// 新增接口
export const equiEditAdd = (data) => {
  return request({
    url: `/equi/equiEdit/add`,
    method: 'POST',
    data: data
  });
};
// 评估小组
export const updatePgxz = (data) => {
  return request({
    url: `/production/technology/updatePgxz`,
    method: 'POST',
    data: data
  });
};
// 风险评估
export const updateFileList = (data) => {
  return request({
    url: `/production/technology/updateFileList`,
    method: 'POST',
    data: data
  });
};
export const listRiskAssesses = (data) => {
  return request({
    url: `/production/technology/listRiskAssesses`,
    method: 'GET',
    params:data
  });
};
//获取制度和技术文件清单
export const listFileList = (data) => {
  return request({
    url: `/production/technology/listFileList`,
    method: 'GET',
    params:data
  });
};


//查询验收组意见
export const listYsyj = (data) => {
  return request({
    url: `/production/technology/listYsyj`,
    method: 'GET',
    params:data
  });
};


// 变更实施状态
export const updateStateImplementation = (data) => {
  return request({
    url: `/production/technology/updateStateImplementation`,
    method: 'POST',
    data: data
  });
};

// 验收小组
export const updateYsxz = (data) => {
  return request({
    url: `/production/technology/updateYsxz`,
    method: 'POST',
    data: data
  });
};
//变更验收
export const updateBgys = (data) => {
  return request({
    url: `/production/technology/updateBgys`,
    method: 'POST',
    data: data
  });
};



//修改变更后评价
export const editbghpg = (data) => {
  return request({
    url: `/equi/equiEdit/editbghpg`,
    method: 'POST',
    data: data
  });
};



//同意

export const approvalEqui = (data) => {
  return request({
    url: `/supplies/materialDemandReport/approval`,
    method: 'POST',
    data: data
  });
};

//驳回至起点

export const processRejectionToStart = (data) => {
  return request({
    url: `/equi/equiEdit/rejectAllNodeEqui`,
    method: 'POST',
    data: data
  });
};
// 驳回上一节点
export const processRejection = (data) => {
  return request({
    url: `/supplies/materialDemandReport/reject`,
    method: 'post',
    data: data
  });
};
//获取流程按钮
export const getBtnsData = (data) => {
  return request({
    url: `/flowable/instance/getNodeConfig`,
    method: 'get',
    params: data
  });
};

//验收小组添加到工作流

export const addFlowYSXZ = (data) => {
  return request({
    url: `/equi/equiEdit/addFlowYSXZ/` + data,
    method: 'get'
  });
};

//评估小组添加到工作流
export const addFlowPGXZ = (data) => {
  return request({
    url: `/equi/equiEdit/addFlowPGXZ/` + data,
    method: 'get'
  });
};


// 导出单条数据
export const exportEquiSbbg = (data,fun) => {
  return request({
    url: `/equi/equiEdit/exportEquiSbbg`,
    method: 'get',
    params:data,
    responseType: 'blob',
    onUploadProgress: fun
  });
};





// 查询回执
export const listReceipt = (data) => {
  return request({
    url: `/production/schedulingInstruction/listReceipt`,
    method: 'get',
     params: data
  });
};
// 修改回执

export const updateReceipt = (data) => {
  return request({
    url: `/production/schedulingInstruction/updateReceipt`,
    method: 'post',
    data: data
  });
};



// 是否是审批人
export const isApprove = (data) => {
  return request({
    url: `/production/schedulingInstruction/isApprove`,
    method: 'get',
     params: data
  });
};



// 审核
export const updateApproval = (data) => {
  return request({
    url: `/supplies/materialDemandReport/updateApproval`,
    method: 'post',
    data: data
  });
};

//部门
export const listDept = () => {
  return request({
    url: `/supplies/materialDemandReport/listDept`,
    method: 'get'
  });
};
// code是否重复
export const codeIsRepeat = (data) => {
  return request({
    url: `/supplies/materialDemandReport/codeIsRepeat`,
    method: 'get',
    params:data
  });
};

// 
export const exportTemplates = (fun) => {
  return request({
    url: `/supplies/materialDemandReport/exportTemplates`,
    method: 'get',
    responseType: 'blob',
    onUploadProgress: fun
  });
};
export const exportData = (data,fun) => {
  return request({
    url: `/supplies/materialDemandReport/export`,
    method: 'get',
    params:data,
    responseType: 'blob',
    onUploadProgress: fun
  });
};


export const importExcel = (data,fun) => {
  return request({
    url: `/supplies/materialDemandReport/importExcel`,
    method: 'post',
    data: data,
    onUploadProgress: fun
  });
};


// 列表查询部门

export const getDept = (fun) => {
  return request({
    url: `/supplies/materialDemandReport/getDept`,
    method: 'get'
  });
};