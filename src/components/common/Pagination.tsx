import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { blue50, blue100, blue400, blue600 } from "../../styles/General"


export default function Pagination({
    ListLength = 20,
    singlePageItemCount = 5,
    currentPage = 1,
    handleChange = () => console.log("page")

}: {
    ListLength: number,
    singlePageItemCount: number,
    currentPage?: number,
    handleChange?: (page: number) => void
}) {
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        handleChange?.(pageNumber)
    }, [pageNumber])

    //如果在第二頁時 點其他HeaderTag 則會重新導回第一頁
    useEffect(() => {
        setPageNumber(currentPage)
    }, [ListLength])


    const maxPageCount = Math.ceil(ListLength / singlePageItemCount)

    let isLeftButtonDisable = pageNumber === 1
    let isRightButtonDisable = maxPageCount === pageNumber

    let renderPageArr: object[] = []
    for (let item = 1; item <= maxPageCount; item++) {
        renderPageArr.push(
            <WPaginationItem onClick={(e) => handlePageNumberClick(e)}>
                <WNumberItem active={item === pageNumber}>
                    {item}
                </WNumberItem>
            </WPaginationItem>
        )
    }

    const handlePageNumberClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const target = e.target as Element
        setPageNumber(Number(target.innerHTML))

    }

    const handleLeftClick = () => {
        setPageNumber(prevState => prevState - 1)

    }

    const handleRightClick = () => {
        setPageNumber(prevState => prevState + 1)
    }

    return <>
        <WPaginationList >
            <WPaginationItem>
                <WIconButton
                    onClick={() => handleLeftClick()}
                    cursor={isLeftButtonDisable}
                    disabled={isLeftButtonDisable}>
                    <WLeftIcon
                        icon={faChevronLeft}
                        size="sm" />
                </WIconButton>
            </WPaginationItem>
            {renderPageArr}
            <WPaginationItem>
                <WIconButton
                    onClick={() => handleRightClick()}
                    cursor={isRightButtonDisable}
                    disabled={isRightButtonDisable}>
                    <WRightIcon
                        icon={faChevronRight}
                        size="sm" />
                </WIconButton>
            </WPaginationItem>
        </WPaginationList>
    </>

}



type WIconButtonProps = {
    cursor?: boolean
}

type WNumberItemProps = {
    active?: boolean
}

const WItemHightStyled = css`
    color:${blue600};
    border:solid 1px ${blue400};
`
const WItemNoHightStyled = css`
    color:${blue100};
    border:solid 1px ${blue50};
`

const WItemOnClickStyled = css`
    padding: 6px 10px;
    cursor: pointer;
    line-height: 1;
    border:solid 1px ${blue50};
    color:${blue100};
    transition: all .3s;
    &:hover{
        ${WItemHightStyled}
    }
`

const WPaginationList = styled.ul`
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;
    >li + li {
        margin-left:5px;
    }
`

const WPaginationItem = styled.li`
    
`

const WNumberItem = styled.div<WNumberItemProps>`
    ${WItemOnClickStyled};
    ${props => props.active ? WItemHightStyled : ""};
`

const WIconButton = styled.button<WIconButtonProps>`
    ${WItemOnClickStyled};
    
    background-color: transparent;
    cursor: ${props => props.cursor ? " not-allowed" : "pointer"};
    padding: 8px 11px;
    &:focus{
        outline:none;
    }
    &:hover{
        ${props => props.cursor ? WItemNoHightStyled : WItemHightStyled};
    }
`

const WLeftIcon = styled(FontAwesomeIcon)`
    
    width:50px;
`

const WRightIcon = styled(FontAwesomeIcon)`
    
    width:50px;
`

