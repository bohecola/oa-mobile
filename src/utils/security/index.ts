import { encryptBase64, encryptWithAes, generateAesKey } from './crypto'
import { encrypt } from './encrypt'

export function useMixedEncrypt() {
  // 生成一个 AES 密钥
  const aesKey = generateAesKey()

  // 加密 AES 密钥
  const encryptedAesKey = encrypt(encryptBase64(aesKey))

  // AES 加密数据
  function AES(message: string) {
    return encryptWithAes(message, aesKey)
  }

  return {
    aesKey,
    encryptedAesKey,
    AES,
  }
}

export * from './crypto'
export * from './encrypt'
