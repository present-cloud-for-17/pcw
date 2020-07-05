import request from '../shared/components/request';

  export const UserLogin = (params) => {
    return request({
        //url: '/api/userVerification/login.do',
        url: 'http://175.24.88.62:8080/pcs/userVerification/login.do',
        method: 'post',
        data: params,
        emulateJSON: true
        });
  };

  export const UserRegister = (params) => {
    return request({
        //url: '/api/userVerification/login.do',
        url: 'http://175.24.88.62:8080/pcs/user/register.do',
        method: 'post',
        data: params,
        emulateJSON: true
        });
  };

//   export const UserInfoRegister = (params) => {
//     return request({
//         //url: '/api/userVerification/login.do',
//         url: 'http://175.24.88.62:8080/pcs/person/updateByPrimaryKey.do',
//         method: 'post',
//         data: params,
//         emulateJSON: true
//         });
//   };

  export const fetchData = query => {
      return request({
         url: 'http://175.24.88.62:8080/pcs/userVerification/findAll.do',  
         method: 'get',
         params: query
      });
  };

  export const ModifyLoginData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/userVerification/updatePassword.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};

export const AddLoginData = (query) => {
    return request({
        url: 'http://175.24.88.62:8080/pcs/userVerification/insert.do',
        method: 'post',
        data: query,
        emulateJSON: true,
        headers:{
            'token':localStorage['ms_token']
        }
    });
};