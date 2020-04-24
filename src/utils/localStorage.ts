/**
 * localStorage 操作
 */
const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = localStorage.getItem(key)
    return value === 'undefined' ? undefined : JSON.parse(value as string)
  },
  clear() {
    localStorage.clear()
  },
}

export default storage
