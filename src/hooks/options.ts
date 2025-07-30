import { isEmpty } from 'lodash-es'
import type { CarInfoQuery } from '@/api/oa/car/carInfo/types'
import type { CarFuelCardQuery } from '@/api/oa/car/carFuelCard/types'
import type { DailyFeeQuery } from '@/api/oa/daily/fee/types'
import { listCarInfo } from '@/api/oa/car/carInfo'
import { listCarFuelCard } from '@/api/oa/car/carFuelCard'
import { getUserDept } from '@/api/system/dept'
import { listDailyFee } from '@/api/oa/daily/fee'
import { useStore } from '@/store'

interface Config<T = any> {
  initQuery?: T
  initFetch?: boolean
}

// 车牌号选项
export function useCarNumberOptions(config: Config<CarInfoQuery> = {}) {
  const { initQuery, initFetch = true } = config

  const options = ref<DictDataOption[]>([])

  async function fetch(query: CarInfoQuery) {
    options.value = []

    await listCarInfo(query).then(({ rows }) => {
      options.value = rows.map((e) => {
        return {
          label: e.number,
          value: e.number,
          ...e,
        }
      })
    })
  }

  if (initFetch) {
    fetch(initQuery)
  }

  return {
    options,
    fetch,
  }
}

// 油卡卡号选项
export function useCardNumberOptions(config: Config<CarFuelCardQuery> = {}) {
  const { initQuery, initFetch = true } = config

  const options = ref<DictDataOption[]>([])

  async function fetch(query: CarFuelCardQuery) {
    options.value = []

    await listCarFuelCard(query).then(({ rows }) => {
      options.value = rows.map((e) => {
        return {
          label: e.cardNumber,
          value: e.cardNumber,
          ...e,
        }
      })
    })
  }

  if (initFetch) {
    fetch(initQuery)
  }

  return {
    options,
    fetch,
  }
}

// 用户所有部门
export function useUserDeptOptions(options: Config = {}) {
  const { initQuery, initFetch = true } = options

  const { user } = useStore()

  const deptOptions = ref<DictDataOption[]>([])

  // 是否只读 => 当前用户只存在于一个部门中
  const deptReadonly = computed(() => {
    if (isEmpty(deptOptions.value)) {
      return true
    }

    const [deptObj] = deptOptions.value
    const isOne = deptOptions.value.length === 1
    const isSame = deptObj?.value === String(user.info.deptId)

    return isOne && isSame
  })

  async function fetch(initQuery?: string | number) {
    const { data } = await getUserDept(initQuery)

    deptOptions.value = data.map((e) => {
      return {
        label: e.deptName,
        value: String(e.deptId),
      }
    })
  }

  if (initFetch) {
    fetch(initQuery ?? user.info.userId)
  }

  return {
    fetch,
    deptOptions,
    deptReadonly,
  }
}

// 日常费用流程
export function useDailyFeeOptions(config: Config<DailyFeeQuery> = {}) {
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const { initQuery, initFetch = true } = config

  const options = ref<DictDataOption[]>([])

  async function fetch(query: DailyFeeQuery) {
    options.value = []

    await listDailyFee(query).then(({ rows }) => {
      options.value = rows.map((e) => {
        return {
          label: `${e.createByName}-${proxy?.parseTime(e.createTime, '{y}-{m}-{d}')}（${proxy?.formatCurrency(e.amount)}）`,
          value: e.id,
          ...e,
        }
      })
    })
  }

  if (initFetch) {
    fetch(initQuery)
  }

  return {
    options,
    fetch,
  }
}
