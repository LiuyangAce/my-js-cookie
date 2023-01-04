const defaultConverter =  {
  encode: function (text) {
    // return text.replace(ASCII_HEX_REGEXP, encodeURIComponent)
    return encodeURIComponent(text)
  },
  decode: function(text) {
    // return text.replace(ASCII_HEX_REGEXP, decodeURIComponent)
    return decodeURIComponent(text)
  }
}

const defaultAttributes = {
  path: '/'
}

export {
  defaultConverter,
  defaultAttributes
}