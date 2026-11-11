import { useEffect, useRef, useState } from 'react'
import './VideoGallery.css'

export default function VideoGallery({ items = [], className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const railRef = useRef(null)
  const cardRefs = useRef([])
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (openIndex === null) {
      if (dialog.open) dialog.close()
      return
    }

    if (!dialog.open) dialog.showModal()
  }, [openIndex])

  const select = index => {
    if (!items.length) return
    const nextIndex = (index + items.length) % items.length
    setActiveIndex(nextIndex)

    const rail = railRef.current
    const card = cardRefs.current[nextIndex]
    if (rail && card) {
      rail.scrollTo({
        left: card.offsetLeft - rail.clientWidth / 2 + card.clientWidth / 2,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    const rail = railRef.current
    if (!rail) return

    const center = rail.scrollLeft + rail.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const distance = Math.abs(center - cardCenter)
      if (distance < closestDistance) {
        closestIndex = index
        closestDistance = distance
      }
    })

    setActiveIndex(closestIndex)
  }

  const handleKeyDown = event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      select(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      select(activeIndex - 1)
    }
  }

  const currentItem = openIndex === null ? null : items[openIndex]

  return (
    <section
      className={`video-gallery${className ? ` ${className}` : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Video gallery"
      onKeyDown={handleKeyDown}
    >
      {items.length > 0 ? (
        <>
          <div className="video-gallery__controls">
            <button type="button" onClick={() => select(activeIndex - 1)} aria-label="Previous video">
              <span aria-hidden="true">&larr;</span>
            </button>
            <p aria-live="polite">
              {activeIndex + 1} / {items.length}
            </p>
            <button type="button" onClick={() => select(activeIndex + 1)} aria-label="Next video">
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
          <div className="video-gallery__rail" ref={railRef} onScroll={handleScroll}>
            {items.map((item, index) => (
              <article
                className="video-gallery__card"
                data-active={index === activeIndex ? 'true' : undefined}
                key={`${item.src}-${index}`}
                ref={element => {
                  cardRefs.current[index] = element
                }}
              >
                <button
                  type="button"
                  className="video-gallery__preview"
                  aria-label={`Play ${item.title || `video ${index + 1}`} with controls`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => {
                    setActiveIndex(index)
                    setOpenIndex(index)
                  }}
                >
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                  <span className="video-gallery__play-icon" aria-hidden="true">
                    ▶
                  </span>
                </button>
                {item.title && <h2>{item.title}</h2>}
              </article>
            ))}
          </div>
        </>
      ) : (
        <p className="video-gallery__empty">
          Add video files to <code>public/videos</code> and list their paths in the home page to
          populate this gallery.
        </p>
      )}

      <dialog
        ref={dialogRef}
        className="video-gallery__dialog"
        aria-label={currentItem?.title || 'Video player'}
        onClose={() => setOpenIndex(null)}
        onClick={event => {
          if (event.target === event.currentTarget) setOpenIndex(null)
        }}
      >
        {currentItem && (
          <div className="video-gallery__player">
            <button
              type="button"
              className="video-gallery__close"
              aria-label="Close video"
              onClick={() => setOpenIndex(null)}
            >
              &times;
            </button>
            <video
              src={currentItem.src}
              poster={currentItem.poster}
              controls
              autoPlay
              playsInline
            />
            {currentItem.title && <h2>{currentItem.title}</h2>}
            {currentItem.description && <p>{currentItem.description}</p>}
          </div>
        )}
      </dialog>
    </section>
  )
}
