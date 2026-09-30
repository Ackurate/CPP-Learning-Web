function TextField({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  autoComplete,
  inputMode,
  spellCheck,
  error,
  hint,
  inputRef,
  endAdornment,
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`auth-field${error ? ' has-error' : ''}`}>
      <label className="auth-field__label" htmlFor={id}>{label}</label>
      <div className="auth-field__control">
        <input
          ref={inputRef}
          className="auth-field__input"
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          inputMode={inputMode}
          spellCheck={spellCheck}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        />
        {endAdornment}
      </div>
      {hint && <p className="auth-field__hint" id={hintId}>{hint}</p>}
      {error && <p className="auth-field__error" id={errorId} role="alert">{error}</p>}
    </div>
  )
}

export default TextField