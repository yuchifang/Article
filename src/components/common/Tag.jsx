import React from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Tag({
    iconBackgroundColor,
    iconColor,
    isItemActive,
    handleClick,
    iconStyle,
    cancelIcon,
    text
}) {
    return (
        <WFilterItemBlock>
            <WFilterItemClickBlock
                onClick={() => handleClick()}>
                <WFilterItem
                    iconBackgroundColor={iconBackgroundColor}
                    active={isItemActive}
                    iconColor={iconColor}
                >
                    {text}
                </WFilterItem>
                {cancelIcon && <FontAwesomeIcon icon={cancelIcon} style={iconStyle} />}
            </WFilterItemClickBlock>
        </WFilterItemBlock>
    )
}

const WFilterItemBlock = styled.div`
    width:100px;
`

const WFilterItemClickBlock = styled.div`
    display: inline-block;
    cursor:pointer;
`
const WFilterItem = styled.div`
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    font-weight: bold;
    transition: all .3s;
    color:${props => props?.iconColor};
    background-color:${props => props.active ? props.iconBackgroundColor : "#fff"};
    &:hover{
        background-color:${props => props.iconBackgroundColor};
    }
    
    `