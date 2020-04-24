import request from '../shared/components/request';

export const fetchData = query => {
    return request({
        url: './unknown.json',
        method: 'get',
        params: query
    });
};
