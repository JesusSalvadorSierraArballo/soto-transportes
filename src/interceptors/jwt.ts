import axios from "axios";
  

const axiosJWT = axios.create()
axiosJWT.interceptors.request.use(function (config) {
  console.log('object');
    const userInfo = localStorage.getItem('accessToken');
    if(!userInfo) {
      return Promise.reject()
    }

    const token = JSON.parse(userInfo).accessToken
    
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);


export default axiosJWT