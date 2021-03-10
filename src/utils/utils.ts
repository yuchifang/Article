const RA = require('ramda');
// export const arrCompileTagsArr = RA.reduce((articleAccumulator, currentArticle) => [...articleAccumulator, ...currentArticle.tags], [])
// export const arrCompileRepeatObj = RA.reduce((tagAccumulator, currentTag) => {
//     tagAccumulator[currentTag] = tagAccumulator[currentTag] ? tagAccumulator[currentTag] + 1 : 1
//     return tagAccumulator
// }, {})

export const pipe = (...fns: any[]) => (x: any) => fns.reduce((value, fn) => fn(value), x)
export const stringToLower = (str: string) => str.toLowerCase()
export const stringToUpper = (str: string) => str.toUpperCase()
export const _log = (variable: any) => { console.log("log", variable); return variable }
export const packTagsString = (arr: any[]) => arr.reduce((totalTagsString, currentArticle) =>
    [...totalTagsString, ...currentArticle.tags], [])
export const countRepeatTag = (arr: any[]) => arr.reduce((tagCount, currentTag) => {
    tagCount[currentTag] = tagCount[currentTag] ? tagCount[currentTag] + 1 : 1
    return tagCount
}, {})
export const _sort = (f: any) => (arr: []) => arr.sort(f)
export const _map = (f: any) => (arr: []) => arr.map(f)
export const objKeysToArr = (obj: any) => Object.keys(obj)
export const objToArr = (obj: any) => {
    return Object.keys(obj).map(key => ({ "name": key, "value": obj[key] }))
}
export const _slice = (x: number, y: number) => (arr: []) => arr.slice(x, y)
export const _filter = (f: any) => (arr: []) => arr.filter(f)
export function timestampToDate(timestamp: Date) {
    let timestampNumber = Number(timestamp)
    if (timestamp.toString().length === 10) timestampNumber = timestampNumber * 1000
    if (timestamp.toString().length === 13) timestampNumber = timestampNumber
    const Time = new Date(timestampNumber)
    const getYear = Time.getFullYear()
    const getMonth = Time.getMonth() + 1 < 10 ? '0' + (Time.getMonth() + 1) : Time.getMonth() + 1
    const getDateString = Time.getDate() < 10 ? '0' + Time.getDate() : Time.getDate()
    return `${getYear}-${getMonth}-${getDateString}`
}
