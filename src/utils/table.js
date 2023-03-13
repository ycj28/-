// 获取表格数据
export function getData (root, url, params) {
   if (params === undefined) {
      params = { page: 1, size: 10 }
   }
   root.service.get(url, { params: params || {} })
      .then(res => {
         if (res.data.status === 200) {
            root.tableData = res.data.data
            root.total = res.data.total
         }
      })
      .catch(err => {
         throw err
      })
}


// 新增和修改方法的封装
export function changeInfo (root, method, url, data, callback) {
   root.service[method](url, data)
      .then(res => {
         if (res.data.status === 200) {
            callback(root, url)
            root.dialogFormVisible = false
            root.$refs['form'].resetFields()
            root.$message({ type: 'success', message: res.data.message })
         }
      })
      .catch(err => {
         throw err
      })
}

// 删除方法封装
export function delData (root, url, id, callFun) {
   root.$alert('你确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      callback: () => {
         root.service.delete(`${url}/${id}`).then(res => {
            if (res.data.status === 200) {
               callFun(root, url)
               root.$message({ message: res.data.message, type: 'success' })
            }
         })
      }
   })
      .catch(err => {
         throw err
      })
}

// 修改方法封装
export function modifyData (root, url, id, callFun) {
   root.$alert('你确定要执行此操作吗？', '提示', {
      confirmButtonText: '确定',
      callback: () => {
         root.service.put(`${url}/${id}`).then(res => {
            if (res.data.status === 200) {
               callFun(root, root.url)
               root.$message({ message: res.data.message, type: 'success' })
            }
         })
      }
   })
      .catch(err => {
         throw err
      })
}

// 作业列表获取表格数据方法封装
export const getTableData = (root, url, params) => {
   root.service.get(url, { params: params || {} })
      .then(res => {
         if (res.data.status === 200) {
            root.tableData = res.data.data
            root.total = res.data.total
            root.loading = false
         }
      })
      .catch(err => {
         throw err
      })
}

// 作业列表获取表格数据方法封装
export const getContent = (root, url, id) => {
   root.service.get(`${url}/${id}`)
      .then(res => {
         console.log(res);
         if (res.data.status === 200) {
            if (res.data.data === "") {
               root.content = " 内容为空 "
               root.loading = false
            } else {
               root.content = res.data.data
               root.loading = false
            }
         }
      })
      .catch(err => {
         throw err
      })
}

// 作业列表获取表格数据方法封装
// export function getTableData (url, params) {
//    return service.get(url, {
//       params
//    })
// }