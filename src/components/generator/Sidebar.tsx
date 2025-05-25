import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { 
  MdDragIndicator, 
  MdOutlineDescription, 
  MdSchool, 
  MdWork, 
  MdExtension,
  MdStar,
  MdPerson,
  MdStyle
} from 'react-icons/md'

import { colors } from '../../theme'
import { PrimaryButton, IconButton } from '../core/Button'

const Aside = styled.aside`
  grid-area: sidebar;
  border-right: 1px solid ${colors.borders};
  padding: 28px 24px;
  background: ${colors.sidebar};
  box-shadow: inset -5px 0 15px rgba(0, 0, 0, 0.05);
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
`

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${colors.placeholder};
  margin: 1.5rem 0 0.75rem 0.5rem;
  font-weight: 500;
`

const NavItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  background: ${props => props.$active ? `rgba(${hexToRgb(colors.primary)}, 0.15)` : 'transparent'};
  
  &:hover {
    background: ${props => props.$active ? `rgba(${hexToRgb(colors.primary)}, 0.15)` : 'rgba(255, 255, 255, 0.03)'};
  }
  
  .drag-handle {
    opacity: 0.2;
    transition: opacity 0.2s ease;
    cursor: grab;
  }
  
  &:hover .drag-handle {
    opacity: 0.7;
  }
`

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-weight: ${props => props.$active ? '500' : '400'};
  color: ${props => props.$active ? colors.primary : colors.foreground};
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    font-size: 1.2rem;
    color: ${props => props.$active ? colors.primary : colors.placeholder};
  }
`

const ActionButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.violet});
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(${hexToRgb(colors.primary)}, 0.25);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(${hexToRgb(colors.primary)}, 0.35);
  }
`

// Helper function to convert hex colors to RGB for use in rgba
function hexToRgb(hex: string) {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export function Sidebar() {
  const router = useRouter()
  const { section: currSection = 'basics' } = router.query

  const sectionLinks = [
    { label: 'Templates', section: 'templates', icon: <MdStyle /> },
    { label: 'Profile', section: 'basics', icon: <MdPerson /> },
    { label: 'Education', section: 'education', icon: <MdSchool /> },
    { label: 'Work Experience', section: 'work', icon: <MdWork /> },
    { label: 'Skills', section: 'skills', icon: <MdExtension /> },
    { label: 'Projects', section: 'projects', icon: <MdOutlineDescription /> },
    { label: 'Awards', section: 'awards', icon: <MdStar /> }
  ]

  return (
    <Aside>
      <SectionTitle>Resume Sections</SectionTitle>
      <Nav>
        {sectionLinks.map(({ label, section, icon }) => (
          <NavItem key={section} $active={section === currSection}>
            <StyledLink
              href={`/generator?section=${section}`}
              $active={section === currSection}
            >
              {icon}
              {label}
            </StyledLink>
            <div className="drag-handle">
              <MdDragIndicator />
            </div>
          </NavItem>
        ))}
      </Nav>

      <ActionButton form="resume-form">GENERATE RESUME</ActionButton>
    </Aside>
  )
}
