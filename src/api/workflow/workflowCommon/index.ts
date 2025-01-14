import { showFailToast } from 'vant'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'

export default {
  routerJump(routerJumpVo: RouterJumpVo, proxy: any, closePage: boolean = true) {
    if (routerJumpVo.wfNodeConfigVo && routerJumpVo.wfNodeConfigVo.formType === 'static' && routerJumpVo.wfNodeConfigVo.wfFormManageVo) {
      proxy.$router.push({
        path: `${routerJumpVo.wfNodeConfigVo.wfFormManageVo.router}`,
        query: {
          id: routerJumpVo.businessKey,
          wfStatus: routerJumpVo.businessStatus,
          type: routerJumpVo.type,
          taskId: routerJumpVo.taskId,
          processInstanceId: routerJumpVo.processInstanceId,
        },
      })
    }
    else if (routerJumpVo.wfNodeConfigVo && routerJumpVo.wfNodeConfigVo.formType === 'dynamic' && routerJumpVo.wfNodeConfigVo.wfFormManageVo) {
      proxy.$router.push({
        path: `${routerJumpVo.wfNodeConfigVo.wfFormManageVo.router}`,
        query: {
          id: routerJumpVo.businessKey,
          wfStatus: routerJumpVo.businessStatus,
          type: routerJumpVo.type,
          taskId: routerJumpVo.taskId,
          processInstanceId: routerJumpVo.processInstanceId,
        },
      })
    }
    else {
      showFailToast('请到模型配置菜单！')
    }
  },
}
