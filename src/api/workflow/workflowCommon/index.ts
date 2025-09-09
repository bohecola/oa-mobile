import { showFailToast } from 'vant'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'

export default {
  routerJump(routerJumpVo: RouterJumpVo, proxy: any, closePage: boolean = true, openNewWindowTab: boolean = false) {
    const path = `${routerJumpVo.wfNodeConfigVo.wfFormManageVo.router}`

    const query = {
      id: routerJumpVo.businessKey,
      wfStatus: routerJumpVo.businessStatus,
      type: routerJumpVo.type,
      taskId: routerJumpVo.taskId,
      processInstanceId: routerJumpVo.processInstanceId,
    }

    const url = `${location.origin}${path}?${new URLSearchParams(query).toString()}`

    if (routerJumpVo.wfNodeConfigVo && routerJumpVo.wfNodeConfigVo.wfFormManageVo) {
      if (routerJumpVo.wfNodeConfigVo.formType === 'static' || routerJumpVo.wfNodeConfigVo.formType === 'dynamic') {
        if (openNewWindowTab) {
          return window.open(url, '_blank')
        }

        proxy.$router.push({
          path,
          query,
        })
      }
    }
    else {
      showFailToast('请到模型配置菜单！')
    }
  },
}
