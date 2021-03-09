import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
            <W.PaginationItem>
                <W.PageItemBlock>
                    {item}
                </W.PageItemBlock>
            </W.PaginationItem>
        )
    }

    const handleClick = () => {
        handleChange(5)
    }

    return <>
        <W.PaginationList >
            <W.PaginationItem>
                <W.LeftIcon onClick={() => handleClick()} icon={faChevronLeft} size="sm" />
            </W.PaginationItem>
            {pageCount}
            <W.PaginationItem>
                <W.RightIcon icon={faChevronRight} size="sm" />
            </W.PaginationItem>
        </W.PaginationList>
    </>

}

const W: { [key: string]: any } = {}


type LeftIcon = {
    $temp: string,
    temp: boolean
}

type RightIcon = {

}

W.PaginationList = styled.ul`
    display:flex;
    align-items: center;
    justify-content: center;
    >li + li {
        margin-left:5px;
    }
`

W.PaginationItem = styled.li`
    
`

W.PageItemBlock = styled.div`
    padding:5px 10px;
    cursor: pointer;
    line-height: 32px;
    &:hover{
        background-color:red;
    }
`

W.LeftIcon = styled(FontAwesomeIcon) <LeftIcon>`
    cursor: pointer;
    width:50px;
    // background-color:${props => props.$temp || "blue"};
`

W.RightIcon = styled(FontAwesomeIcon) <RightIcon>`
    cursor: pointer;
    width:50px;
`

