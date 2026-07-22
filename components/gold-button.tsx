import Link from 'next/link'

const BASE_CLASS =
  'group inline-flex items-center gap-3 border border-gold-muted bg-transparent px-6 py-3 font-sans text-[12px] tracking-[0.18em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-primary-foreground hover:shadow-[0_0_28px_-4px_var(--color-gold)]'

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  )
}

export function GoldButton({
  children,
  className = '',
  onClick,
  type = 'button',
  href,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  /** When provided, the button renders as a real navigation link. */
  href?: string
}) {
  if (href) {
    const isExternal = /^https?:\/\//.test(href)
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BASE_CLASS} ${className}`}
        >
          <Inner>{children}</Inner>
        </a>
      )
    }
    return (
      <Link href={href} className={`${BASE_CLASS} ${className}`}>
        <Inner>{children}</Inner>
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`${BASE_CLASS} ${className}`}>
      <Inner>{children}</Inner>
    </button>
  )
}
