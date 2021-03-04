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
        <W_ArticleInfo onClick={() => handleClick(articleId)} rowsCount={rowsCount}>
            <W_InfoFigure>
                <W_InfoImg src={`https://fakeimg.pl/350x200/?text=fakeImg${index}`} alt="fakeImg" />
            </W_InfoFigure>
            <W_InfoTitle>{title}</W_InfoTitle>
            {!!category && category !== "未分類" && category.length > 0 && <W_InfoCategory>{category}</W_InfoCategory>}
            <W_PublicTime>{timestampToDate(Number(publicAt))}</W_PublicTime>
            <W_ViewCount>觀看次數: {views}次</W_ViewCount>
        </W_ArticleInfo>
    )
}

type W_ArticleInfoProps = {
    rowsCount: number;
}

const W_ArticleInfo = styled.div<W_ArticleInfoProps>`
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

const W_InfoFigure = styled.figure`
    width: 100%;
`

const W_InfoImg = styled.img`
    width: 100%;
    vertical-align: middle;
    transition: all .3s;
`

const W_InfoCategory = styled.p`
    color: ${blue400};
    font-size: 14px;
    transition: all .3s;
`

const W_InfoTitle = styled.p`
    color: ${blue600};
    font-size: 18px;
    transition: all .3s;
    font-weight: bold;
`

const W_PublicTime = styled.p`
    color: ${blue400};
    font-size: 14px;
`

const W_ViewCount = styled.p`
    color: ${blue400};
    font-size: 14px;
`