/*
 * DỮ LIỆU GIẢ - KHÔNG DÙNG CHO SẢN PHẨM THẬT, sẽ thay bằng API backend (JWT).
 * Mật khẩu chỉ băm SHA-256 để thử giao diện; backend thật cần dùng bcrypt.
 */
const USERS_KEY = 'cpp_mock_users'
const SESSION_KEY = 'cpp_auth_session'

function waitForMockRequest() {
	return new Promise((resolve) => window.setTimeout(resolve, 500))
}

function readUsers() {
	try {
		const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
		return Array.isArray(users) ? users : []
	} catch {
		return []
	}
}

async function hashPassword(password) {
	const bytes = new TextEncoder().encode(password)
	const digest = await crypto.subtle.digest('SHA-256', bytes)
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function createToken() {
	return crypto.randomUUID()
}

function createError(code) {
	const error = new Error(code)
	error.code = code
	return error
}

function toPublicUser(user) {
	return { id: user.id, name: user.name, email: user.email }
}

export async function login({ email, password }) {
	// TODO: Khi backend sẵn sàng, thay bằng axios.post('/api/auth/login', { email, password }).
	await waitForMockRequest()
	const normalizedEmail = email.trim().toLowerCase()
	const passwordHash = await hashPassword(password)
	const user = readUsers().find((item) => item.email === normalizedEmail && item.passwordHash === passwordHash)

	if (!user) {
		throw createError('INVALID_CREDENTIALS')
	}

	return { user: toPublicUser(user), token: createToken() }
}

export async function register({ name, email, password }) {
	// TODO: Khi backend sẵn sàng, thay bằng axios.post('/api/auth/register', { name, email, password }).
	await waitForMockRequest()
	const normalizedName = name.trim()
	const normalizedEmail = email.trim().toLowerCase()
	const users = readUsers()

	if (users.some((user) => user.email === normalizedEmail)) {
		throw createError('EMAIL_EXISTS')
	}

	const user = {
		id: createToken(),
		name: normalizedName,
		email: normalizedEmail,
		passwordHash: await hashPassword(password),
	}
	users.push(user)
	localStorage.setItem(USERS_KEY, JSON.stringify(users))

	return { user: toPublicUser(user), token: createToken() }
}

export async function logout() {
	await waitForMockRequest()
	localStorage.removeItem(SESSION_KEY)
	sessionStorage.removeItem(SESSION_KEY)
}
