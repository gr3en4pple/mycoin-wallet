import { createHash } from 'crypto'

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

const SHA256 = (data: any) => createHash('sha256').update(data).digest('hex')

const renderAddress = (addr: string) =>
  `${addr.slice(0, 4)}...${addr.slice(-4)}`
const renderTxHash = (txHash: string) =>
  `${txHash.slice(0, 8)}...${txHash.slice(-8)}`
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { saveFile, createBlob, renderAddress, SHA256, sleep, renderTxHash }
