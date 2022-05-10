import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { blue600, blue400 } from '../../styles/General'
import { timestampToDate } from '../../utils/utils'
import { MediaQueries } from '../../styles/media'

type ArticleInfoProps = {
    title: string
    index: number
    articleId: string
    publicAt: string
    views: string

    category?: string
    imgSrc?: string
    rowsCount?: number
}

export default function ArticleInfo({
    category,
    title,
    index,
    rowsCount,
    articleId,
    publicAt,
    views,
    imgSrc = `https://fakeimg.pl/350x200/?text=fakeImg${index}`,
}: ArticleInfoProps) {
    const history = useHistory()
    const handleClick = (articleId: string): void => {
        const locationInfo = {
            pathname: `/ArticlePage`,
            state: {
                articleId,
            },
        }
        history.push(locationInfo)
    }

    return (
        <WArticleInfo
            onClick={() => handleClick(articleId)}
            rowsCount={rowsCount}
        >
            <WInfoFigure>
                <WInfoImg src={imgSrc} alt="fakeImg" />
            </WInfoFigure>
            <WInfoTitle>{title}</WInfoTitle>
            {!!category && category !== '未分類' && category.length > 0 && (
                <WInfoCategory>{category}</WInfoCategory>
            )}
            <WPublicTime>{timestampToDate(Number(publicAt))}</WPublicTime>
            <WViewCount>觀看次數: {views}次</WViewCount>
        </WArticleInfo>
    )
}

const WArticleInfo = styled.div<{ rowsCount?: number }>`
    box-sizing: border-box;
    margin: 0.625rem;
    cursor: pointer;
    width: 90%;
    ${MediaQueries.MobileLCSS`
            width: calc( 90% / ${(props: any) => props.rowsCount});
            margin: 1.25rem;
        `}
    &:hover {
        figure {
            img {
                opacity: 0.7;
            }
        }
        p {
            opacity: 0.7;
        }
    }
`

const WInfoFigure = styled.figure`
    width: 100%;
`

const WInfoImg = styled.img`
    width: 100%;
    vertical-align: middle;
    transition: all 0.3s;
`

const WInfoCategory = styled.p`
    color: ${blue400};
    font-size: 0.875rem;
    transition: all 0.3s;
`

const WInfoTitle = styled.p`
    color: ${blue600};
    font-size: 1.125rem;
    transition: all 0.3s;
    font-weight: bold;
`

const WPublicTime = styled.p`
    color: ${blue400};
    font-size: 0.875rem;
`

const WViewCount = styled.p`
    color: ${blue400};
    font-size: 0.875rem;
`
