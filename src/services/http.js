import axios from 'axios';
import storage from '../utils/storage/storage';
import conf from '../config';


// request interceptor for headers
axios.interceptors.request.use(
    config => {  
        config.headers = conf.headers;
        config.headers["Authorization"] = "Bearer " + storage.get('token');
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// request interceptor for authorization
axios.interceptors.response.use(response => response, (error) => {
    try {
        if (!error.response) {
            return Promise.resolve(
                {
                    Message : 'Disconnected'
                }
            );
        }
        else if (error.response.status === 401 || error.response.status === 403) {
             return Promise.resolve(
                {
                    Message : 'UnAuthorized'
                }
            );
        }
        else if (error.response.status === 504 ) {
            return Promise.resolve(
               {
                   Message : 'ErrorTenant'
               }
           );
       } else {
           let message = error.response.data.Message[0].Value || error ;
            return Promise.resolve(
                {
                    data: {
                        Message: [{
                            Key: "", Value: message
                        }],
                        Succeded: false
                    }
                }
            );
        }
    }
    catch(e){

    }
    
});

export default{
    get : axios.get,
    post : axios.post,
}