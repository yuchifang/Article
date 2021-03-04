import React from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type tagProps = {
    iconBackgroundColor: string,
    iconColor: string,
    isItemActive: boolean,
    handleClick: () => void,
    iconStyle: {
        "vertical-align": string,
        "display": string
    },
    cancelIcon: IconProp | null,
    text: string
}


export default function Tag({
    iconBackgroundColor,
    iconColor,
    isItemActive,
    handleClick,
    iconStyle,
    cancelIcon,
    text
}: tagProps) {
    return (
        <WFilterItemBlock>
            <WFilterItemClickBlock
                onClick={() => handleClick()}>
                <WFilterItem
                    iconBackgroundColor={iconBackgroundColor}
                    isItemActive={isItemActive}
                    iconColor={iconColor}
                >
                    {text}
                </WFilterItem>
                {cancelIcon && <FontAwesomeIcon icon={cancelIcon} style={iconStyle} />}
            </WFilterItemClickBlock>
        </WFilterItemBlock>
    )
}

type WFilterItemProps = {
    iconColor: string,
    isItemActive: boolean,
    iconBackgroundColor: string

}


const WFilterItemBlock = styled.div`
    width:100px;
`

const WFilterItemClickBlock = styled.div`
    display: inline-block;
    cursor:pointer;
`


const WFilterItem = styled.div<WFilterItemProps>`
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    font-weight: bold;
    transition: all .3s;
    color:${props => props?.iconColor};
    background-color:${props => props.isItemActive ? props.iconBackgroundColor : "#fff"};
    &:hover{
        background-color:${props => props.iconBackgroundColor};
    }
    
    `