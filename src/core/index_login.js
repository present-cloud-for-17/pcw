import request from '../shared/components/request';

  export const subData = (params) => {
      return request({
          //url: '/api/userVerification/login.do',
          url: 'http://175.24.88.62:8080/pcs/userVerification/login.do',
          method: 'post',
          data: params,
          emulateJSON: true
      });
  };

//  export const subData = query => {
//      return request({
//         url: '/api/user/findAll.do',  
//         method: 'get',
//         params: query
//      });
//  };