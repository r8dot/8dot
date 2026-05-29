import { motion } from 'framer-motion'
import { useEffect } from 'react'

type PanelProps = {
  title: string
  content: string
  onClose: () => void
}

function Panel({ title, content, onClose }: PanelProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          width: 'min(680px, 92vw)',
          maxHeight: '80vh',
          overflow: 'auto',
          borderRadius: '12px',
          background: '#111827',
          color: '#f9fafb',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.8rem',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem 0.7rem',
              cursor: 'pointer',
              background: '#ef4444',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
        <p style={{ margin: 0, lineHeight: 1.55 }}>{content}</p>
      </motion.div>
    </motion.div>
  )
}

export default Panel

