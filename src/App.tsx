import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HeaderPage from './pages/HeaderPage'
import HomePage from './pages/HomePage'
import { GetWriterArticles } from './store/actions/articleAction'
import Footer from './components/layout/Footer'
import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArticlePage from './pages/ArticlePage'
import ResultPage from './pages/ResultPage'
import { pipe, packTagsString, countRepeatTag, _map, stringToLower, objToArr, _sort, _slice } from "./utils"
import { RootState } from './store/reducers/RootReducer'
import { GlobalStyle } from './styles/General'
/*
// 注意
// 寫到APP 上
fromEvent??
Result 加 container max-width <<
media?
//看看可不可以把 style 物件 宣告到同頁
// 注意
- type
- style
- media
- 專案架構 
- provider
>> mo
>> kika

查查css styled

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
  // html Tag
  // search feature
  // 分頁
  // slider
  // font-size RWD 
  // 搜尋結果 篩選  時間  人氣 
  // 更新時間的 function
  // 考慮在HomePage 用物件map呈現?
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
    // @ts-ignore
    articleList?.pinkymini?.actionStatus === "success" ?
      <BrowserRouter>
        <GlobalStyle />
        <HeaderPage topicTitleList={topicTitleList} />
        <Switch>
          <Route exact path="/" component={() => <HomePage topicTitleList={topicTitleList} />} />

          <Route exact path="/ArticlePage" component={ArticlePage} />
          <Route path="/ResultPage" component={ResultPage} />
        </Switch>
        <Footer />
      </BrowserRouter >
      : null
  );
}

export default App;
