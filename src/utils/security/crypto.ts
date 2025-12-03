import CryptoJS from 'crypto-js'

// 随机生成 32位 的字符串
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// 随机生成 aes 密钥
export function generateAesKey() {
  return CryptoJS.enc.Utf8.parse(generateRandomString())
}

// 加密 base64
export function encryptBase64(str: CryptoJS.lib.WordArray) {
  return CryptoJS.enc.Base64.stringify(str)
}

// 使用密钥对数据进行加密
export function encryptWithAes(message: string, aesKey: CryptoJS.lib.WordArray) {
  const encrypted = CryptoJS.AES.encrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}
