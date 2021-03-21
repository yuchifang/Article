import React from 'react'
import styled from "styled-components"
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { blue100 } from "../../styles/General"

type TagProps = {
    iconBackgroundColor: string,
    onClick: (e?: any) => void,
    text: string,

    hasBorder?: boolean,
    TextColor?: string,
    isItemActive?: boolean,

    useIcon?: boolean,
    renderIcon?: () => JSX.Element
}


export default function Tag({
    iconBackgroundColor,
    TextColor,
    isItemActive,
    onClick,
    useIcon,
    renderIcon,
    text
}: TagProps) {

    let IconStyle = {
        "vertical-align": "middle",
        "margin-left": "5px",
        "display": isItemActive ? "inline-block" : "none"
    }

    return (
        <WTagBlock useIcon={useIcon}>
            <WTagClickBlock
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClick?.(e)}>
                <WTagItem
                    iconBackgroundColor={iconBackgroundColor}
                    isItemActive={isItemActive}
                    TextColor={TextColor}
                >
                    {text}
                </WTagItem>
                {useIcon &&
                    <>
                        {renderIcon && renderIcon()}
                        {!renderIcon && <FontAwesomeIcon icon={faTimes} style={IconStyle} />}
                    </>
                }

            </WTagClickBlock>
        </WTagBlock >
    )
}

type WTagItemProps = {
    TextColor?: string,
    isItemActive?: boolean,
    iconBackgroundColor?: string,
    hasBorder?: boolean
}



const WTagBlock = styled.div<{ useIcon?: boolean }>`
        width:${props => props.useIcon ? "100px" : "auto"};
    `
const WTagClickBlock = styled.div`
        display: inline-block;
        margin: 0.125rem 0.313rem;
        cursor:pointer;
    `
const WTagItem = styled.div<WTagItemProps>`
        vertical-align: middle;
        display: inline-block;
        font-size: 0.875rem;
        padding: 0.313rem;
     
        border-radius:5px;
        font-weight: bold;
        transition: all .3s;
        ${props => props.hasBorder ? "border: 1px solid #aaa;" : ""}
        color:${props => props.TextColor || `${blue100}`};
        background-color:${props => props.isItemActive ? props.iconBackgroundColor : "transparent"};
        &:hover{
            background-color:${props => props.iconBackgroundColor || "transparent"};
        }
    `

