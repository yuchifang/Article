import { useEffect, useState, useMemo, useCallback } from "react";
import { pipe, _filter, _slice, _sort } from "../../../utils/utils";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../../store/reducers/RootReducer";
import { blue600 } from "../../../styles/General";
import { MediaQueries } from "../../../styles/media";
import Pagination from "../Pagination";
import { useRWD } from "../../../utils/hooks";
import Carousel from "../Carousel";
import Filter from "./Filter";
import ArticleInfo from "../ArticleInfo";

export type ArticleProps = {
  articleId: string;
  avatar: string;
  category: string;
  public_at: string;
  sub_site_category: string;
  tags: string[];
  title: string;
  total_hits: string;
};

export type DefaultPageStateType = {
  currentPage: number;
  maxIndex: number;
  minIndex: number;
};

type TopicBlockProps = {
  searchValue: string;
  rowsCount: number;
  columnsCount: number;

  showCarousel?: boolean;
  showTitle?: boolean;
  wrap?: boolean;
  filter?: boolean;
  hasPagination?: boolean;
  titlePlace?: string;
  titleHasIcon?: boolean;
};

const singlePageItemCount = 10;

export const defaultPageState = {
  currentPage: 1,
  maxIndex: singlePageItemCount,
  minIndex: 0,
};

export default function TopicBlock({
  filter = false,
  showTitle = true,
  searchValue = "標題",
  rowsCount = 4,
  columnsCount = 1,
  wrap = false,
  titlePlace = "left",
  hasPagination = false,
  showCarousel = false,
  titleHasIcon = false,
}: TopicBlockProps) {
  const device = useRWD();
  const storeArticleList = useSelector((state: RootState) => state.WriterList);
  const ArticleInfoList = useMemo(() => {
    //@ts-ignore
    if (storeArticleList?.pinkymini?.actionStatus === "success") {
      return pipe(
        //1. 尋找所有文章的tag 或 title 是否符合title  2. 依據total hit 排列  3. 依據 rowsCount * columnsCount 要呈現幾個
        _filter((article: ArticleProps) => {
          if (!!article && !!article.title)
            if (
              article.title.toLowerCase().indexOf(searchValue.toLowerCase()) >
              -1
            )
              return true;
          return article.tags.some(
            (element: string) =>
              element.toLowerCase() === searchValue.toLowerCase()
          );
        }),
        _sort((articleA: ArticleProps, articleB: ArticleProps) =>
          articleA.total_hits > articleB.total_hits ? -1 : 1
        ),
        _slice(0, rowsCount * columnsCount)
        //@ts-ignore
      )(storeArticleList.pinkymini.articles);
    }
  }, [storeArticleList, searchValue]);

  const [articleInfoFilteredList, setArticleInfoFilteredList] =
    useState<ArticleProps[]>(ArticleInfoList);

  const [filterListOpen, setFilterListOpen] = useState<boolean>(false);
  const [publicTimeActive, setPublicTimeActive] = useState<boolean>(false);
  const [viewCountActive, setViewCountActive] = useState<boolean>(true);
  useEffect(() => {
    setArticleInfoFilteredList?.(ArticleInfoList);
    setViewCountActive(true);
    setPublicTimeActive(false);
    setFilterListOpen(false);
    setPageState?.(defaultPageState);
  }, [ArticleInfoList]);

  const [pageState, setPageState] =
    useState<DefaultPageStateType>(defaultPageState);

  const showPagination =
    articleInfoFilteredList.length / singlePageItemCount > 1 ? true : false;

  const handleChange = useCallback(
    (page: number) => {
      setPageState({
        currentPage: page,
        maxIndex: singlePageItemCount * page,
        minIndex: singlePageItemCount * (page - 1),
      });
    },
    [pageState.currentPage]
  );

  const articleContentRender = (
    <>
      <WArticleInfoBlock wrap={wrap}>
        {articleInfoFilteredList?.length > 0 && (
          <>
            {(device === "PC" || !showCarousel) &&
              articleInfoFilteredList.map((articleInfo, index) => {
                if (
                  pageState.maxIndex >= index + 1 &&
                  index + 1 > pageState.minIndex
                )
                  return (
                    <ArticleInfo
                      rowsCount={rowsCount}
                      title={articleInfo.title}
                      category={articleInfo.category}
                      index={index}
                      articleId={articleInfo.articleId}
                      publicAt={articleInfo.public_at}
                      views={articleInfo.total_hits}
                    />
                  );
              })}
            {device === "Mobile" && showCarousel && (
              <Carousel carouselArr={articleInfoFilteredList}>
                {({
                  AnimationBlock,
                  AnimationItemBlock,
                }: {
                  AnimationBlock: any;
                  AnimationItemBlock: any;
                }) => (
                  <AnimationBlock>
                    {articleInfoFilteredList.map((articleInfo, index) => (
                      <ArticleInfo
                        rowsCount={rowsCount}
                        title={articleInfo.title}
                        category={articleInfo.category}
                        index={index}
                        articleId={articleInfo.articleId}
                        publicAt={articleInfo.public_at}
                        views={articleInfo.total_hits}
                      />
                    ))}
                  </AnimationBlock>
                )}
              </Carousel>
            )}
          </>
        )}
      </WArticleInfoBlock>
      {hasPagination && showPagination && (
        <Pagination
          currentPage={pageState.currentPage}
          singlePageItemCount={singlePageItemCount}
          ListLength={articleInfoFilteredList.length}
          onChange={handleChange}
        />
      )}
    </>
  );

  const handleFilterList = () => {
    setFilterListOpen((prevState) => !prevState);
  };

  const handlePublicTimeFilter = () => {
    setArticleInfoFilteredList((prevState) =>
      prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
        Number(articleA.public_at) > Number(articleB.public_at) ? -1 : 1
      )
    );
    setPublicTimeActive(true);
    setViewCountActive(false);
    setFilterListOpen((prevState) => !prevState);
  };

  const handleViewCountFilter = () => {
    setArticleInfoFilteredList((prevState) =>
      prevState.sort((articleA: ArticleProps, articleB: ArticleProps) =>
        Number(articleA.total_hits) > Number(articleB.total_hits) ? -1 : 1
      )
    );
    setViewCountActive(true);
    setPublicTimeActive(false);
    setFilterListOpen((prevState) => !prevState);
  };

  return (
    <WTopicBlock>
      {showTitle && (
        <WTopicTitle titlePlace={titlePlace}>
          {titleHasIcon ? "#" : ""}
          {searchValue}
        </WTopicTitle>
      )}
      {ArticleInfoList.length > 0 && (
        <>
          {filter && (
            <Filter
              onClickFilter={handleViewCountFilter}
              onClickPublicTime={handlePublicTimeFilter}
              onClickFilterList={handleFilterList}
              filterListOpen={filterListOpen}
              publicTimeActive={publicTimeActive}
              viewCountActive={viewCountActive}
            />
          )}
          {articleContentRender}
        </>
      )}
      {ArticleInfoList.length === 0 && (
        <>
          <WAlertTitle>找不到相關文章</WAlertTitle>
          <h2>找不到與您關鍵字相符的文章 請重新搜尋不同的關鍵字</h2>
        </>
      )}
    </WTopicBlock>
  );
}

const WTopicBlock = styled.div`
  width: 100%;
  padding: 1.563rem 0.625rem;
  box-sizing: border-box;
  ${MediaQueries.MobileLCSS`
        padding:2.813rem;
    `}
`;

const WTopicTitle = styled.p<{ titlePlace: string }>`
  text-align: ${(props) => props.titlePlace};
  color: ${blue600};
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 1;
  margin-bottom: 1.875rem;
`;

const WArticleInfoBlock = styled.div<{ wrap: boolean }>`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
`;

const WAlertTitle = styled.div`
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0 0 0.625rem 0;
`;
