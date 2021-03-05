import React from 'react'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type TagProps = {
    iconBackgroundColor: string,
    iconColor: string,
    isItemActive: boolean,
    handleClick: () => void,
    iconStyle: {
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
        <W.TagBlock>
            <W.TagClickBlock
                onClick={() => handleClick()}>
                <W.TagItem
                    iconBackgroundColor={iconBackgroundColor}
                    isItemActive={isItemActive}
                    iconColor={iconColor}
                >
                    {text}
                </W.TagItem>
                {cancelIcon && <FontAwesomeIcon icon={cancelIcon} style={iconStyle} />}
            </W.TagClickBlock>
        </W.TagBlock>
    )
}

type WTagItemProps = {
    iconColor: string,
    isItemActive: boolean,
    iconBackgroundColor: string

}


const W = {
    TagBlock: styled.div`
        width:100px;
    `,
    TagClickBlock: styled.div`
        display: inline-block;
        cursor:pointer;
    `,
    TagItem: styled.div<WTagItemProps>`
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
}
