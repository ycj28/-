// 用户名匹配
export function nameRule (rule, value, callback) {
   // 请输入4-10位昵称
   let reg = /(^[a-zA-Z0-9]{4,10}$)/
   if (value === '') {
      callback(new Error('请输入用户名'))
   } else if (!reg.test(value)) {
      callback(new Error('请输入4-10位用户名'))
   } else {
      callback()
   }
}
// 密码正则匹配
export function pwdRule (rule, value, callback) {
   // 6-12位密码需要包含大小写字母以及特殊符号
   let pwd = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?. ])\S*$/
   if (value === '') {
      callback(new Error('请输入密码'))
   } else if (!pwd.test(value)) {
      callback(new Error('6-12位密码需要包含大小写字母、数字和特殊符号'))
   } else {
      callback()
   }
}


// 昵称匹配
export function nickRule (rule, value, callback) {
   // 请输入4-10位昵称
   let reg = /^(?:[\u4e00-\u9fa5·]{2,16})$/
   if (value === '') {
      callback(new Error('请输入中文昵称'))
   } else if (!reg.test(value)) {
      callback(new Error('请输入长度2-16中文昵称'))
   } else {
      callback()
   }
}

// 手机号码匹配
export function phone (rule, value, callback) {
   // 请输入4-10位昵称
   let reg = /^(?:(?:\+|00)86)?1\d{10}$/
   if (value === '') {
      callback(new Error('请输入手机号码'))
   } else if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号码'))
   } else {
      callback()
   }
}



// 手机号码匹配
export function age (rule, value, callback) {
   // 请输入4-10位昵称
   let reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
   if (value === '') {
      callback(new Error('请输入年龄'))
   } else if (!reg.test(value)) {
      callback(new Error('请输入年龄'))
   } else {
      callback()
   }
}

// 姓名匹配
export function name (rule, value, callback) {
   let reg = /^(?:[\u4e00-\u9fa5·]{2,20})$/
   if (value === '') {
      callback(new Error('请输入名字'))
   } else if (!reg.test(value)) {
      callback(new Error('请输入正确的名字'))
   } else {
      callback()
   }
}