import styled from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { colors } from '../../theme'

// Helper function to convert hex to RGB for rgba usage
function hexToRgb(hex: string) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-size: 0.9em;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  width: 175px;
  height: 48px;
  margin: 8px 0;
  background: transparent;
  color: ${colors.foreground};
  border-radius: 10px;
  border: 1px solid rgba(${() => hexToRgb(colors.primary)}, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease-in-out;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(${() => hexToRgb(colors.primary)}, 0.05) 0%, 
      rgba(${() => hexToRgb(colors.secondary)}, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: rgba(${() => hexToRgb(colors.primary)}, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(${() => hexToRgb(colors.primary)}, 0.2);
  }
`

export const PrimaryButton = styled(Button)`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${darken(0.1, colors.primary)} 100%
  );
  color: white;
  border: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(${() => hexToRgb(colors.primary)}, 0.3);
  
  &::before {
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%);
  }
  
  &:hover {
    background: linear-gradient(
      135deg,
      ${colors.primary} 0%,
      ${darken(0.15, colors.primary)} 100%
    );
    box-shadow: 0 6px 16px rgba(${() => hexToRgb(colors.primary)}, 0.4);
  }
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(${() => hexToRgb(colors.primary)}, 0.3), 0 4px 12px rgba(${() => hexToRgb(colors.primary)}, 0.2);
  }
`

export const SecondaryButton = styled(Button)`
  background: linear-gradient(
    135deg,
    ${colors.secondary} 0%,
    ${darken(0.1, colors.secondary)} 100%
  );
  color: ${darken(0.5, colors.secondary)};
  border: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(${() => hexToRgb(colors.secondary)}, 0.2);
  
  &:hover {
    background: linear-gradient(
      135deg,
      ${colors.secondary} 0%,
      ${darken(0.15, colors.secondary)} 100%
    );
    box-shadow: 0 6px 16px rgba(${() => hexToRgb(colors.secondary)}, 0.3);
  }
`

export const MiniButton = styled(Button)`
  height: 36px;
  width: auto;
  min-width: 120px;
  padding: 0 18px;
  font-size: 0.85em;
  border-radius: 8px;
  background: ${colors.card};
  border: 1px solid ${colors.borders};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

export const AddButton = styled.button`
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  color: ${colors.primary};
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(${() => hexToRgb(colors.primary)}, 0.1);
  }
  
  &:active {
    background: rgba(${() => hexToRgb(colors.primary)}, 0.15);
  }
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: transparent;
  color: ${colors.foreground};
  border-radius: 8px;
  padding: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${colors.primary};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(${() => hexToRgb(colors.primary)}, 0.2);
  }
`
