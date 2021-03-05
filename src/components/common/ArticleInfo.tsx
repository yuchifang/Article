import React from 'react'
import styled from 'styled-components'
import { blue600, blue400 } from '../../styles/General'
import { Link, useHistory } from 'react-router-dom'
import { timestampToDate } from '../../utils/utils'
import { MediaQueries } from "../../styles/media"
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
        <W.ArticleInfo onClick={() => handleClick(articleId)} rowsCount={rowsCount}>
            <W.InfoFigure>
                <W.InfoImg src={`https://fakeimg.pl/350x200/?text=fakeImg${index}`} alt="fakeImg" />
            </W.InfoFigure>
            <W.InfoTitle>{title}</W.InfoTitle>
            {!!category && category !== "未分類" && category.length > 0 && <W.InfoCategory>{category}</W.InfoCategory>}
            <W.PublicTime>{timestampToDate(Number(publicAt))}</W.PublicTime>
            <W.ViewCount>觀看次數: {views}次</W.ViewCount>
        </W.ArticleInfo>
    )
}

type WArticleInfoProps = {
    rowsCount: number;
}

const W: { [key: string]: any } = {};

W.ArticleInfo = styled.div<WArticleInfoProps>`
        box-sizing: border-box;
        width: calc( 90% / ${props => props.rowsCount});
        margin: 10px;
        cursor:pointer;
        ${MediaQueries.DesktopSCSS`
            margin: 20px;
        `}
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

W.InfoFigure = styled.figure`
        width: 100%;
    `

W.InfoImg = styled.img`
        width: 100%;
        vertical-align: middle;
        transition: all .3s;
    `

W.InfoCategory = styled.p`
        color: ${blue400};
        font-size: 14px;
        transition: all .3s;
    `

W.InfoTitle = styled.p`
        color: ${blue600};
        font-size: 18px;
        transition: all .3s;
        font-weight: bold;
    `

W.PublicTime = styled.p`
        color: ${blue400};
        font-size: 14px;
    `

W.ViewCount = styled.p`
        color: ${blue400};
        font-size: 14px;
    `

