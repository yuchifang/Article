import React from 'react'
import styled from 'styled-components'
import { blue600, blue400 } from '../../styles/General'
import { Link, useHistory } from 'react-router-dom'

export default function ArticleInfo({ avatar, category, title, index, blockNumber, rowsCount, articleId, publicAt }) {
    const history = useHistory()
    const handleClick = (articleId) => {
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
            {!!category && category !== "未分類" && category.length > 0 && <WArticleCategory>{category}</WArticleCategory>}
            <WArticleTitle>{title}</WArticleTitle>

        </WArticle>
    )
}

const WArticle = styled.div`
    box-sizing: border-box;
    width: calc( 90% / ${props => props.rowsCount});
    margin: 10px;
    @media (min-width: 980px) {
        margin: 20px;
    }
    cursor: pointer;
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
    width:100%;
`
const WArticleImg = styled.img`
    width:100%;
    vertical-align: middle;
    transition: all .3s;
`
const WArticleCategory = styled.p`
    color:${blue400};
    font-size: 12px;
    transition: all .3s;
`
const WArticleTitle = styled.p`
    color:${blue600};
    transition: all .3s;
    font-weight: bold;
`