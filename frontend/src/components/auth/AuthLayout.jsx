import { Link } from 'react-router-dom'
import Footer from '../layout/Footer.jsx'
import Header from '../layout/Header.jsx'

function AuthLayout({ title, subtitle, children, switchPrompt, switchLabel, switchTo }) {
  return (
    <div className="auth-page">
      <a className="skip-link" href="#main-content">Bỏ qua tới nội dung chính</a>
      <Header />
      <main className="auth-main" id="main-content">
        <div className="auth-layout page-container">
          <aside className="auth-intro" aria-label="Giới thiệu C++ cùng AI">
            <Link className="brand auth-intro__brand" to="/" aria-label="C++ cùng AI, về trang chủ">
              <span className="brand__mark" aria-hidden="true">C++</span>
              <span className="brand__name">C++ cùng AI</span>
            </Link>
            <h2>Học từng bước, viết code tự tin hơn.</h2>
            <p>Bài học C++ dễ hiểu, cùng AI gợi ý khi bạn cần.</p>
            <div className="auth-code-example" aria-label="Ví dụ học C++ có AI giải thích">
              <div className="auth-code-example__bar"><span>main.cpp</span><span>C++</span></div>
              <pre><code><span className="auth-code__keyword">for</span> (<span className="auth-code__keyword">int</span> i = 1; i &lt;= 3; i++) {'{'}
  std::cout &lt;&lt; <span className="auth-code__string">"Xin chào!"</span>;
{'}'}</code></pre>
              <div className="auth-ai-note"><span>Gợi ý từ AI</span><p>Vòng lặp chạy 3 lần. Mỗi lượt, <code>i</code> tăng thêm 1.</p></div>
            </div>
          </aside>

          <section className="auth-form-column" aria-labelledby="auth-title">
            <div className="auth-card">
              <div className="auth-card__heading">
                <h1 id="auth-title">{title}</h1>
                <p>{subtitle}</p>
              </div>
              {children}
              <p className="auth-switch">{switchPrompt} <Link to={switchTo}>{switchLabel}</Link></p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout