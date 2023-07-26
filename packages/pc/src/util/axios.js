import axios from 'axios';


// 创建axios实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 1000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log('Request sent', config);
    return config;
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    console.log('Response received', response);
    return response;
  }
);

export default axiosInstance;
