import type { ToastWrapperInstance } from 'vant'
import { showConfirmDialog, showDialog, showFailToast, showLoadingToast, showNotify, showSuccessToast, showToast } from 'vant'
import type { DialogAction } from 'vant/lib/dialog/types'

let loadingInstance: ToastWrapperInstance
export default {
  // 消息提示
  msg(content: any) {
    showToast(content)
  },
  // 错误消息
  msgError(content: any) {
    showFailToast(content)
  },
  // 成功消息
  msgSuccess(content: any) {
    showSuccessToast(content)
  },
  // 警告消息
  msgWarning(content: any) {
    // TODO
    showToast(content)
  },
  // 弹出提示
  alert(content: any) {
    showDialog({ title: '系统提示', message: content })
  },
  // 错误提示
  alertError(content: any) {
    showDialog({ title: '错误', message: content })
  },
  // 成功提示
  alertSuccess(content: any) {
    showDialog({ title: '成功', message: content })
  },
  // 警告提示
  alertWarning(content: any) {
    showDialog({ title: '警告', message: content })
  },
  // 通知提示
  notify(content: any) {
    showNotify({ type: 'primary', message: content })
  },
  // 错误通知
  notifyError(content: any) {
    showNotify({ type: 'danger', message: content })
  },
  // 成功通知
  notifySuccess(content: any) {
    showNotify({ type: 'success', message: content })
  },
  // 警告通知
  notifyWarning(content: any) {
    showNotify({ type: 'warning', message: content })
  },
  // 确认窗体
  confirm(content: any): Promise<DialogAction | undefined> {
    return showConfirmDialog({
      title: '系统提示',
      message: content,
    })
  },
  // // 提交内容
  // prompt(content: any) {
  //   return ElMessageBox.prompt(content, '系统提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   })
  // },
  // 打开遮罩层
  loading(content?: string) {
    loadingInstance = showLoadingToast({
      duration: 0,
      message: content ?? '加载中',
      forbidClick: true,
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close()
  },
}
