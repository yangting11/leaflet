import request from '../utils/request';

const AuthHeaders = {
    Authorization: localStorage.getItem('user')
}

//登录
export async function accountLogin(params) {
    return request('/api/user/login', {
        method: 'POST',
        body: params
    })
}