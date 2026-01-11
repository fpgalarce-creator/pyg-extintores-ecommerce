import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
  const styles = {
    primary:
      'bg-ember text-white hover:bg-emberDark focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
    secondary:
      'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
    ghost:
      'bg-transparent text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
        styles[variant]
      } ${className}`}
      {...props}
    />
  )
}

export default Button
