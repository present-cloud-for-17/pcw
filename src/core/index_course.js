import request from '../shared/components/request';

export const fetchCourseData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/course/findAll.do',
        method: 'get',
        params: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const fetchPersonData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/personCourse/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const fetchCoursePData = query => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/personCourse/findAll.do',
        method: 'get',
        params: query,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const ModifyCourseData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/course/updateByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddCourseData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/course/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const DelCourseData = (query) => {
    return request({
        //url:'/api/user/deleteByPrimaryKey.do',
        url: 'http://175.24.88.62:8080/pcs/course/deleteByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const SearchCourseData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/course/selectByPrimaryKey.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};
