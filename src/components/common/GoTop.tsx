import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
// 要讓他不顯示
// 如果畫面到最上層 就不顯示
// 知道window的位置

export default function GoTop() {
    const [showGoTopIcon, setShowGoTopIcon] = useState<boolean>(false)

    useEffect(() => {
        const handleHeight = () => {
            if (window.scrollY === 0) {
                setShowGoTopIcon(false)
                return
            }
            setShowGoTopIcon(true)
        }
        window.addEventListener('scroll', handleHeight)
        return (() => {
            window.removeEventListener('scroll', handleHeight)
        })
    }, [])

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <TopIconBlock showGoTopIcon={showGoTopIcon} onClick={handleClick}>
            <TopIcon icon={faArrowUp} size="sm" />
        </TopIconBlock>
    )
}

const TopIconBlock = styled.div<{ showGoTopIcon: boolean }>`
    opacity:${props => props.showGoTopIcon ? "1" : "0"};
    z-index:${props => props.showGoTopIcon ? "2" : "-2"};
    position:fixed;
    right:35px;
    bottom:50px;
    cursor: pointer;
    padding: 14px 19px;
    background-color:#ccc;
    transform:rotate(45deg);
    transition:all .3s;
    &:hover{
        opacity:0.8
    }
`

const TopIcon = styled(FontAwesomeIcon)`
    transform:rotate(-45deg)
`
