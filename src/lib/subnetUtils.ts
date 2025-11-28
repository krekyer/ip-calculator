export function isIpValid(ip: string): boolean {
  return (
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) &&
    ip.split('.').every((octet) => {
      const num = Number(octet)
      return num >= 0 && num <= 255
    })
  )
}

export function getNetworkAddress(ip: string, mask: string): string {
  const ipOctets = ip.split('.')
  const maskOctets = mask.split('.')
  const result = ipOctets.map((oct, i) => Number(oct) & Number(maskOctets[i]))
  return result.join('.')
}

export function getAddressesCount(mask: string): number {
  let binaryMask = ''
  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0')
  }
  const ones = binaryMask.split('').filter(b => b === '1').length
  const zeros = 32 - ones
  if (zeros === 0) return 1
  if (zeros === 1) return 2
  return Math.pow(2, zeros) - 2
}