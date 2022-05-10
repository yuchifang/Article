import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBook, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom'
import { blue400, blue50, blue600 } from '../styles/General'

import { MediaQueries } from '../styles/media'
import { useOutsideClick } from '../utils/hooks'
// import Spinner from '../components/common/Spinner'

type NavItem = {
    name: string
    value: number
}

export type HeaderPageProps = {
    topicTitleList: NavItem[]
}

export default function HeaderPage({ topicTitleList }: HeaderPageProps) {
    const history = useHistory()
    const [
        isSearchFeatureVisible,
        setIsSearchFeatureVisible,
    ] = useState<boolean>(false)

    const outSideRef = useOutsideClick({
        handleOutsideClick: () => setIsSearchFeatureVisible(false),
    })

    const searchRef = useRef<HTMLInputElement>(null)

    const handleSearch = () => {
        setIsSearchFeatureVisible?.((prevState: boolean) => !prevState)
    }

    const handleInputCancel = () => {
        if (searchRef.current && searchRef.current) {
            searchRef.current.value = ''
        }
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if (searchRef.current && searchRef.current) {
                const locationInfo = {
                    pathname: `/ResultPage`,
                    state: {
                        searchValue: searchRef.current.value.trim(),
                    },
                }
                history.push(locationInfo)
            }
        }
    }

    return (
        <WHeaderSection>
            <WHeaderContainer>
                <WLogoBlock>
                    <WLogoLink to="/">
                        <FontAwesomeIcon
                            size="2x"
                            icon={faBook}
                            color={`${blue600}`}
                        />
                        <WLogTitle>Article</WLogTitle>
                    </WLogoLink>
                </WLogoBlock>
                <WFeatureBlock>
                    <WSearchBlock
                        ref={outSideRef}
                        isSearchFeatureVisible={!isSearchFeatureVisible}
                    >
                        <WInputBlock>
                            <WSearchInput
                                type="text"
                                ref={searchRef}
                                onKeyPress={(
                                    e: React.KeyboardEvent<HTMLDivElement>
                                ) => handlePressEnter(e)}
                            />
                            <WSearchInputIcon>
                                <FontAwesomeIcon
                                    onClick={handleInputCancel}
                                    size="1x"
                                    icon={faTimes}
                                />
                            </WSearchInputIcon>
                        </WInputBlock>
                        <FontAwesomeIcon
                            onClick={handleSearch}
                            size="1x"
                            icon={faTimes}
                            color={`${blue600}`}
                        />
                    </WSearchBlock>
                    <WSearchButton
                        isSearchFeatureVisible={isSearchFeatureVisible}
                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon icon={faSearch} color={`${blue600}`} />
                    </WSearchButton>
                </WFeatureBlock>
                <WNavbar>
                    {topicTitleList.map((obj: NavItem, index: number) => (
                        <WNavbarItem key={obj.name + index}>
                            <Link
                                to={{
                                    pathname: `/ResultPage`,
                                    state: { searchValue: obj.name },
                                }}
                                replace
                            >
                                {obj.name}
                            </Link>
                        </WNavbarItem>
                    ))}
                </WNavbar>
            </WHeaderContainer>
        </WHeaderSection>
    )
}

const WHeaderSection = styled.header`
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 4px 24px rgba(0, 0, 0, 0.06);
    width: 100%;
`

const WHeaderContainer = styled.div`
    max-width: 1280px;
    margin: auto;
    padding: 0px 0.625rem;
    ${MediaQueries.MobileSCSS`
        padding: 0px 0.938rem;
    `}
    ${MediaQueries.MobileLCSS`
        padding: 0px 1.875rem;
    `}
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
`

const WLogoBlock = styled.div`
    width: 50%;
    font-size: 1.25rem;
    box-sizing: border-box;

    ${MediaQueries.MobileLCSS`
        width: unset;
    `}
`

const WLogoLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 0.625rem;
    margin: 0px 0px;
    border-radius: 4px;
    transition: all 0.1s;
    svg {
        margin-right: 1.25rem;
    }
    &:hover {
        background-color: ${blue50};
    }
    ${MediaQueries.MobileLCSS`
        margin: 0.188rem 0px;
    `}
`

const WLogTitle = styled.div`
    font-weight: bold;
    font-size: 1.5625rem;
    line-height: 1.875rem;
    color: ${blue600};
    ${MediaQueries.MobileLCSS`
        html {
            font-size:1px;
        }

    `}
`

const WFeatureBlock = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    width: 50%;
    align-items: center;
    ${MediaQueries.MobileLCSS`
        width: unset;
        order:2;
    `}
`

const WFeature = css`
    margin: 0 0.625rem;

    transition: all 0.5s;
`

const WSearchFeature = styled.div<{ isSearchFeatureVisible: boolean }>`
    ${WFeature}
    position: relative;
    opacity: ${(props) => (props?.isSearchFeatureVisible ? '0' : '1')};
    z-index: ${(props) => (props?.isSearchFeatureVisible ? '-1' : 'auto')};
`

const WSearchBlock = styled(WSearchFeature)<{
    isSearchFeatureVisible: boolean
}>`
    display: flex;
    align-items: center;
    right: ${(props) => (props?.isSearchFeatureVisible ? '-45px' : '-32px')};
    > svg {
        cursor: pointer;
        border-radius: 6px;
        vertical-align: middle;
    }
`

const WInputBlock = styled.div`
    width: 6.25rem;
    ${MediaQueries.MobileLCSS`
        width: 9.375rem;
    `}
    ${MediaQueries.MobileSCSS`
        width: 7.5rem;
    `}
    border:solid 1px #767676;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-right: 0.625rem;
    padding-right: 0.5rem;
    &:hover {
        > div {
            svg {
                opacity: 1;
            }
        }
    }
`

const WSearchInputIcon = styled.div`
    width: 0.625rem;
    display: flex;
    align-items: center;
    > svg {
        cursor: pointer;
        position: relative;
        color: #aaa;
        width: 100%;
        opacity: 0;
    }
`

const WSearchButton = styled(WSearchFeature)`
    cursor: pointer;
`

const WSearchInput = styled.input`
    cursor: pointer;
    font-size: 1.125rem;
    vertical-align: middle;
    width: 100%;
    padding: 0.25rem 0px 0.25rem 0.688rem;
    border: none;
    &:focus {
        outline: none;
    }
`

const WNavbar = styled.nav`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    ${MediaQueries.MobileLCSS`
        width: unset;
    `}
`
const WNavbarItem = styled.div`
    margin: 0px 0.938rem 0px 0.938rem;
    border-radius: 4px;
    a {
        text-decoration: none;
        display: inline-block;
        padding: 1.25rem 0.938rem;
        color: ${blue400};
        font-weight: bold;
        transition: all 0.1s;
        line-height: 1;
        font-size: 1rem;
    }
    &:hover {
        background-color: ${blue50};
        a {
            color: ${blue600};
        }
    }
    ${MediaQueries.MobileSCSS`
        margin:0.188rem 0.938rem 0.188rem 0.938rem; 
    `}
`
