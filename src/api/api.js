// 项目钟我们大多数时候都会把对应的接口请求封装成api来调用
import service from '../service.js'
import qs from 'qs'

// 登录接口
export function login (data) {
   return service({
      method: 'post',
      url: '/login',
      data
   })
}

// 注册接口
export function register (data) {
   return service({
      method: 'post',
      url: '/register',
      data
   })
}

// 老人列表查询接口
export function getElder (params) {
   return service({
      method: 'get',
      url: '/elder',
      params
   })
}

// 老人列表新增接口
export function elder (type, data) {
   data = qs.stringify(data)
   let obj = {
      method: type, url: '/elder', data
   }
   console.log(obj)
   return service(
      obj
   )
}

// 老人列表删除接口
export function elderDel (id) {
   return service({
      method: 'delete',
      url: `/elder/${id}`
   })
}

// 信息列表新增接口
// export function info (data) {
//    data = qs.stringify(data)
//    return service({
//       method: "post",
//       url: "/info",
//       data
//    })
// }


// 亲属列表新增和修改接口
export function relative (type, data) {
   data = qs.stringify(data)
   let obj = {
      method: type, url: '/relative', data
   }
   console.log(obj)
   return service(
      obj
   )
}

// 亲属列表查询接口
export function getRelativeInfo () {
   return service({
      method: "get",
      url: "/relative"
   })
}

// 信息列表删除接口
export function relativeDel (id) {
   return service({
      method: 'delete',
      url: `/relative/${id}`
   })
}

// 数据概览接口
export function dataview () {
   return service({
      method: 'get',
      url: '/dataview'
   })
}

// 旅游地图接口
export function travel () {
   return service({
      method: 'get',
      url: 'travel'
   })
}


// 用户个人信息接口
export function personal () {
   return service({
      method: 'get',
      url: '/users',
   })
}

// 用户个人信息修改接口
export function changePersonal (data) {
   return service({
      method: 'put',
      url: '/users',
      data
   })
}