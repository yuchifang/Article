const RA = require('ramda');
// export const arrCompileTagsArr = RA.reduce((articleAccumulator, currentArticle) => [...articleAccumulator, ...currentArticle.tags], [])
// export const arrCompileRepeatObj = RA.reduce((tagAccumulator, currentTag) => {
//     tagAccumulator[currentTag] = tagAccumulator[currentTag] ? tagAccumulator[currentTag] + 1 : 1
//     return tagAccumulator
// }, {})

export const pipe = (...fns) => x => fns.reduce((value, fn) => fn(value), x)
export const stringToLower = str => str.toLowerCase()
export const stringToUpper = str => str.toUpperCase()
export const _log = variable => { console.log("log", variable); return variable }
export const packTagsString = (arr) => arr.reduce((totalTagsString, currentArticle) =>
    [...totalTagsString, ...currentArticle.tags], [])
export const countRepeatTag = arr => arr.reduce((tagCount, currentTag) => {
    tagCount[currentTag] = tagCount[currentTag] ? tagCount[currentTag] + 1 : 1
    return tagCount
}, {})
export const _sort = (f) => (arr) => arr.sort(f)
export const _map = (f) => (arr) => arr.map(f)
export const objKeysToArr = obj => Object.keys(obj)
export const objToArr = (obj) => {
    return Object.keys(obj).map(key => ({ "name": key, "value": obj[key] }))
}
export const _slice = (x, y) => (arr) => arr.slice(x, y)
export const _filter = (f) => (arr) => arr.filter(f)
export function timestampToDate(timestamp) {
    let timestampNumber = Number(timestamp)
    if (timestamp.toString().length === 10) timestampNumber = timestampNumber * 1000
    if (timestamp.toString().length === 13) timestampNumber = timestampNumber
    const Time = new Date(timestampNumber)
    const getYear = Time.getFullYear()
    const getMonth = Time.getMonth() + 1 < 10 ? '0' + (Time.getMonth() + 1) : Time.getMonth() + 1
    const getDateString = Time.getDate()
    return `${getYear}-${getMonth}-${getDateString}`
}
