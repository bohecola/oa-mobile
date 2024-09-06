import JSEncrypt from 'jsencrypt'
import { useGlobSettings } from '@/hooks/settings'
// 密钥对生成 http://web.chacuo.net/netrsakeypair

const { appRsaPublicKey } = useGlobSettings()

// 前端不建议存放私钥 不建议解密数据 因为都是透明的意义不大
const privateKey = '**********'

// 加密
export function encrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(appRsaPublicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
