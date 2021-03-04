import './App.css';
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
import { type } from 'os';


function App() {
  // 每個component 如果沒有傳值的問題
  // 取得作者姓名? 一個 或 多個
  // 如果點選同樣的 store 還是會重新render?
  // 最多100篇的限制
  // 看看用useMemo 前要做啥
  // TypeScript
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
        _sort((x: any, y: any) => {
          console.log("x", x)
          return x.value > y.value ? -1 : 1
        }),
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
        <HeaderPage topicTitleList={topicTitleList} />
        <Switch>
          <Route exact path="/" component={() => <HomePage topicTitleList={topicTitleList} />} />

          {/* <Route exact path="/ArticlePage" component={ArticlePage} /> */}
          <Route path="/ResultPage" component={ResultPage} />
        </Switch>
        <Footer />
      </BrowserRouter >
      : null
  );
}

export default App;
