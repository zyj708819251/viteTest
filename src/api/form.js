import request from '@/utils/request';
//表头数据
export const getTableColumn = (query) => {
	return request({
		url: `/form/tool/column/list`,
		method: 'GET',
		params: query
	});
};

//查询分类
export const getListType = (query) => {
	return request({
		url: `/form/tool/devmanager/listType`,
		method: 'GET',
		data: query
	});
};


//树形菜单
export const getTreeData = (formId) => {
	return request({
		url: `/form/tool/form/tree/${formId}`,
		method: 'GET'
	});
};

//表格分页
export const getTableData = (formId,params,query) => {
	return request({
		url: `/form/tool/formdata/list/${formId}?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
		method: 'POST',
		data: query
	});
};
//表格分页
export const getTableDataAll = (formId,query={}) => {
	return request({
		url: `/form/tool/formdata/list/${formId}`,
		method: 'POST',
		data: query
	});
};

//查询字典列表
export const getSysDictData = (query) => {
	return request({
		url: `/form/system/dict/data/list`,
		method: 'GET',
		params: query
	});
};

//添加
export const addTableData = (formId,query) => {
	return request({
		url: `/form/tool/formdata/add/${formId}`,
		method: 'POST',
		data: query
	});
};
//修改
export const updateTableData = (formId,query) => {
	return request({
		url: `/form/tool/formdata/edit/${formId}`,
		method: 'PUT',
		data: query
	});
};
//删除
export const delTableData = (formId,dataIds) => {
	return request({
		url: `/form/tool/formdata/delete/${formId}/${dataIds}`,
		method: 'DELETE',
		data: {}
	});
};

//上传文件
export const uploadFile = (query,fun) => {
	return request({
		url: `/file/minio/uploadFileId`,
		method: 'POST',
		data: query,
        onUploadProgress: fun
	});
};

//删除文件
export const delFile = (ids) => {
	return request({
		url: `/file/minio/deleteFiles?dataIds=${ids}`,
		method: 'get'
	});
};

//查询文件
export const getFile = (query) => {
	return request({
		url: `/file/minio/listFiles`,
		method: 'POST',
		data: query
	});
};

//导入数据
export const impdatas = (formId,query,fun) => {
	return request({
		url: `/form/tool/formdata/impdatas/${formId}`,
		method: 'POST',
		data: query,
        onUploadProgress: fun
	});
};

//下载文件
export const dowFiles = (query) => {
	return request({
		url: `/form/tool/equi/dowFiles`,
		method: 'get',
		params: query
	});
};



//车辆,生产检维修表格查询
export const getinquireForm = (query) => {
	return request({
		url: `/form/tool/maintenance/inquireForm`,
		method: 'get',
		params: query
	});
};

///tool/planDay/deleteDayPlan  删除日计划记录

export const deleteDayPlan = (query) => {
	return request({
		url: `/form/tool/planDay/deleteDayPlan`,
		method: 'POST',
		data: query
	});
};

//计量设备台账编辑
export const updateFormDateByView = (query) => {
	return request({
		url: `/form/tool/equi/updateFormDateByView`,
		method: 'POST',
		data: query
	});
};
//计量设备台账删除
export const deleteFormData = (query) => {
	return request({
		url: `/form/tool/equi/deleteFormData`,
		method: 'POST',
		data: query
	});
};
//计量设备台账查询
export const getDataByView = (query,tableParams) => {
	return request({
		url: `/form/tool/equi/getDataByView?pageNum=${tableParams.pageNum}&pageSize=${tableParams.pageSize}`,
		method: 'POST',
		data: query
	});
};
//计量设备台账导出
export const exportStandingBook = (query) => {
	return request({
		url: `/form/tool/equi/exportStandingBook`,
		method: 'POST',
		data: query
	});
};
export const exportFile = (query,data,fun) => {
	return request({
		url: `/form/tool/formdata/expdata/${query.formId}/${query.userId}`,
		method: 'get',
		params: data,
        responseType: 'blob',
        onUploadProgress: fun
	});
};
