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

export type HeaderPageProps = {
    topicTitleList: Tag[],
}

export default function HeaderPage({ topicTitleList }: HeaderPageProps) {
    const [showSearchButton, setShowSearchButton] = useState(true)
    const searchRef = useRef(null)
    const handleSearch = () => {
        setShowSearchButton?.(prevState => !prevState)
    }

    return (
        <W_HeaderSection>
            <W_HeaderContainer>
                <W_LogoBlock>
                    <W_LogoLink to="/">
                        <FontAwesomeIcon size="2x" icon={faBook} color={`${blue600}`} />
                        <W_LogTitle>Article</W_LogTitle>
                    </W_LogoLink>
                </W_LogoBlock>
                <W_FeatureBlock>
                    <W_SearchBlock showSearch={!showSearchButton} >
                        <W_SearchInput type="text" ref={searchRef} />
                        <FontAwesomeIcon
                            onClick={handleSearch}
                            size="1x"
                            icon={faTimes}
                            color={`${blue600}`} />
                    </W_SearchBlock>
                    <W_SearchButton showSearch={showSearchButton} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} color={`${blue600}`} />
                    </W_SearchButton>
                </W_FeatureBlock>
                <W_Navbar>
                    {topicTitleList?.length > 0 && topicTitleList.map((obj: Tag, index: number) =>
                        <W_NavbarItem key={obj.name + index}>
                            <Link to={{
                                pathname: `/ResultPage`,
                                state: { searchValue: obj.name }
                            }} replace >
                                {obj.name}
                            </Link>
                        </W_NavbarItem>
                    )}
                </W_Navbar>
            </W_HeaderContainer>
        </W_HeaderSection>
    );
}

type WSearchBlockProps = {
    showSearch: boolean
}

type WSearchFeatureProps = {
    showSearch: boolean
}

const W_HeaderSection = styled.header`
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .1),
    0 4px 24px rgba(0, 0, 0, .06);
    width:100%;
`

const W_HeaderContainer = styled.div`
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

const W_LogoBlock = styled.div`
    width:50%;
    font-size:20px;
    box-sizing: border-box;
   
    @media (min-width: 980px) {
        width: unset;
    }   
`

const W_LogoLink = styled(Link)`
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

const W_LogTitle = styled.div`
    font-weight:bold;
    font-size: 25px;
    line-height: 30px;
    color:${blue600};
`

const W_FeatureBlock = styled.div`
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

const WSearchFeature = styled(WFeature) <WSearchFeatureProps>`
    position: relative;
    opacity: ${props => props?.showSearch ? "1" : "0"};
    z-index:${props => props?.showSearch ? "auto" : "-1"};
`

const W_SearchBlock = styled(WSearchFeature) <WSearchBlockProps>`
    right:${props => props?.showSearch ? "-32px" : "-45px"};
    line-height:16px;
    svg{
        border-radius: 6px;
        vertical-align: middle;
    }
`

const W_SearchButton = styled(WSearchFeature)`

`

const W_SearchInput = styled.input`
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

const W_Navbar = styled.nav`
    width:100%;
    align-items: center;
    display: flex;
    justify-content: center;
    @media (min-width: 980px) {
        width: unset;
    }
`
const W_NavbarItem = styled.div`
   
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