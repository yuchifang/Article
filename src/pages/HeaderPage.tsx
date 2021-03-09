import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBook, faTimes } from '@fortawesome/free-solid-svg-icons'
import { blue400, blue50, blue600 } from '../styles/General'
import { Link, useHistory } from 'react-router-dom'
import { MediaQueries } from "../styles/media"
type Tag = {
    name: string,
    value: number
}

export type HeaderPageProps = {
    topicTitleList: Tag[],
}

export default function HeaderPage({ topicTitleList }: HeaderPageProps) {
    const history = useHistory()
    const [showSearchButton, setShowSearchButton] = useState(true)
    const searchRef = useRef<HTMLInputElement>(null)

    const handleSearch = () => {
        setShowSearchButton?.(prevState => !prevState)
    }

    const handleInputCancel = () => {
        if (searchRef.current && searchRef.current) {
            searchRef.current.value = ''
        }
    }

    const handlePressEnter = (e: KeyboardEvent) => {
        // 找title tag
        if (e.key === 'Enter') {
            if (searchRef.current && searchRef.current) {
                const locationInfo = {
                    pathname: `/ResultPage`,
                    state: {
                        searchValue: searchRef.current.value.trim(),
                    }
                }
                history.push(locationInfo)
            }
        }
    }

    return (
        <W.HeaderSection>
            <W.HeaderContainer >
                <W.LogoBlock>
                    <W.LogoLink to="/">
                        <FontAwesomeIcon size="2x" icon={faBook} color={`${blue600}`} />
                        <W.LogTitle>Article</W.LogTitle>
                    </W.LogoLink>
                </W.LogoBlock>
                <W.FeatureBlock>
                    <W.SearchBlock showSearch={!showSearchButton} >
                        <W.InputBlock>
                            <W.SearchInput
                                type="text"
                                ref={searchRef}
                                onKeyPress={(e: KeyboardEvent) => handlePressEnter(e)}
                            />
                            <W.SearchInputIcon>
                                <FontAwesomeIcon
                                    onClick={handleInputCancel}
                                    size="1x"
                                    icon={faTimes} />
                            </W.SearchInputIcon>
                        </W.InputBlock>
                        <FontAwesomeIcon
                            onClick={handleSearch}
                            size="1x"
                            icon={faTimes}
                            color={`${blue600}`} />
                    </W.SearchBlock>
                    <W.SearchButton showSearch={showSearchButton} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} color={`${blue600}`} />
                    </W.SearchButton>
                </W.FeatureBlock>
                <W.Navbar>
                    {topicTitleList?.length > 0 && topicTitleList.map((obj: Tag, index: number) =>
                        <W.NavbarItem key={obj.name + index}>
                            <Link to={{
                                pathname: `/ResultPage`,
                                state: { searchValue: obj.name }
                            }} replace >
                                {obj.name}
                            </Link>
                        </W.NavbarItem>
                    )}
                </W.Navbar>
            </W.HeaderContainer>
        </W.HeaderSection >
    );
}

type WSearchBlockProps = {
    showSearch: boolean
}

type WSearchFeatureProps = {
    showSearch: boolean
}

let W: { [key: string]: any } = {}

W.HeaderSection = styled.header`
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .1),
    0 4px 24px rgba(0, 0, 0, .06);
    width:100%;
`

W.HeaderContainer = styled.div`
    max-width: 1280px;
    margin :auto;
    padding: 0 0px;
    ${MediaQueries.MobileCSS`
        padding: 0px 15px;
    `}
    ${MediaQueries.DesktopSCSS`
        padding: 0px 30px;
    `}
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap;
    align-items: center;
    
`

W.LogoBlock = styled.div`
    width:50%;
    font-size:20px;
    box-sizing: border-box;
   
    ${MediaQueries.DesktopSCSS`
        width: unset;
    `}   
`

W.LogoLink = styled(Link)`
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
    ${MediaQueries.DesktopSCSS`
        margin: 3px 0px;
    `}   
    
`

W.LogTitle = styled.div`
    font-weight:bold;
    font-size: 25px;
    line-height: 30px;
    color:${blue600};
`

W.FeatureBlock = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    width:50%;
    align-items: center;
    ${MediaQueries.DesktopSCSS`
        width: unset;
        order:2;
    `}
`

W.Feature = styled.div`
    padding: 0 10px;
  
    transition: all .5s;
`

W.SearchFeature = styled(W.Feature) <WSearchFeatureProps>`
    position: relative;
    opacity: ${props => props?.showSearch ? "1" : "0"};
    z-index:${props => props?.showSearch ? "auto" : "-1"};
`

W.SearchBlock = styled(W.SearchFeature) <WSearchBlockProps>`
    display: flex;
    align-items: center;
    right:${props => props?.showSearch ? "-32px" : "-45px"};
    >svg{
        cursor:pointer;
        border-radius: 6px;
        vertical-align: middle;
    }
`

W.InputBlock = styled.div`
    width:100px;
    ${MediaQueries.DesktopSCSS`
        width: 150px;
    `}
    ${MediaQueries.MobileCSS`
        width: 120px;
    `}
    border:solid 1px #767676;
    border-radius: 12px;
    overflow:hidden;
    display:flex;
    align-items: center;
    margin-right: 10px;
    padding-right: 8px;
    &:hover{
        >div{
            svg{
                opacity: 1;
            }
        }
    }
`

W.SearchInputIcon = styled.div`
    width: 10px;
    display: flex;
    align-items: center;
    >svg{
        cursor:pointer;
        position:relative;
        color:#aaa;
        width: 100%;
        opacity: 0;;
    }
`

W.SearchButton = styled(W.SearchFeature)`

`

W.SearchInput = styled.input`
    cursor:pointer;
    font-size: 18px;
    vertical-align: middle;
    width: 100%;
    padding: 4px 0px 4px 11px;
    border:none;
    &:focus{
        outline: none;
    }
`

W.Navbar = styled.nav`
    width:100%;
    align-items: center;
    display: flex;
    justify-content: center;
    ${MediaQueries.DesktopSCSS`
        width: unset;
    `}
`
W.NavbarItem = styled.div`
   
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
    ${MediaQueries.MobileCSS`
        margin:3px 15px 3px 15px; 
    `}
`