import { PropsWithChildren } from 'react'

const Badge = ({ children }: PropsWithChildren) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
    {children}
  </span>
)

export default Badge
