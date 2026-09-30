import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner page-container">
        <Link className="brand brand--footer" to="/" aria-label="C++ cùng AI, về trang chủ">
          <span className="brand__mark" aria-hidden="true">C++</span>
          <span className="brand__name">C++ cùng AI</span>
        </Link>
        <p className="site-footer__project">Đồ án website hỗ trợ học lập trình C++ cơ bản.</p>
        <nav className="footer-navigation" aria-label="Liên kết cuối trang">
          <a href="#gioi-thieu">Giới thiệu</a>
          <a href="#lien-he">Liên hệ</a>
          <a href="https://github.com">GitHub</a>
        </nav>
        <p className="site-footer__copyright">© C++ cùng AI · Đồ án học tập</p>
      </div>
    </footer>
  )
}

export default Footer