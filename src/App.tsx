import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HeaderPage from './pages/HeaderPage'
import HomePage from './pages/HomePage'
import { GetWriterArticles } from './store/actions/articleAction'
import Footer from './components/layout/Footer'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArticlePage from './pages/ArticlePage'
import ResultPage from './pages/ResultPage'
import { pipe, packTagsString, countRepeatTag, _map, stringToLower, objToArr, _sort, _slice } from "./utils/utils"
import { RootState } from './store/reducers/RootReducer'
import GoTop from '../src/components/common/GoTop'

function App() {

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
  }, [dispatch])



  return (
    <BrowserRouter>
      {
        // @ts-ignore
        (articleList?.pinkymini?.actionStatus === "success" && topicTitleList?.length > 0) &&
        <>
          <HeaderPage topicTitleList={topicTitleList} />
          <Switch>
            <Route exact path="/" component={() => <HomePage topicTitleList={topicTitleList} />} />
            <Route path="/ArticlePage" component={ArticlePage} />
            <Route path="/ResultPage" component={ResultPage} />
          </Switch>
          <Footer />
          <GoTop />
        </>
      }
      {
        // @ts-ignore
        articleList?.pinkymini?.actionStatus === "loading" && <h1>Loading</h1>
      }
      {
        //@ts-ignore
        articleList?.pinkymini?.actionStatus === "error" && <h1>Error</h1>
      }
    </BrowserRouter >
  );
}

export default App;
