import request from '../shared/components/request';

export const fetchData = query => {
    return request({
        //url:'./table.json',
        url: '/api/user/findAll.do',
        method: 'get',
        params: query
    });
};
