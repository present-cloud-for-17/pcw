import request from '../shared/components/request';

export const fetchData = query => {
    return request({
        url: './role.json',
        //url: '/api/user/findAll.do',
        
        method: 'get',
        params: query
    });
};