import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import ArticleInfo from "./ArticleInfo"




const moveLeft = (moveDistance: number) => keyframes`
  0% {
    transform: translateX(0px)
  }

  100% {
    transform: translateX(-${moveDistance}px);
  }

`;


export default function Carousel({
    carouselArr = ["https://fakeimg.pl/350x200/ff00bb/?text=1", "https://fakeimg.pl/350x200/ffff22/?text=2", "https://fakeimg.pl/350x200/ff1100/?text=3", "https://fakeimg.pl/350x200/111100/?text=4"],
    animationSeconds = 35,

}: {
    carouselArr?: any[],
    animationSeconds?: number,

}) {


    const arrLength = carouselArr.length
    const [itemDimension, setItemDimension] = useState({ height: 200, width: 200 })
    const distance = itemDimension.width
    const totalDistance = arrLength * distance
    const handleItemDimension = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number): void => {
        const target = e.target as HTMLElement
        if (index === 0) {
            setItemDimension((preState) => ({
                ...preState,
                height: target.offsetHeight,
                width: target.offsetWidth,
            }))
        }
    }

    return (
        <WViewBlock>
            <WAnimationBlock moveLeft={moveLeft} distance={totalDistance} widthParameter={arrLength * 2} animationSeconds={arrLength}>
                {carouselArr.map((articleInfo, index) =>
                    <WLi>
                        <ArticleInfo
                            key={`${articleInfo.title + index}`}
                            title={articleInfo.title}
                            category={articleInfo.category}
                            index={index}
                            articleId={articleInfo.articleId}
                            publicAt={articleInfo.public_at}
                            views={articleInfo.total_hits}
                        />
                        <WInfoFigure>
                            <WImg onLoad={(e) => handleItemDimension(e, index)} src={"https://fakeimg.pl/350x200/ff00bb/?text=1"} alt="fakeImg" />
                        </WInfoFigure>

                    </WLi>
                )}
                {carouselArr.map((articleInfo, index) =>
                    <WLi>
                        <ArticleInfo
                            key={`${articleInfo.title + index}`}
                            title={articleInfo.title}
                            category={articleInfo.category}
                            index={index}
                            articleId={articleInfo.articleId}
                            publicAt={articleInfo.public_at}
                            views={articleInfo.total_hits}
                        />
                    </WLi>
                )}
            </WAnimationBlock>
        </WViewBlock >
    )
}

const WViewBlock = styled.div`
    width: 100%;
    overflow: hidden;
`

const WAnimationBlock = styled.ul<{
    moveLeft?: (num: number) => any,
    distance: number,
    widthParameter: number,
    animationSeconds: number
}>` 
    position:relative;
    display:flex;
    width: ${props => props.widthParameter}00%;
    animation: ${props => props.moveLeft && props.moveLeft(props.distance)} ${props => props.animationSeconds}5s infinite linear ;
    &:hover {
        animation-play-state: paused;
    }
`

const WLi = styled.li`
    position:relative;
    box-sizing: border-box;
    width: 100%;
`

const WImg = styled.img`
    vertical-align: middle;
    width:100%;
`

const WInfoFigure = styled.figure`
    width: 100%;
    position: absolute;
    z-index: -1;
    opacity: 0;
   
`

