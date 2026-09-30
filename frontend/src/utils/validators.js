const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateName(value) {
  const name = value.trim()
  if (name.length < 2 || name.length > 50) return 'Họ tên cần có từ 2 đến 50 ký tự.'
  return ''
}

export function validateEmail(value) {
  const email = value.trim().toLowerCase()
  if (!email) return 'Vui lòng nhập email.'
  if (!EMAIL_PATTERN.test(email)) return 'Email chưa đúng định dạng.'
  return ''
}

export function validatePassword(value) {
  if (!value) return 'Vui lòng nhập mật khẩu.'
  if (value.length < 8) return 'Mật khẩu cần có ít nhất 8 ký tự.'
  if (!/[a-zA-ZÀ-ỹ]/.test(value) || !/\d/.test(value)) {
    return 'Mật khẩu cần có ít nhất 1 chữ cái và 1 chữ số.'
  }
  return ''
}

export function validateLogin(values) {
  return {
    email: validateEmail(values.email),
    password: validatePasswordForLogin(values.password),
  }
}

function validatePasswordForLogin(value) {
  return value ? '' : 'Vui lòng nhập mật khẩu.'
}

// Chuẩn hóa dữ liệu tại một chỗ để giao diện và authService dùng cùng quy tắc.
export function validateRegistration(values) {
  const errors = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword: values.confirmPassword === values.password ? '' : 'Mật khẩu nhập lại chưa khớp.',
    terms: values.terms ? '' : 'Bạn cần đồng ý với điều khoản để tiếp tục.',
  }

  return errors
}