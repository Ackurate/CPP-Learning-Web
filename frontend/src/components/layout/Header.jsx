import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const navigation = [
  { label: 'Bài học', href: '#bai-hoc' },
  { label: 'Luyện tập', href: '#luyen-tap' },
  { label: 'Trực quan', href: '#truc-quan' },
  { label: 'Hỏi AI', href: '#hoi-ai' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function handleMenuKeyDown(event) {
    if (event.key === 'Escape') {
      closeMenu()
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header className="site-header">
      <div className="site-header__inner page-container" onKeyDown={handleMenuKeyDown}>
        <Link className="brand" to="/" aria-label="C++ cùng AI, về trang chủ">
          <span className="brand__mark" aria-hidden="true">C++</span>
          <span className="brand__name">C++ cùng AI</span>
        </Link>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <nav
          className={`primary-navigation${isMenuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Điều hướng chính"
        >
          <ul className="primary-navigation__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} onClick={closeMenu}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="primary-navigation__actions">
            <Link className="button button--outline button--small" to="/login" onClick={closeMenu}>
              Đăng nhập
            </Link>
            <Link className="button button--primary button--small" to="#bai-hoc" onClick={closeMenu}>
              Bắt đầu học
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header