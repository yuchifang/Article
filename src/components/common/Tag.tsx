import React from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { blue100 } from "../../styles/General"

type TagProps = {
    hasBorder?: boolean,
    iconBackgroundColor?: string,
    iconColor?: string,
    isItemActive?: boolean,
    handleClick: (e?: any) => void,
    iconStyle?: {
        "vertical-align": string,
        "display": string
    },
    cancelIcon?: IconProp,
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
}: TagProps) {
    return (
        <WTagBlock>
            <WTagClickBlock
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClick(e)}>
                <WTagItem
                    iconBackgroundColor={iconBackgroundColor}
                    isItemActive={isItemActive}
                    iconColor={iconColor}
                >
                    {text}
                </WTagItem>
                {cancelIcon && <FontAwesomeIcon icon={cancelIcon} style={iconStyle} />}
            </WTagClickBlock>
        </WTagBlock >
    )
}

type WTagItemProps = {
    iconColor?: string,
    isItemActive?: boolean,
    iconBackgroundColor?: string,
    hasBorder?: boolean
}



const WTagBlock = styled.div`
        width:100px;
    `
const WTagClickBlock = styled.div`
        display: inline-block;
        cursor:pointer;
    `
const WTagItem = styled.div<WTagItemProps>`
        vertical-align: middle;
        display: inline-block;
        font-size: 14px;
        padding: 5px;
        margin: 2px 5px;
        border-radius: 5px;
        font-weight: bold;
        transition: all .3s;
        ${props => props.hasBorder ? "border: 1px solid #aaa;" : ""}
        color:${props => props.iconColor || `${blue100}`};
        background-color:${props => props.isItemActive ? props.iconBackgroundColor : "transparent"};
        &:hover{
            background-color:${props => props.iconBackgroundColor || "transparent"};
        }
    `

