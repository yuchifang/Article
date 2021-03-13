import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const moveLeft = (moveDistance: number) => keyframes`
  0% {
    transform: translateX(0px)
  }

  100% {
    transform: translateX(-${moveDistance}px);
  }

`;

// renderProps
export default function Carousel({
    carouselArr = ["https://fakeimg.pl/350x200/ff00bb/?text=1", "https://fakeimg.pl/350x200/ffff22/?text=2", "https://fakeimg.pl/350x200/ff1100/?text=3", "https://fakeimg.pl/350x200/111100/?text=4"],
    children,
}: {
    carouselArr?: any[],
    children?: any
}) {
    const [itemDimension, setItemDimension] = useState<number>(0)
    const imgRef = useRef<HTMLImageElement>(null)
    const arrLength = carouselArr.length
    const distance = itemDimension
    const totalDistance = arrLength * distance

    useEffect(() => {
        const handleImgWidth = () => {
            if (!!imgRef && !!imgRef.current && !!imgRef?.current?.offsetWidth) {
                setItemDimension(imgRef?.current?.offsetWidth)
            }
        }
        handleImgWidth()

        window.addEventListener('resize', handleImgWidth)
        return (() => {
            window.removeEventListener('resize', handleImgWidth)
        })
    }, [])

    // AnimationBlock 為 Carousel 最上層 此層的children 放你要map的陣列
    // 陣列的每個Item 需要由 AnimationItemBlock 包住
    // AnimationItemBlock 裡面要包 一個GetDimensionBlock 及 陣列的item
    const AnimationBlock = ({ children }: { children: any }) => <>
        <WViewBlock>
            <WAnimationBlock moveLeft={moveLeft} distance={totalDistance} widthParameter={arrLength * 2} animationSeconds={arrLength}>
                {children}
            </WAnimationBlock>
        </WViewBlock>
    </>
    //Carousel 最上層 此層的children 放你要map的陣列
    const AnimationItemBlock = ({ children }: { children: any }) => <>
        <WLi>
            {children}
        </WLi>
    </>

    const GetDimensionBlock = () => <>
        <WInfoFigure>
            <WImg ref={imgRef} src={"https://fakeimg.pl/350x200/ff00bb/?text=1"} alt="fakeImg" />
        </WInfoFigure>
    </>

    return children({
        AnimationBlock,
        AnimationItemBlock,
        GetDimensionBlock
    })

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
    height: 0;
    z-index: -1;
    opacity: 0;
   
`

