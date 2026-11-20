'use client'

import React from 'react'

interface AnchorLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId: string
  children: React.ReactNode
}

export function AnchorLink({
  targetId,
  children,
  className,
  ...props
}: AnchorLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${targetId}`)
    } else {
      window.location.hash = targetId
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}
