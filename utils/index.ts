const saveFile = (url: string, name: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

const createBlob = (str: any) => {
  const string = typeof str === 'object' ? JSON.stringify(str) : str
  if (string === null) return ''
  const blob = new Blob([string], {
    type: 'application/octet-stream'
  })
  return window.URL.createObjectURL(blob)
}
export { saveFile, createBlob }
