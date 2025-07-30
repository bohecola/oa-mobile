export function useFormHelper() {
  const route = useRoute()

  const isAdd = route.path.includes('/new')
  const isEdit = route.path.includes('/edit')

  return {
    isAdd,
    isEdit,
  }
}
