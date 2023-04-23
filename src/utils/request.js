import axios from 'axios';

import { ElLoading, ElMessage } from 'element-plus';
import { getToken } from '@utils/auth';

import { useInfo } from '@store/index.js';

let loading;
//正在请求的数量
let requestCount = 0;
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
    }
    requestCount++;
};
//隐藏loading
const hideLoading = () => {
    requestCount--;
    if (requestCount == 0) {
        loading.close();
    }
};

// axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const baseUrl=import.meta.env.DEV?'':window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
// const baseUrl =window.location.hostname=='127.0.0.1'?'https://api.github.com': window.location.origin

const service = axios.create({
    baseURL: '/prod-api',
    timeout: 60000,
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        showLoading();
        // 在发送请求之前做些什么
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false;

        if (getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
        }

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// // 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        hideLoading();
        // 对响应数据做点什么
        // 未设置状态码则默认成功状态
        const code = response.data.code || 200;
        // 获取错误信息
        const msg = response.data.msg;

        if (code === 401) {
            ElMessage.error(msg);
            let store = useInfo();
            store.loginOut();
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
        } else {
            return response.data;
        }
    },
    function (error) {
		let msg='';
        //响应错误
        if (error.response && error.response.status) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    message = '请求错误';
                    break;
                case 401:
                    message = '请求错误';
                    break;
                case 404:
                    message = '请求地址出错';
                    break;
                case 408:
                    message = '请求超时';
                    break;
                case 500:
                    message = '服务器内部错误!';
                    break;
                case 501:
                    message = '服务未实现!';
                    break;
                case 502:
                    message = '网关错误!';
                    break;
                case 503:
                    message = '服务不可用!';
                    break;
                case 504:
                    message = '网关超时!';
                    break;
                case 505:
                    message = 'HTTP版本不受支持';
                    break;
                default:
                    message = '请求失败';
            }
            ElMessage.error(message);
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default service;
