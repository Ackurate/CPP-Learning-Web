import { useState } from 'react'
import TextField from './TextField.jsx'

function PasswordField({ id, label, ...props }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TextField
      {...props}
      id={id}
      label={label}
      type={isVisible ? 'text' : 'password'}
      endAdornment={(
        <button
          className="auth-password-toggle"
          type="button"
          aria-label={isVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((visible) => !visible)}
        >
          {isVisible ? 'Ẩn' : 'Hiện'}
        </button>
      )}
    />
  )
}

export default PasswordField