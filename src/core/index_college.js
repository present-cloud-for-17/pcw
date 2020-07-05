import request from '../shared/components/request';
import qs from 'qs';

export const fetchCollData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/school/classify.do',
        method: 'get',
        params: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyCollData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/school/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddCollData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/school/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelCollData = (query) => {
    return request({
        //url:'/api/school/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/school/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchCollData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/school/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};


