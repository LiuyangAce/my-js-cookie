/*
 * @Author: ly
 * @Date: 2022-09-29 10:21:53
 * @LastEditors: ly
 * @LastEditTime: 2022-12-12 17:40:15
 * @Description: my-js-cookie 核心文件
 */
import {
  defaultConverter,
  defaultAttributes,
} from "./initialConfigurationCenter.js"

function init() {
  function get(key) {
    const cookiePairs = document.cookie ? document.cookie.split(";") : []

    let mapPairs = cookiePairs.map((item) => {
      let [key, ...oldValue] = item.split("=")
      let deValue = defaultConverter.decode(oldValue.join("="))

      return [key, deValue]
    })
    // 构建map 返回对于value
    let map = new Map(mapPairs)
    return map.get(key) || null
  }

  function set(key, value, attributes = defaultAttributes) {
    const TWENTY_FOUR_HOURS = 864e5
    // 整合默认参数和传入参数 注意顺序 我们需要传入的覆盖默认的
    attributes = { ...defaultAttributes, ...attributes }

    // 天数转化为时间戳
    if (attributes.expires) {
      attributes.expires = new Date(
        Date.now() + attributes.expires * TWENTY_FOUR_HOURS
      ).toUTCString()
    }

    // 整合一下所有的attributes
    let attributesStr = Object.entries(attributes).reduce(
      (preValue, curValue) => {
        const [attrKey, ...attrValue] = curValue
        preValue += `;${attrKey}=${attrValue}`
        return preValue
      },
      ""
    )
    console.log(`${key}=${value}${attributesStr}`)
    return (document.cookie = `${key}=${defaultConverter.encode(
      value
    )}${attributesStr}`)
  }

  function del(key, attributes = defaultAttributes) {
    set(key, get(key), { ...attributes, expires: -1 })
    // set(key, '', { ...attributes, expires: -1 }) 或者这样
  }

  function withConverter(customConverter) {
    return init({ ...this.converter, ...customConverter }, this.attributes)
  }

  function withAttributes(customAttributes) {
    console.log("withAttributes:")
    // console.log(customAttributes, this.attributes, this)
    return init(this.converter, { ...this.attributes, ...customAttributes })
  }

  return Object.create(
    { get, set, del, withConverter, withAttributes },
    {
      attributes: {value: Object.freeze(defaultAttributes)}, // 冻结
      converter: {value: Object.freeze(defaultConverter)}
    }
  )
}

export default init(defaultConverter, defaultAttributes)
