import React from 'react'
import styled from 'styled-components'
import { blue600, blue400 } from '../../styles/General'
import { Link, useHistory } from 'react-router-dom'
import { timestampToDate } from '../../utils'

type ArticleInfoProps = {
    blockNumber?: number,
    rowsCount: number,
    title: string,
    category: string,
    index: number,
    articleId: string,
    publicAt: string,
    views: string,
}


export default function ArticleInfo({
    category,
    title,
    index,
    blockNumber,
    rowsCount,
    articleId,
    publicAt,
    views
}: ArticleInfoProps) {
    const history = useHistory()
    const handleClick = (articleId: string): void => {

        const locationInfo = {
            pathname: `/ArticlePage`,
            state: {
                articleId
            }
        }
        history.push(locationInfo)
    }

    return (

        <WArticle onClick={() => handleClick(articleId)} rowsCount={rowsCount}>
            <WArticleFigure>
                <WArticleImg src={`https://fakeimg.pl/350x200/?text=fakeImg${index}`} alt="fakeImg" />
            </WArticleFigure>
            <WArticleTitle>{title}</WArticleTitle>
            {!!category && category !== "未分類" && category.length > 0 && <WArticleCategory>{category}</WArticleCategory>}
            <WPublicTime>{timestampToDate(Number(publicAt))}</WPublicTime>
            <WViewCount>觀看次數: {views}次</WViewCount>
        </WArticle>
    )
}

type WArticleProps = {
    rowsCount: number;
}

const WArticle = styled.div<WArticleProps>`
    box-sizing: border-box;
    width: calc( 90% / ${props => props.rowsCount});
    margin: 10px;
    @media(min - width: 980px) {
        margin: 20px;
    }
    cursor:pointer;
    &:hover{
    figure{
        img{
            opacity: .7;
        }
    }
    p{
        opacity: .7;
    }
}
`
const WArticleFigure = styled.figure`
    width: 100%;
`
const WArticleImg = styled.img`
    width: 100%;
    vertical-align: middle;
    transition: all .3s;
`
const WArticleCategory = styled.p`
    color: ${blue400};
    font-size: 14px;
    transition: all .3s;
`
const WArticleTitle = styled.p`
    color: ${blue600};
    font-size: 18px;
    transition: all .3s;
    font-weight: bold;
`
const WPublicTime = styled.p`
    color: ${blue400};
    font-size: 14px;
`

const WViewCount = styled.p`
    color: ${blue400};
    font-size: 14px;
`