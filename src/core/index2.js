import request from '../shared/components/request';

export const fetchData = query => {
    return request({
        url: './level.json',
        method: 'get',
        params: query
    });
};
