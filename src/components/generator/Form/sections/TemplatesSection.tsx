import { useFormContext, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { rgba, darken, lighten } from 'polished'

import { FormSection } from './FormSection'
import { TEMPLATES } from '../../../../lib/templates/constants'
import { colors } from '../../../../theme'
import { FormValues } from '../../../../types'

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`

const TemplateCard = styled.label<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: ${props => props.$isSelected ? rgba(colors.primary, 0.1) : colors.card};
  border: 2px solid ${props => props.$isSelected ? colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.$isSelected ? colors.primary : rgba(colors.primary, 0.3)};
  }
`

const TemplatePreview = styled.div`
  width: 100%;
  height: 280px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const TemplateTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: ${colors.foreground};
`

const TemplateDescription = styled.p`
  font-size: 14px;
  color: ${colors.placeholder};
  margin: 0;
  text-align: center;
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

// Styled components for template previews
const TemplateHeader = styled.div<{ $color: string, $variant: number }>`
  width: 100%;
  height: ${props => props.$variant === 1 ? '40px' : props.$variant === 2 ? '60px' : '30px'};
  background-color: ${props => props.$color};
  margin-bottom: ${props => props.$variant === 2 ? '20px' : '10px'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.$variant === 3 ? 'center' : 'flex-start'};
  padding: 0 15px;
`

const TemplateName = styled.div<{ $align: string, $size: string }>`
  width: 60%;
  height: 12px;
  background-color: #333;
  margin-bottom: 5px;
  align-self: ${props => props.$align};
  font-size: ${props => props.$size};
`

const TemplateSection = styled.div<{ $variant: number }>`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${props => props.$variant === 2 ? 'row' : 'column'};
  gap: ${props => props.$variant === 2 ? '15px' : '5px'};
`

const TemplateSectionTitle = styled.div<{ $width: string, $color: string }>`
  width: ${props => props.$width};
  height: 8px;
  background-color: ${props => props.$color};
  margin-bottom: 8px;
`

const TemplateLine = styled.div<{ $width: string }>`
  width: ${props => props.$width};
  height: 6px;
  background-color: #ddd;
  margin-bottom: 5px;
`

const TemplateColumn = styled.div<{ $width: string }>`
  width: ${props => props.$width};
  display: flex;
  flex-direction: column;
  gap: 5px;
`

// Template descriptions to give users more information
const templateDescriptions: Record<number, string> = {
  1: "Classic professional layout with clean typography",
  2: "Modern design with bold headers and sleek sections",
  3: "Academic focused with emphasis on publications",
  4: "Minimal design with efficient use of space",
  5: "Creative layout with unique section styling",
  6: "Executive style with elegant formatting",
  7: "Technical focused with skills highlight",
  8: "Two-column design for comprehensive content",
  9: "Contemporary style with subtle accent colors"
};

// Template color schemes
const templateColors: Record<number, { primary: string, secondary: string, accent: string }> = {
  1: { primary: '#2c3e50', secondary: '#3498db', accent: '#e74c3c' },
  2: { primary: '#2c3e50', secondary: '#1abc9c', accent: '#f39c12' },
  3: { primary: '#34495e', secondary: '#2980b9', accent: '#e74c3c' },
  4: { primary: '#2c3e50', secondary: '#95a5a6', accent: '#7f8c8d' },
  5: { primary: '#8e44ad', secondary: '#9b59b6', accent: '#3498db' },
  6: { primary: '#2c3e50', secondary: '#2c3e50', accent: '#f1c40f' },
  7: { primary: '#2c3e50', secondary: '#16a085', accent: '#27ae60' },
  8: { primary: '#2c3e50', secondary: '#e67e22', accent: '#d35400' },
  9: { primary: '#2c3e50', secondary: '#3498db', accent: '#1abc9c' }
};

// Template variants to differentiate layouts
const templateVariants: Record<number, number> = {
  1: 1, // Standard layout
  2: 2, // Two-column layout
  3: 3, // Centered layout
  4: 1, // Standard minimal
  5: 2, // Creative two-column
  6: 1, // Executive
  7: 3, // Technical centered
  8: 2, // Comprehensive two-column
  9: 3  // Contemporary centered
};

// Function to render preview based on template ID
function renderTemplatePreview(templateId: number) {
  const colors = templateColors[templateId];
  const variant = templateVariants[templateId];
  
  return (
    <TemplatePreview>
      <TemplateHeader $color={colors.primary} $variant={variant}>
        {variant === 3 && (
          <TemplateName $align="center" $size="18px" />
        )}
      </TemplateHeader>
      
      {variant !== 3 && (
        <TemplateName $align="flex-start" $size="16px" />
      )}
      
      <TemplateSection $variant={1}>
        <TemplateSectionTitle $width="30%" $color={colors.secondary} />
        <TemplateLine $width="100%" />
        <TemplateLine $width="90%" />
        <TemplateLine $width="95%" />
      </TemplateSection>
      
      <TemplateSection $variant={variant}>
        {variant === 2 ? (
          <>
            <TemplateColumn $width="40%">
              <TemplateSectionTitle $width="80%" $color={colors.secondary} />
              <TemplateLine $width="100%" />
              <TemplateLine $width="90%" />
              <TemplateLine $width="85%" />
              <TemplateLine $width="95%" />
            </TemplateColumn>
            <TemplateColumn $width="60%">
              <TemplateSectionTitle $width="50%" $color={colors.accent} />
              <TemplateLine $width="100%" />
              <TemplateLine $width="90%" />
              <TemplateLine $width="95%" />
              <TemplateLine $width="85%" />
            </TemplateColumn>
          </>
        ) : (
          <>
            <TemplateSectionTitle $width="25%" $color={colors.secondary} />
            <TemplateLine $width="100%" />
            <TemplateLine $width="95%" />
            <TemplateLine $width="90%" />
          </>
        )}
      </TemplateSection>
      
      <TemplateSection $variant={1}>
        <TemplateSectionTitle $width="20%" $color={colors.accent} />
        <TemplateLine $width="100%" />
        <TemplateLine $width="85%" />
        <TemplateLine $width="90%" />
      </TemplateSection>
    </TemplatePreview>
  );
}

export function TemplatesSection() {
  const { control } = useFormContext<FormValues>()

  return (
    <FormSection title="Choose a Template">
      <TemplateGrid>
        {TEMPLATES.map((templateId) => (
          <Controller
            key={templateId}
            control={control}
            name="selectedTemplate"
            render={({ field }) => (
              <TemplateCard 
                $isSelected={field.value === templateId}
                onClick={() => field.onChange(templateId)}
              >
                <HiddenInput
                  type="radio"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={templateId}
                  checked={field.value === templateId}
                />
                {renderTemplatePreview(templateId)}
                <TemplateTitle>Template {templateId}</TemplateTitle>
                <TemplateDescription>
                  {templateDescriptions[templateId]}
                </TemplateDescription>
              </TemplateCard>
            )}
          />
        ))}
      </TemplateGrid>
    </FormSection>
  )
}
