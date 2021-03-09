import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { blue50, blue100, blue400, blue600 } from "../../styles/General"

// (input)
// total = length 
// pageItem 一頁有幾個
// currentPage

// return currentPage
export default function Pagination({
    pages = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020],
    pageItem = 5,
    currentPage = 2,
    handleChange = () => console.log("ddd")

}: {
    pages?: number[],
    pageItem?: number,
    currentPage?: number,
    handleChange?: (page: number) => void
}) {

    //每個東西都要執行一次

    const ListLength = pages.length
    const totalPageCount = ListLength / pageItem

    let pageCount: object[] = []
    for (let item = 1; item <= totalPageCount; item++) {
        pageCount.push(
            <WPaginationItem>
                <WNumberItem>
                    {item}
                </WNumberItem>
            </WPaginationItem>
        )
    }

    const handleClick = () => {
        handleChange(5)
    }

    return <>
        <WPaginationList >
            <WPaginationItem>
                <WIconButton>
                    <WLeftIcon onClick={() => handleClick()} icon={faChevronLeft} size="sm" />
                </WIconButton>
            </WPaginationItem>
            {pageCount}
            <WPaginationItem>
                <WIconButton>
                    <WRightIcon icon={faChevronRight} size="sm" />
                </WIconButton>
            </WPaginationItem>
        </WPaginationList>
    </>

}



type LeftIcon = {
    $temp?: string,
    temp?: boolean
}

type RightIcon = {

}

const WItemOnClickStyled = css`
    padding: 6px 10px;
    cursor: pointer;
    line-height: 1;
    border:solid 1px ${blue50};
    color:${blue100};
    transition: all .3s;
    &:hover{
        color:${blue600};
        border:solid 1px ${blue400};
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

const WNumberItem = styled.div`
    ${WItemOnClickStyled};
`

const WIconButton = styled.button`
    ${WItemOnClickStyled};
    background-color: transparent;
    padding: 8px 11px;
    &:focus{
        outline:none;
    }

`

const WLeftIcon = styled(FontAwesomeIcon) <LeftIcon>`
    cursor: pointer;
    width:50px;
`

const WRightIcon = styled(FontAwesomeIcon) <RightIcon>`
    cursor: pointer;
    width:50px;
`

