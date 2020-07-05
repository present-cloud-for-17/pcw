import request from '../shared/components/request';

export const fetchParData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/parameter/findAll.do',
        method: 'get',
        params: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyParData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/parameter/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddParData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/parameter/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelParData = (query) => {
    return request({
        //url:'/api/parameter/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/parameter/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchParData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/parameter/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};
