import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'
import { chapters } from '../data/chapters.js'
import './HomePage.css'

const features = [
  {
    id: 'feature-learning',
    icon: 'book',
    title: 'Học theo chương',
    description: 'Đi từ khái niệm đầu tiên đến những kiến thức nền tảng.',
  },
  {
    id: 'luyen-tap',
    icon: 'quiz',
    title: 'Quiz có giải thích',
    description: 'Luyện từng câu hỏi và hiểu vì sao đáp án đúng.',
  },
  {
    id: 'hoi-ai',
    icon: 'chat',
    title: 'Hỏi AI khi bí',
    description: 'Nhận gợi ý dễ hiểu để tự tìm ra lời giải.',
  },
  {
    id: 'feature-visualization',
    icon: 'chart',
    title: 'Trực quan hóa',
    description: 'Quan sát thuật toán và cấu trúc dữ liệu qua hình ảnh.',
  },
]

const topics = ['Vòng lặp', 'Mảng', 'Đệ quy', 'Sắp xếp', 'Cây và đồ thị']

const learningSteps = [
  {
    number: '01',
    title: 'Học bài',
    description: 'Đọc bài ngắn, có ví dụ C++ và giải thích từng ý.',
  },
  {
    number: '02',
    title: 'Làm quiz',
    description: 'Kiểm tra điều vừa học bằng câu hỏi có lời giải.',
  },
  {
    number: '03',
    title: 'Xem tiến độ, hỏi AI',
    description: 'Theo dõi phần đã học và hỏi khi cần gợi ý.',
  },
]

function FeatureIcon({ name }) {
  const iconPaths = {
    book: <><path d="M5 4.75h9.5A2.5 2.5 0 0 1 17 7.25v12H7.5A2.5 2.5 0 0 0 5 21.75z" /><path d="M5 4.75v17M8 8h6M8 12h6" /></>,
    quiz: <><path d="M7 4.75h10A2.25 2.25 0 0 1 19.25 7v13.25H7A2.25 2.25 0 0 1 4.75 18V7A2.25 2.25 0 0 1 7 4.75Z" /><path d="m8.5 11 1.5 1.5 3-3M8.5 16h7" /></>,
    chat: <><path d="M4.75 5.75A2.75 2.75 0 0 1 7.5 3h9A2.75 2.75 0 0 1 19.25 5.75v7A2.75 2.75 0 0 1 16.5 15.5H11l-4.5 4v-4.2a2.75 2.75 0 0 1-1.75-2.55z" /><path d="M8 8h7M8 11.5h5" /></>,
    chart: <><path d="M4.75 19.25h14.5M7 16V9.5M12 16V5.75M17 16v-4.5" /><path d="M5 5.5h3" /></>,
  }

  return (
    <svg className="feature-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureCard({ feature }) {
  return (
    <article className="feature-card" id={feature.id}>
      <FeatureIcon name={feature.icon} />
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </article>
  )
}

function ChapterCard({ chapter }) {
  return (
    <Link className="chapter-card" to={`/chapters/${chapter.id}`}>
      <div className="chapter-card__topline">
        <span className="chapter-card__number">Chương {String(chapter.id).padStart(2, '0')}</span>
        <span className="chapter-card__level">{chapter.level}</span>
      </div>
      <h3>{chapter.title}</h3>
      <p className="chapter-card__description">{chapter.description}</p>
      <div className="chapter-card__bottomline">
        <span>{chapter.lessons} bài học</span>
        <span aria-hidden="true">·</span>
        <span>{chapter.questions} câu hỏi</span>
        <span className="chapter-card__arrow" aria-hidden="true"><ArrowIcon /></span>
      </div>
    </Link>
  )
}

function CodePreview() {
  return (
    <div className="hero-visual" aria-label="Ví dụ bài học có giải thích từ AI">
      <div className="code-window">
        <div className="code-window__bar">
          <span className="code-window__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="code-window__filename">main.cpp</span>
          <span className="code-window__language">C++</span>
        </div>
        <pre className="code-window__code" aria-label="Ví dụ vòng lặp for trong C++"><code>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">01</span><span><span className="code-token--keyword">#include</span> <span className="code-token--type">&lt;iostream&gt;</span></span></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">02</span><span /></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">03</span><span><span className="code-token--keyword">int</span> main() {'{'}</span></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">04</span><span>  <span className="code-token--keyword">for</span> (<span className="code-token--keyword">int</span> i = 1; i &lt;= 3; i++) {'{'}</span></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">05</span><span>    std::cout &lt;&lt; <span className="code-token--string">"Xin chào!"</span> &lt;&lt; std::endl;</span></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">06</span><span>  {'}'}</span></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">07</span><span>  <span className="code-token--keyword">return</span> 0;</span></span>
          <span className="code-line"><span className="code-line__number" aria-hidden="true">08</span><span>{'}'}</span></span>
        </code></pre>
        <div className="code-window__status"><span className="code-window__status-dot" /> Chạy thử chương trình</div>
      </div>
      <aside className="ai-note" aria-label="AI giải thích vòng lặp">
        <span className="ai-note__label"><span aria-hidden="true">✳</span> Gợi ý từ AI</span>
        <p>Vòng lặp <code>for</code> chạy 3 lần. Mỗi lần, giá trị <code>i</code> tăng thêm 1.</p>
      </aside>
    </div>
  )
}

function SortingIllustration() {
  return (
    <svg className="sorting-illustration" viewBox="0 0 460 228" role="img" aria-labelledby="sorting-title sorting-description">
      <title id="sorting-title">Mô phỏng các bước sắp xếp</title>
      <desc id="sorting-description">Các thanh có chiều cao khác nhau được sắp xếp từ thấp đến cao.</desc>
      <path className="sorting-illustration__baseline" d="M32 190H428" />
      <rect x="60" y="126" width="42" height="64" rx="5" />
      <rect x="122" y="102" width="42" height="88" rx="5" />
      <rect x="184" y="77" width="42" height="113" rx="5" />
      <rect x="246" y="58" width="42" height="132" rx="5" />
      <rect x="308" y="38" width="42" height="152" rx="5" />
      <rect x="370" y="20" width="42" height="170" rx="5" />
      <path className="sorting-illustration__arrow" d="M60 211h352m-8-8 8 8-8 8" />
      <text x="232" y="224" textAnchor="middle">từ nhỏ đến lớn</text>
    </svg>
  )
}

function HomePage() {
  return (
    <div className="home-page">
      <a className="skip-link" href="#main-content">Bỏ qua tới nội dung chính</a>
      <Header />

      <main id="main-content">
        <section className="hero-section" id="gioi-thieu" aria-labelledby="hero-title">
          <div className="hero-section__inner page-container">
            <div className="hero-copy">
              <p className="hero-copy__eyebrow">Bắt đầu học lập trình</p>
              <h1 id="hero-title">Học C++ từ số 0. AI luôn bên cạnh.</h1>
              <p className="hero-copy__description">Bài học ngắn gọn, bài tập vừa sức và lời giải thích dễ hiểu cho người mới bắt đầu.</p>
              <div className="hero-copy__actions">
                <Link className="button button--primary" to="#bai-hoc">Bắt đầu học miễn phí <ArrowIcon /></Link>
                <Link className="button button--text" to="#bai-hoc">Xem các chương</Link>
              </div>
              <p className="hero-copy__note">Học theo nhịp của bạn, không cần biết lập trình trước.</p>
            </div>
            <CodePreview />
          </div>
        </section>

        <section className="features-section page-container" aria-labelledby="features-title">
          <h2 className="visually-hidden" id="features-title">Công cụ hỗ trợ việc học</h2>
          <div className="feature-grid">
            {features.map((feature) => <FeatureCard key={feature.id} feature={feature} />)}
          </div>
        </section>

        <section className="chapters-section section-space" id="bai-hoc" aria-labelledby="chapters-title">
          <div className="page-container">
            <div className="section-heading">
              <h2 id="chapters-title">Bắt đầu từ những điều căn bản</h2>
              <p>7 chương được sắp xếp theo trình tự, để bạn học từng bước và luôn biết nên học gì tiếp theo.</p>
            </div>
            <p className="sample-data-note">Nội dung và số câu hỏi hiện là dữ liệu mẫu.</p>
            <div className="chapter-grid">
              {chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} />)}
            </div>
          </div>
        </section>

        <section className="visual-section section-space" id="truc-quan" aria-labelledby="visual-title">
          <div className="visual-section__inner page-container">
            <div className="visual-copy">
              <h2 id="visual-title">Nhìn thấy cách thuật toán hoạt động</h2>
              <p>Quan sát từng bước thay đổi để những khái niệm trừu tượng trở nên dễ hiểu hơn.</p>
              <ul className="topic-list" aria-label="Chủ đề trực quan hóa">
                {topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
            </div>
            <div className="sorting-panel">
              <div className="sorting-panel__heading">
                <span>Sắp xếp chọn</span>
                <span className="sorting-panel__step">Từng bước một</span>
              </div>
              <SortingIllustration />
              <p className="sorting-panel__caption">Các phần tử được sắp xếp từ nhỏ đến lớn.</p>
            </div>
          </div>
        </section>

        <section className="steps-section section-space" aria-labelledby="steps-title">
          <div className="page-container">
            <div className="section-heading section-heading--compact">
              <h2 id="steps-title">Một lộ trình, ba bước rõ ràng</h2>
              <p>Học, luyện tập và xem lại tiến độ trong cùng một nơi.</p>
            </div>
            <ol className="steps-grid">
              {learningSteps.map((step) => (
                <li className="step-item" key={step.number}>
                  <span className="step-item__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cta-section" id="lien-he" aria-labelledby="cta-title">
          <div className="cta-section__inner page-container">
            <div>
              <h2 id="cta-title">Sẵn sàng viết dòng code đầu tiên?</h2>
              <p>Bắt đầu hành trình học C++ theo cách dễ hiểu hơn.</p>
            </div>
            <Link className="button button--light" to="/register">Tạo tài khoản <ArrowIcon /></Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage