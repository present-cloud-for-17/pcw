import request from '../shared/components/request';

export const fetchRoleData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/role/selectRolePermission.do',
        method: 'get',
        data: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const fetchRolePData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/rolePermission/findAll.do',
        method: 'get',
        data: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyRoleData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/rolePermission/updateByrIdAndpId.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddRoleData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/role/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelRoleData = (query) => {
    return request({
        //url:'/api/role/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/role/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};