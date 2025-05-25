import Link from 'next/link'
import styled from 'styled-components'
import { FiUser, FiSettings, FiHelpCircle } from 'react-icons/fi'

import { Logo } from '../core/Logo'
import { colors } from '../../theme'

const StyledHeader = styled.header`
  grid-area: header;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: ${colors.header};
  border-bottom: 1px solid ${colors.borders};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

const HeaderActions = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const IconButton = styled.button`
  background: transparent;
  color: ${colors.foreground};
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
    background: rgba(255, 255, 255, 0.05);
  }
`

export function Header() {
  return (
    <StyledHeader>
      <LogoWrapper>
        <Link href="/">
          <Logo scale={0.65} />
        </Link>
      </LogoWrapper>
      
      <HeaderActions>
        <IconButton title="Help">
          <FiHelpCircle />
        </IconButton>
        <IconButton title="Settings">
          <FiSettings />
        </IconButton>
        <IconButton title="Profile">
          <FiUser />
        </IconButton>
      </HeaderActions>
    </StyledHeader>
  )
}
