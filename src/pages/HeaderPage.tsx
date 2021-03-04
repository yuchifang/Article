import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBook, faTimes } from '@fortawesome/free-solid-svg-icons'
import { blue400, blue50, blue600 } from '../styles/General'
import { Link } from 'react-router-dom'

type Tag = {
    name: string,
    value: number
}

export type topicTitleListProps = {
    topicTitleList: Tag[],
}

export default function HeaderPage({ topicTitleList }: topicTitleListProps) {
    const [showSearchButton, setShowSearchButton] = useState(true)
    const searchRef = useRef(null)


    const handleSearch = () => {
        setShowSearchButton?.(prevState => !prevState)
    }



    return (
        <WHeaderSection>
            <WHeaderContainer>
                <WLogoBlock>
                    <WLogoLink to="/">
                        <FontAwesomeIcon size="2x" icon={faBook} color={`${blue600}`} />
                        <WLogTitle>
                            Article
                        </WLogTitle>
                    </WLogoLink>
                </WLogoBlock>
                <WFeatureBlock>

                    <WSearchBlock showSearch={!showSearchButton} >
                        <WSearchInput type="text" ref={searchRef} />
                        <FontAwesomeIcon
                            onClick={handleSearch}
                            size="1x"
                            icon={faTimes}
                            color={`${blue600}`} />
                    </WSearchBlock>

                    <WSearchButton showSearch={showSearchButton} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} color={`${blue600}`} />
                    </WSearchButton>

                </WFeatureBlock>
                <WNavbar>
                    {topicTitleList?.length > 0 && topicTitleList.map((obj: Tag, index: number) =>
                        <WNavbarItem key={obj.name + index}>
                            <Link to={{
                                pathname: `/ResultPage`,
                                state: { searchValue: obj.name }
                            }} replace >
                                {obj.name}
                            </Link>
                        </WNavbarItem>
                    )}
                </WNavbar>
            </WHeaderContainer>
        </WHeaderSection>
    );
}

type WSearchBlockType = {
    showSearch: boolean
}

type WSearchFeature = {
    showSearch: boolean
}

const WHeaderSection = styled.header`
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .1),
    0 4px 24px rgba(0, 0, 0, .06);
    width:100%;
`

const WHeaderContainer = styled.div`
    max-width: 1280px;
    margin :auto;
    padding: 0 0px;
    @media (min-width: 500px) {
        padding: 0px 15px;
    }
    @media (min-width: 980px) {
        padding: 0px 30px;
    }
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap;
    align-items: center;
    
`

const WLogoBlock = styled.div`
    width:50%;
    font-size:20px;
    box-sizing: border-box;
   
    @media (min-width: 980px) {
        width: unset;
    }   
`

const WLogoLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    padding: 8px 10px;
    margin: 0px 0px;
    border-radius: 4px;
    transition: all .1s;
    svg {
        margin-right:20px;
    }
    &:hover{
        background-color: ${blue50};
    }
    @media (min-width: 500px) {
        margin: 3px 0px;
    }   
    
`

const WLogTitle = styled.div`
    font-weight:bold;
    font-size: 25px;
    line-height: 30px;
    color:${blue600};
`

const WFeatureBlock = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    width:50%;
    align-items: center;
    @media (min-width: 980px) {
        width: unset;
        order:2;
    }
`

const WFeature = styled.div`
    padding: 0 10px;
    cursor: pointer;
    transition: all .5s;
`

const WSearchFeature = styled(WFeature) <WSearchFeature>`
    position: relative;
    opacity: ${props => props?.showSearch ? "1" : "0"};
    z-index:${props => props?.showSearch ? "auto" : "-1"};
`

const WSearchBlock = styled(WSearchFeature) <WSearchBlockType>`
    right:${props => props?.showSearch ? "-32px" : "-45px"};
    line-height:16px;
    svg{
        border-radius: 6px;
        vertical-align: middle;
    }
`

const WSearchButton = styled(WSearchFeature)`

`

const WSearchInput = styled.input`
    font-size: 18px;
    vertical-align: middle;
    width:100px;
    @media (min-width: 980px) {
        width: 150px;
    }
    @media (min-width: 500px) {
        width: 120px;
    }
    padding: 4px 0px 4px 11px;
    border-radius: 12px;
    margin-right: 10px;
    &:focus{
        outline: none;
    }
`

const WNavbar = styled.nav`
    width:100%;
    align-items: center;
    display: flex;
    justify-content: center;
    @media (min-width: 980px) {
        width: unset;
    }
`
const WNavbarItem = styled.div`
   
    margin:0px 15px 0px 15px; 
    border-radius: 4px;
    a{
        text-decoration: none;
        display: inline-block;
        padding: 20px 15px;
        color: ${blue400};
        font-weight: bold;
        transition: all .1s;
        line-height: 1;
        font-size: 16px;
    }
    &:hover{
        background-color: ${blue50};
        a{
            color:${blue600};
        }
    }  
    @media (min-width: 500px) {
        margin:3px 15px 3px 15px; 
    }
`