import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import PasswordField from '../components/auth/PasswordField.jsx'
import TextField from '../components/auth/TextField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validateLogin } from '../utils/validators.js'
import './AuthPage.css'

function LoginPage() {
	const { isAuthenticated, login } = useAuth()
	const location = useLocation()
	const navigate = useNavigate()
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const [values, setValues] = useState({ email: '', password: '', remember: false })
	const [errors, setErrors] = useState({})
	const [formError, setFormError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		document.title = 'Đăng nhập | Học C++'
	}, [])

	if (isAuthenticated) return <Navigate to="/" replace />

	function focusFirstError(nextErrors) {
		const firstField = ['email', 'password'].find((field) => nextErrors[field])
		if (firstField === 'email') emailRef.current?.focus()
		if (firstField === 'password') passwordRef.current?.focus()
	}

	function updateField(field, value) {
		setValues((current) => ({ ...current, [field]: value }))
		setFormError('')
		if (errors[field]) {
			const validate = field === 'email' ? validateEmail : (input) => input ? '' : 'Vui lòng nhập mật khẩu.'
			setErrors((current) => ({ ...current, [field]: validate(value) }))
		}
	}

	function validateField(field, value) {
		const message = field === 'email'
			? validateEmail(value)
			: value ? '' : 'Vui lòng nhập mật khẩu.'
		setErrors((current) => ({ ...current, [field]: message }))
		return message
	}

	async function handleSubmit(event) {
		event.preventDefault()
		setFormError('')
		const nextErrors = validateLogin(values)
		setErrors(nextErrors)

		if (Object.values(nextErrors).some(Boolean)) {
			focusFirstError(nextErrors)
			return
		}

		setIsSubmitting(true)
		try {
			await login({ email: values.email.trim().toLowerCase(), password: values.password }, values.remember)
			navigate(location.state?.from || '/', { replace: true })
		} catch (error) {
			if (error.code === 'INVALID_CREDENTIALS') {
				setFormError('Email hoặc mật khẩu chưa đúng. Kiểm tra lại hoặc đăng ký tài khoản mới.')
			} else {
				setFormError('Chưa thể đăng nhập lúc này. Vui lòng thử lại.')
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AuthLayout
			title="Chào mừng trở lại"
			subtitle="Đăng nhập để tiếp tục hành trình học C++."
			switchPrompt="Chưa có tài khoản?"
			switchLabel="Đăng ký"
			switchTo="/register"
		>
			<form className="auth-form" noValidate onSubmit={handleSubmit}>
				{formError && <p className="auth-form__alert" role="alert">{formError}</p>}
				<TextField
					id="login-email"
					label="Email"
					name="email"
					type="email"
					value={values.email}
					onChange={(event) => updateField('email', event.target.value)}
					onBlur={(event) => validateField('email', event.target.value)}
					autoComplete="email"
					inputMode="email"
					spellCheck={false}
					error={errors.email}
					inputRef={emailRef}
				/>
				<PasswordField
					id="login-password"
					label="Mật khẩu"
					name="password"
					value={values.password}
					onChange={(event) => updateField('password', event.target.value)}
					onBlur={(event) => validateField('password', event.target.value)}
					autoComplete="current-password"
					error={errors.password}
					inputRef={passwordRef}
				/>
				<div className="auth-form__options">
					<label className="auth-checkbox" htmlFor="remember-login">
						<input
							id="remember-login"
							name="remember"
							type="checkbox"
							checked={values.remember}
							onChange={(event) => updateField('remember', event.target.checked)}
						/>
						<span>Ghi nhớ đăng nhập</span>
					</label>
					{/* TODO: Thay liên kết tạm khi có luồng đặt lại mật khẩu. */}
					<a href="#">Quên mật khẩu?</a>
				</div>
				<button className="auth-submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
					{isSubmitting && <span className="auth-submit__spinner" aria-hidden="true" />}
					Đăng nhập
				</button>
				{isSubmitting && <p className="auth-loading-text" role="status">Đang đăng nhập…</p>}
			</form>
		</AuthLayout>
	)
}

export default LoginPage
