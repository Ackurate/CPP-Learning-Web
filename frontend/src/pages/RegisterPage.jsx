import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import PasswordField from '../components/auth/PasswordField.jsx'
import TextField from '../components/auth/TextField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validateName, validatePassword, validateRegistration } from '../utils/validators.js'
import './AuthPage.css'

function passwordStrength(password) {
	if (!password) return 0
	const meetsBasics = password.length >= 8 && /[a-zA-ZÀ-ỹ]/.test(password) && /\d/.test(password)
	if (!meetsBasics) return 1
	if (password.length >= 12 && /[^a-zA-ZÀ-ỹ\d]/.test(password)) return 3
	return 2
}

function RegisterPage() {
	const { isAuthenticated, register } = useAuth()
	const navigate = useNavigate()
	const nameRef = useRef(null)
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const confirmPasswordRef = useRef(null)
	const termsRef = useRef(null)
	const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false })
	const [errors, setErrors] = useState({})
	const [formError, setFormError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const strength = passwordStrength(values.password)
	const strengthLabel = ['', 'Yếu', 'Trung bình', 'Mạnh'][strength]

	useEffect(() => {
		document.title = 'Đăng ký | Học C++'
	}, [])

	if (isAuthenticated) return <Navigate to="/" replace />

	function focusFirstError(nextErrors) {
		const firstField = ['name', 'email', 'password', 'confirmPassword', 'terms'].find((field) => nextErrors[field])
		const fields = {
			name: nameRef,
			email: emailRef,
			password: passwordRef,
			confirmPassword: confirmPasswordRef,
			terms: termsRef,
		}
		fields[firstField]?.current?.focus()
	}

	function validateField(field, value, currentValues = values) {
		const validators = {
			name: validateName,
			email: validateEmail,
			password: validatePassword,
			confirmPassword: (input) => input === currentValues.password ? '' : 'Mật khẩu nhập lại chưa khớp.',
			terms: (input) => input ? '' : 'Bạn cần đồng ý với điều khoản để tiếp tục.',
		}
		const message = validators[field](value)
		setErrors((current) => ({ ...current, [field]: message }))
		return message
	}

	function updateField(field, value) {
		const nextValues = { ...values, [field]: value }
		setValues(nextValues)
		setFormError('')

		if (errors[field]) validateField(field, value, nextValues)
		if (field === 'password' && errors.confirmPassword) {
			validateField('confirmPassword', nextValues.confirmPassword, nextValues)
		}
	}

	async function handleSubmit(event) {
		event.preventDefault()
		setFormError('')
		const nextErrors = validateRegistration(values)
		setErrors(nextErrors)

		if (Object.values(nextErrors).some(Boolean)) {
			focusFirstError(nextErrors)
			return
		}

		setIsSubmitting(true)
		try {
			await register({
				name: values.name.trim(),
				email: values.email.trim().toLowerCase(),
				password: values.password,
			})
			navigate('/', { replace: true })
		} catch (error) {
			if (error.code === 'EMAIL_EXISTS') {
				setErrors((current) => ({ ...current, email: 'Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.' }))
				emailRef.current?.focus()
			} else {
				setFormError('Chưa thể tạo tài khoản lúc này. Vui lòng thử lại.')
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AuthLayout
			title="Tạo tài khoản"
			subtitle="Bắt đầu học C++ theo nhịp của bạn."
			switchPrompt="Đã có tài khoản?"
			switchLabel="Đăng nhập"
			switchTo="/login"
		>
			<form className="auth-form" noValidate onSubmit={handleSubmit}>
				{formError && <p className="auth-form__alert" role="alert">{formError}</p>}
				<TextField
					id="register-name"
					label="Họ và tên"
					name="name"
					value={values.name}
					onChange={(event) => updateField('name', event.target.value)}
					onBlur={(event) => validateField('name', event.target.value)}
					autoComplete="name"
					error={errors.name}
					inputRef={nameRef}
				/>
				<TextField
					id="register-email"
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
					id="register-password"
					label="Mật khẩu"
					name="password"
					value={values.password}
					onChange={(event) => updateField('password', event.target.value)}
					onBlur={(event) => validateField('password', event.target.value)}
					autoComplete="new-password"
					hint="Tối thiểu 8 ký tự, gồm ít nhất 1 chữ cái và 1 chữ số."
					error={errors.password}
					inputRef={passwordRef}
				/>
				<div className="auth-strength" aria-live="polite" aria-label={`Độ mạnh mật khẩu: ${strengthLabel || 'chưa có'}`}>
					<span>Độ mạnh mật khẩu</span><strong>{strengthLabel || 'Chưa nhập'}</strong>
					<div className="auth-strength__track" aria-hidden="true">
						{[1, 2, 3].map((level) => (
							<span
								className={`auth-strength__segment${strength >= level ? ' is-active' : ''}`}
								data-level={level}
								key={level}
							/>
						))}
					</div>
				</div>
				<PasswordField
					id="register-confirm-password"
					label="Nhập lại mật khẩu"
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={(event) => updateField('confirmPassword', event.target.value)}
					onBlur={(event) => validateField('confirmPassword', event.target.value)}
					autoComplete="new-password"
					error={errors.confirmPassword}
					inputRef={confirmPasswordRef}
				/>
				<div className="auth-terms">
					<label className="auth-checkbox" htmlFor="register-terms">
						<input
							ref={termsRef}
							id="register-terms"
							name="terms"
							type="checkbox"
							checked={values.terms}
							onChange={(event) => updateField('terms', event.target.checked)}
							aria-invalid={errors.terms ? 'true' : undefined}
							aria-describedby={errors.terms ? 'register-terms-error' : undefined}
						/>
						<span>Tôi đồng ý với</span>
					</label>
					<a href="#">điều khoản sử dụng</a>
					{errors.terms && <p className="auth-field__error" id="register-terms-error" role="alert">{errors.terms}</p>}
				</div>
				<button className="auth-submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
					{isSubmitting && <span className="auth-submit__spinner" aria-hidden="true" />}
					Tạo tài khoản
				</button>
				{isSubmitting && <p className="auth-loading-text" role="status">Đang tạo tài khoản…</p>}
			</form>
		</AuthLayout>
	)
}

export default RegisterPage
