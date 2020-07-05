import request from '../shared/components/request';
import qs from 'qs';

export const fetchDictData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionary/findAll.do',
        method: 'get',
        data: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const fetchDictDetaData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionaryDetail/findAll.do',
        method: 'get',
        data: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyDictData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionary/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyDictDeData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionaryDetail/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const fetchDictSubData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionaryDetail/selectBydId.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddDictData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionary/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddDictSubData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionaryDetail/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelDictData = (query) => {
    return request({
        //url:'/api/dictionary/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/dictionary/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelDictDeData = (query) => {
    return request({
        //url:'/api/dictionary/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/dictionaryDetail/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchDictData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/dictionary/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};


