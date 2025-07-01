export function parseDictConfig(dict: DictDataOption[]) {
  return Object.fromEntries(dict.map(e => [e.label, e.value]))
}

export function usePtmsProjectConfig() {
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 工程管理中心相关配置
  const { ptms_project_config } = toRefs(proxy.useDict('ptms_project_config'))

  const config = computed(getConfig)

  // 获取配置
  function getConfig() {
    // 字段：product_plan_task_scheme_day
    return parseDictConfig(ptms_project_config.value)
  }

  return {
    config,
    getConfig,
  }
}
