import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HeaderPage from './pages/HeaderPage'
import HomePage from './pages/HomePage'
import { GetWriterArticles } from './store/actions/articleAction'
import Footer from './components/layout/Footer'
import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArticlePage from './pages/ArticlePage'
import ResultPage from './pages/ResultPage'
import { pipe, packTagsString, countRepeatTag, _map, stringToLower, objToArr, _sort, _slice } from "./utils/utils"
import { RootState } from './store/reducers/RootReducer'

/*
// 注意
// 寫到APP 上
fromEvent??
Result 加 container max-width <<

//看看可不可以把 style 物件 宣告到同頁
// 想辦法做一起引入一隻style index.js
// 注意
- type
- style
- media
- 專案架構 
- provider
>> mo
>> kika

看 top 的mo

看看 Mo dcard reader style 部分

看看mo 面試的提到的兩題
*/
function App() {


  // 每個component 如果沒有傳值的問題
  // 取得作者姓名? 一個 或 多個
  // 如果點選同樣的 store 還是會重新render?
  // 最多100篇的限制
  // 看看用useMemo 前要做啥
  // https://overreacted.io/before-you-memo/
  // >看看自己專案的命名規則 component/  變數



  // RWD << font size
  // 將 type 做修改

  // slider <<
  // 三個狀態 << 初始,loading, 完成
  // TopicBlock 改動 是否要再 TopicBlock處理資料 還是單純render?
  // go top ?

  // 看看 store useState 的用法
  // 重新整理store 會不會不見
  // font-size RWD 
  // 考慮在HomePage 用物件map呈現?
  // loading 狀態

  type Tag = {
    name: string,
    value: number
  }

  const dispatch = useDispatch()
  const articleList = useSelector((state: RootState) => state.WriterList)

  const topicTitleList = useMemo(() => {
    // @ts-ignore
    if (articleList?.pinkymini?.actionStatus === "success") {
      return pipe(
        packTagsString,
        _map(stringToLower),
        countRepeatTag,
        objToArr,
        _sort((x: Tag, y: Tag) => x.value > y.value ? -1 : 1),
        _slice(0, 3)
        // @ts-ignore
      )(articleList.pinkymini.articles)
    }
  }, [articleList]) //考慮在store 存其他值

  useEffect(() => {
    dispatch(GetWriterArticles("pinkymini"))
  }, [])



  return (
    <BrowserRouter>
      {
        // @ts-ignore
        articleList?.pinkymini?.actionStatus === "success" ?
          <>
            <HeaderPage topicTitleList={topicTitleList} />
            <Switch>
              <Route exact path="/" component={() => <HomePage topicTitleList={topicTitleList} />} />
              <Route path="/ArticlePage" component={ArticlePage} />
              <Route path="/ResultPage" component={ResultPage} />
            </Switch>
            <Footer />
          </>
          : null
      }
    </BrowserRouter >
  );
}

export default App;
