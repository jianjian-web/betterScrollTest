/*上线环境和开发环境区别处理*/
/*
*baseUrl=>domain主机名
*
*
*
*/
let baseUrl ='';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.61.2:3000'
} else if (process.env.NODE_ENV === 'production') {
  // baseUrl = ''
}

export {
  baseUrl
}
