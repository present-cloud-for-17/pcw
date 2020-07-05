import request from '../shared/components/request';
import qs from 'qs';

export const fetchUserData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/user/findAll.do',
        method: 'get',
        params: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyUserData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/user/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddUserData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/user/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddUserPData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/person/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelUserData = (query) => {
    return request({
        //url:'/api/user/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/user/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchUserData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/user/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchUserPData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/person/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};
