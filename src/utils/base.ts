/* eslint-disable prefer-rest-params */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
// 日期格式化
export function parseTime(time: any, pattern?: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string' && /^\d+$/.test(time)) {
      time = Number.parseInt(time)
    }
    else if (typeof time === 'string') {
      time = time
        .replace(/-/g, '/')
        .replace('T', ' ')
        .replace(/\.\d{3}/g, '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: any } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(/\{([ymdhisa])+\}/g, (result: string, key: string) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
}

/**
 * 添加日期范围
 * @param params
 * @param dateRange
 * @param propName
 */
export function addDateRange(params: any, dateRange: any[], propName?: string) {
  const search = params
  search.params = typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params.beginTime = dateRange[0]
    search.params.endTime = dateRange[1]
  }
  else {
    search.params[`begin${propName}`] = dateRange[0]
    search.params[`end${propName}`] = dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel(datas: any, value: number | string) {
  if (value === undefined) {
    return ''
  }
  const actions: Array<string | number> = []
  Object.keys(datas).some((key) => {
    if (datas[key].value == `${value}`) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas: any, value: any, separator: any) {
  if (value === undefined || value.length === 0) {
    return ''
  }
  if (Array.isArray(value)) {
    value = value.join(',')
  }
  const actions: any[] = []
  const currentSeparator = undefined === separator ? ',' : separator
  const temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    let match = false
    Object.keys(datas).some((key) => {
      if (datas[key].value == `${temp[val]}`) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str: string) {
  if (arguments.length !== 0) {
    let flag = true
    let i = 1
    str = str.replace(/%s/g, function () {
      const arg = arguments[i++]
      if (typeof arg === 'undefined') {
        flag = false
        return ''
      }
      return arg
    })
    return flag ? str : ''
  }
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str: any) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

// 数据合并
export function mergeRecursive(source: any, target: any) {
  for (const p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      }
      else {
        source[p] = target[p]
      }
    }
    catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree<T>(data: any[], id?: string, parentId?: string, children?: string): T[] {
  const config: {
    id: string
    parentId: string
    childrenList: string
  } = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  const childrenListMap: any = {}
  const nodeIds: any = {}
  const tree: T[] = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }
  const adaptToChildrenList = (o: any) => {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  return result
}

// 返回项目路径
export function getNormalPath(p: string): string {
  if (p.length === 0 || !p || p === 'undefined') {
    return p
  }
  const res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

// 验证是否为blob格式
export function blobValidate(data: any) {
  return data.type !== 'application/json'
}

/**
 * 根据单位 格式化显示数据
 * @param numStr
 * @param unitStr
 */
export function formatUnitNum(numStr: any, unitStr: any) {
  if ((numStr == null || numStr == '' || typeof numStr == 'undefined') && (unitStr == null || unitStr == '' || typeof unitStr == 'undefined')) {
    return ''
  }
  let num
  if (numStr == null || numStr == '' || typeof numStr == 'undefined') {
    numStr = 0
  }
  // 先判断有没有单位，有的话判断是英文中文，如果没有的话保留两位小数
  if (unitStr) {
    if (isChinese(unitStr)) {
      if (unitStr === '套' || unitStr === '组' || unitStr === '只' || unitStr === '个' || unitStr == '台' || unitStr == '块' || unitStr == '件') {
        // 不保留
        num = Number(numStr)
        num = Math.floor(num)
      }
      else {
        // 保留两位
        num = Number(numStr).toFixed(2)
      }
    }
    else {
      const unit = unitStr.toLocaleLowerCase()
      if (unit === 'kw' || unit === 'w' || unit === 'kvar' || unit === 'kva' || unit === 'mva') {
        // 不保留
        num = Number(numStr)
        num = Math.floor(num)
      }
      else if (unitStr === 'mvar') {
        // 保留两位
        num = Number(numStr)
        num = Math.floor(num).toFixed(2)
      }
      else {
        // 保留两位
        num = Number(numStr).toFixed(2)
      }
    }
  }
  else {
    // 保留两位
    num = Number(numStr).toFixed(2)
  }
  return num
}

// 检验中文的方法
function isChinese(str: any) {
  const regex = /^[\u4E00-\u9FA5]+$/
  return regex.test(str)
}

export function formatterTableZore(row: any, column: any, cellValue: string) {
  // 如果cellValue可以用的话
  if (cellValue !== undefined) {
    return cellValue == '0' || cellValue == '0.0' || cellValue == '0.00' || cellValue == '0.000' ? '' : cellValue
  }
  else {
    return formatCellValue(row)
  }
}
function formatCellValue(value: any) {
  return value == '0' || value == '0.0' || value == '0.00' || value == '0.000' ? '' : value
}
