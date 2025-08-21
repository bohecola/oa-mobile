import * as dd from 'dingtalk-jsapi'
import { getDictsNoAuth } from '@/api/system/dict/data'
import { dingTalkSign } from '@/api/comm'
import modal from '@/plugins/modal'

// 从服务端获取钉钉配置
async function getDingTalkConfig() {
  const url = encodeURIComponent(location.href)

  const { data } = await getDictsNoAuth('sys_dingtalk')

  const { data: _config } = await dingTalkSign({ url })

  const { agentId, corpId } = Object.fromEntries(data.map(e => [e.dictLabel, e.dictValue]))

  return {
    corpId,
    agentId,
    timeStamp: _config.timestamp,
    nonceStr: _config.nonceStr,
    signature: _config.signature,
  }
}

const isDdReady = ref(false)

// 配置钉钉
async function setupDingTalk(): Promise<boolean> {
  if (dd.env.platform === 'notInDingTalk') {
    return
  }

  if (isDdReady.value) {
    return
  }

  modal.loading('正在配置 DingTalk')
  const { corpId, agentId, timeStamp, nonceStr, signature } = await getDingTalkConfig()

  // 钉钉鉴权
  dd.config({
    agentId,
    corpId,
    timeStamp,
    nonceStr,
    signature,
    type: 0,
    jsApiList: [
      'getLocation',
    ],
  })

  return new Promise((resolve, reject) => {
    dd.ready(() => {
      modal.closeLoading()

      isDdReady.value = true
      resolve(true)
    })

    dd.error((error) => {
      modal.closeLoading()
      modal.alert(error?.errorMessage)
      reject(error)
    })
  })
}

export {
  dd,
  setupDingTalk,
}
