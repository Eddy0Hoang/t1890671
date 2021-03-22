export function parseQuery(query:string): {[key:string]: string} {
  let index = query.indexOf('?')
  if (index > -1) {
    let paramPart = decodeURIComponent(query.substr(index + 1)).split('&')
    let obj: {[key:string]: string} = {}
    for (let part of paramPart) {
      let kv: string[] = part.split('=')
      if (kv.length === 2) {
        obj[kv[0]] = kv[1]
      }
    }
    return obj
  } else {
    return {}
  }
}

export function getImage(file: string) {
  return 'http://localhost:3090/res/img/' + file + '.png'
}