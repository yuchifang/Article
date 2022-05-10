import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { throttle } from '../../utils/utils'

type GoTopProps = {
    listenEvent?: boolean
}

export default function GoTop({ listenEvent = false }: GoTopProps) {
    const [showGoTopIcon, setShowGoTopIcon] = useState<boolean>(false)
    const [webHeight, setWebHeight] = useState<number>(0)

    useEffect(() => {
        const handleFunction = listenEvent ? handleScroll : handleHeight

        window.addEventListener('scroll', handleFunction)
        return () => {
            window.removeEventListener('scroll', handleFunction)
        }
    }, [webHeight])

    const handleHeight = () => {
        if (window.scrollY === 0) {
            setShowGoTopIcon(false)
            return
        }
        setShowGoTopIcon(true)
    }

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setShowGoTopIcon(false)
            return
        }
        if (window.scrollY < webHeight) {
            setWebHeight(window.scrollY)
            setShowGoTopIcon(true)
            return
        }

        if (window.scrollY > webHeight) {
            setWebHeight(window.scrollY)
            setShowGoTopIcon(false)
        }

        setShowGoTopIcon(false)
    }

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
    opacity: ${(props) => (props.showGoTopIcon ? '1' : '0')};
    z-index: ${(props) => (props.showGoTopIcon ? '2' : '-2')};
    position: fixed;
    right: 35px;
    bottom: 56px;
    cursor: pointer;
    padding: 14px 19px;
    background-color: #ccc;
    transform: rotate(45deg);
    transition: all 0.3s;
    &:hover {
        opacity: 0.8;
    }
`

const TopIcon = styled(FontAwesomeIcon)`
    transform: rotate(-45deg);
`
