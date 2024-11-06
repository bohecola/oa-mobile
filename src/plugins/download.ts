import axios from 'axios'
import FileSaver from 'file-saver'
import type { ToastWrapperInstance } from 'vant'
import { showFailToast, showLoadingToast } from 'vant'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/ruoyi'
import { globalHeaders } from '@/service/request'
import { useGlobSettings } from '@/hooks'

const { apiUrlPrefix } = useGlobSettings()

let downloadLoadingInstance: ToastWrapperInstance
export default {
  async oss(ossId: string | number) {
    const url = `${apiUrlPrefix}/resource/oss/download/${ossId}`
    // 开启加载
    downloadLoadingInstance = showLoadingToast({ duration: 0, message: '正在下载数据，请稍候', overlay: true })
    try {
      const res = await axios({
        method: 'get',
        url,
        responseType: 'blob',
        headers: globalHeaders(),
      })
      const isBlob = blobValidate(res.data)
      if (isBlob) {
        const blob = new Blob([res.data], { type: 'application/octet-stream' })
        FileSaver.saveAs(blob, decodeURIComponent(res.headers['download-filename'] as string))
      }
      else {
        this.printErrMsg(res.data)
      }
      downloadLoadingInstance.close()
    }
    catch (r) {
      console.error(r)
      showFailToast('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close()
    }
  },
  async zip(url: string, name: string) {
    url = apiUrlPrefix + url
    downloadLoadingInstance = showLoadingToast({ duration: 0, message: '正在下载数据，请稍候' })
    try {
      const res = await axios({
        method: 'get',
        url,
        responseType: 'blob',
        headers: globalHeaders(),
      })
      const isBlob = blobValidate(res.data)
      if (isBlob) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        FileSaver.saveAs(blob, name)
      }
      else {
        this.printErrMsg(res.data)
      }
      downloadLoadingInstance.close()
    }
    catch (r) {
      console.error(r)
      showFailToast('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close()
    }
  },
  async printErrMsg(data: any) {
    const resText = await data.text()
    const rspObj = JSON.parse(resText)
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default
    showFailToast(errMsg)
  },
}
