import request from '../shared/components/request';
import qs from 'qs';

export const fetchStuData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/person/findAll.do',
        method: 'get',
        params: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyStuData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/person/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddStuData = (query) => {
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

export const DelStuData = (query) => {
    return request({
        //url:'/api/person/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/person/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchStuData = (query) => {
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


