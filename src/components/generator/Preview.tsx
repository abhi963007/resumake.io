import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import styled from 'styled-components'
import { rgba } from 'polished'
import { FiDownload, FiFileText, FiRefreshCw, FiAlertCircle } from 'react-icons/fi'

import { colors } from '../../theme'
import { resumeAtom } from '../../atoms/resume'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const Output = styled.div`
  grid-area: preview;
  background: ${colors.card};
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${colors.borders};
`

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: ${colors.header};
  border-bottom: 1px solid ${colors.borders};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

const PreviewTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.foreground};
  margin: 0;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(${() => hexToRgb(colors.primary)}, 0.3);

  &:hover {
    background: ${colors.indigo};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(${() => hexToRgb(colors.primary)}, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${colors.gray};
    box-shadow: none;
  }

  svg {
    font-size: 1rem;
  }
`

const PdfContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  min-height: calc(100vh - 10vh - 60px);
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.05);
`

const ResumeDocument = styled(Document)`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  margin: 0 auto;

  canvas {
    max-width: 95% !important;
    height: auto !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  color: ${colors.placeholder};
  gap: 1rem;

  svg {
    animation: spin 1.5s linear infinite;
    font-size: 2rem;
    color: ${colors.primary};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  color: ${colors.placeholder};
  gap: 1rem;
  text-align: center;

  svg {
    color: ${colors.accent};
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    color: ${colors.foreground};
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    max-width: 400px;
    margin: 0.5rem 0 1.5rem 0;
  }
`

// Helper function to convert hex colors to RGB for use in rgba
function hexToRgb(hex: string) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export function Preview() {
  const [resume] = useAtom(resumeAtom)
  const [, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(document.body.clientWidth > 1440 ? 1.75 : 1)
  const [pdfError, setPdfError] = useState(false)

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
    setPdfError(false)
  }, [])

  const handleDocumentLoadError = useCallback(() => {
    setPdfError(true)
  }, [])

  const LoadingMessage = () => (
    <LoadingContainer>
      <FiRefreshCw />
      <span>Generating your resume...</span>
    </LoadingContainer>
  )

  const ErrorMessage = () => (
    <ErrorContainer>
      <FiAlertCircle />
      <h4>Failed to load PDF file</h4>
      <p>
        We couldn't generate your resume at this time. Please check your entries and try again.
      </p>
      <ActionButton onClick={() => window.location.reload()}>
        <FiRefreshCw />
        Try Again
      </ActionButton>
    </ErrorContainer>
  )

  return (
    <Output>
      <PreviewHeader>
        <PreviewTitle>Preview</PreviewTitle>
        <ActionButtons>
          <ActionButton 
            onClick={() => window.open(resume.url)}
            disabled={!resume.url || resume.isLoading || pdfError}
          >
            <FiDownload />
            Export PDF
          </ActionButton>
        </ActionButtons>
      </PreviewHeader>

      <PdfContainer>
        {resume.isLoading ? (
          <LoadingMessage />
        ) : pdfError ? (
          <ErrorMessage />
        ) : (
          <ResumeDocument
            file={resume.url || '/blank.pdf'}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            loading={<LoadingMessage />}
            error={<ErrorMessage />}
          >
            <ResumePage
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading={<LoadingMessage />}
              error={<ErrorMessage />}
            />
          </ResumeDocument>
        )}
      </PdfContainer>
    </Output>
  )
}
