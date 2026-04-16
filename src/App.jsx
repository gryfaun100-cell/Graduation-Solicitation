import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Sample data ─────────────────────────────────────── */
const INITIAL_STUDENTS = [
  {
    id: 1,
    name: 'Robert Louie B Hermoso',
    slug: 'Robert Louie Hermoso',
    course: 'BSIT',
    year: '4th Year',
    school: 'St. John Paul II College of Davao',
    solicitationTitle: 'Graduation Funds',
    description:
      'I am currently raising funds to support my upcoming graduation expenses. Your contribution will help cover essential costs such as graduation fees, attire, and other academic requirements. Any support is greatly appreciated as I work toward completing this important milestone.',
    phone: '+63 948 251 4126',
    email: 'roberthermoso003@gmail.com',
    facebook: 'Robert Louie Hermoso',
    photo: '/Student-picture-004.png',
    qrCode: '/qr-code-Robert.png',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Anthony John Vergel R Realiza',
    slug: 'Anthony John Vergel R Realiza',
    course: 'BSIT',
    year: '4th Year',
    school: 'St. John Paul II College of Davao',
    solicitationTitle: 'Graduation Funds',
    description:
      'I am Anthony John Vergel R. Realiza, a graduating BSIT student seeking kind support to help cover my graduation expenses such as fees, toga, and pictorial. Any contribution, big or small, would mean a lot to me and my family. Thank you for being part of this milestone.',
    phone: '+63 945 335 6016',
    email: 'anthonyrealiza@gmail.com',
    facebook: 'Anthony John Vergel Realiza',
    photo: '/Student-picture-005.png',
    qrCode: '/qr-code-Anthony.png',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Aaron Mark Y Dimzon',
    slug: 'Aaron Mark Y Dimzon',
    course: 'BSIT',
    year: '4th Year',
    school: 'St. John Paul II College of Davao',
    solicitationTitle: 'Graduation Fund',
    description:
      'I am Aaron Mark Y. Dimzon, proudly completing my BSIT degree and seeking generous support for my graduation-related expenses. Any help you extend will be greatly appreciated and will make a big difference in this important milestone. Thank you, and to God be the glory!',
    phone: '+63 953 2733 909',
    email: 'aarondimzon@gmail.com',
    facebook: 'Aaron Dimzon',
    photo: '/Student-picture-007.png',
    qrCode: '/qr-code-Aaron.png',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Manuel Ryan T Sarabia',
    slug: 'Manuel Ryan T Sarabia',
    course: 'BSIT',
    year: '4th Year',
    school: 'St. John Paul II College of Davao',
    solicitationTitle: 'Graduation Fund',
    description:
      'I am Manuel Ryan T. Sarabia, a 4th year BSIT student seeking support to help cover my graduation expenses such as yearbook, toga, fees, and pictorial. Any contribution would mean a lot to me and my family. Thank you from the bottom of my heart.',
    phone: '+63 991 096 7409',
    email: 'manuelsarabia163@gmail.com',
    facebook: 'Manuel Sarabia',
    photo: '/Student-picture-006.png',
    qrCode: '/qr-code-Manuel.png',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Lyndon A Tabinas',
    slug: 'Lyndon A Tabinas',
    course: 'BSIT',
    year: '4th Year',
    school: 'St. John Paul II College of Davao',
    solicitationTitle: 'Graduation Fund',
    description:
      'I am Lyndon A. Tabinas, a graduating BSIT student seeking support to help cover my graduation expenses such as fees, toga, and other needs. Any assistance is greatly appreciated. Thank you so much!',
    phone: '+63 912 345 6789',
    email: 'lyndontabinas@gmail.com',
    facebook: 'Lyndon Tabinas',
    photo: '/Student-picture-008.jpg',
    qrCode: '/qr-code-Lyndon.png',
    status: 'Active',
  },
]

/* ── Icons ───────────────────────────────────────────── */
function GradCapIcon({ style }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 2.18l7.69 4.18L12 13.36 4.31 9.36 12 5.18zM5 13.18v4l7 3.82 7-3.82v-4l-7 3.82-7-3.82z" />
    </svg>
  )
}

function PersonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, color: '#f59e0b' }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.86A16 16 0 0 0 14 15l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CopyIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> }
function QrIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3z" /><path d="M17 17h4v4" /><path d="M17 21h4" /></svg> }
function LinkIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> }
function EditIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> }
function TrashIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg> }
function UploadIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg> }
function FacebookIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg> }
function QrCodeOutlineIcon({ style }) { return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 17h.01" /><path d="M17 14h.01" /><path d="M17 17h.01" /><path d="M20 14h.01" /><path d="M20 17h.01" /><path d="M14 20h.01" /><path d="M17 20h.01" /><path d="M20 20h.01" /><path d="M7 7h.01" /><path d="M17 7h.01" /><path d="M7 17h.01" /></svg> }
function MinimizeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg> }
function MaximizeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg> }

/* ── Add Student Modal ───────────────────────────────── */
function AddStudentModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '', slug: '', course: '', year: '', school: '',
    photo: null, solicitationTitle: '', description: '', phone: '', email: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function generateSlug() {
    const slug = form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setForm(prev => ({ ...prev, slug }))
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm(prev => ({ ...prev, photo: url }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({
      id: Date.now(),
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      course: form.course,
      year: form.year,
      school: form.school,
      solicitationTitle: form.solicitationTitle,
      description: `"${form.description}"`,
      phone: form.phone,
      email: form.email,
      photo: form.photo,
      status: 'Active',
    })
    onClose()
  }

  const photoInputRef = useState(null)

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add New Student</h2>
          <button className="modal-close" onClick={onClose} id="close-modal-btn">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Row 1 – Name + Slug */}
          <div className="form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group">
              <label className="form-label">Full Name <span className="required">*</span></label>
              <input
                id="input-name"
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Slug <span className="required">*</span></label>
              <div className="slug-row">
                <input
                  id="input-slug"
                  className="form-input"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="juan-dela-cruz"
                />
                <button type="button" className="btn-generate" onClick={generateSlug} id="btn-generate-slug">
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* Row 2 – Course / Year / School */}
          <div className="form-grid-3" style={{ marginBottom: 16 }}>
            <div className="form-group">
              <label className="form-label">Course</label>
              <input id="input-course" className="form-input" name="course" value={form.course} onChange={handleChange} placeholder="BSIT" />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input id="input-year" className="form-input" name="year" value={form.year} onChange={handleChange} placeholder="3rd Year" />
            </div>
            <div className="form-group">
              <label className="form-label">School Name</label>
              <input id="input-school" className="form-input" name="school" value={form.school} onChange={handleChange} placeholder="University of..." />
            </div>
          </div>

          {/* Row 3 – Profile Picture */}
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Profile Picture</label>
            <label className="upload-area" htmlFor="photo-upload" id="upload-photo-label">
              <UploadIcon />
              {form.photo ? 'Photo selected ✓' : 'Upload Photo'}
            </label>
            <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
          </div>

          {/* Row 4 – Solicitation Title */}
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Solicitation Title <span className="required">*</span></label>
            <input
              id="input-solicitation-title"
              className="form-input"
              name="solicitationTitle"
              value={form.solicitationTitle}
              onChange={handleChange}
              placeholder="Fundraising for Thesis Project"
            />
          </div>

          {/* Row 5 – Description */}
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Description</label>
            <textarea
              id="input-description"
              className="form-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the purpose of the solicitation..."
            />
          </div>

          {/* Row 6 – Phone + Email */}
          <div className="form-grid" style={{ marginBottom: 8 }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input id="input-phone" className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+63 9xx xxx xxxx" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input id="input-email" className="form-input" name="email" value={form.email} onChange={handleChange} placeholder="student@email.com" type="email" />
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-create" id="btn-create-student">Create Student</button>
            <button type="button" className="btn-cancel" onClick={onClose} id="btn-cancel-modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Qr Modal ────────────────────────────────────────── */
function QrModal({ student, onClose }) {
  if (!student) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '360px', textAlign: 'center' }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ fontSize: '16px' }}>Scan to Support</h2>
          <button className="modal-close" onClick={onClose} id="close-qr-modal-btn">
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {student.qrCode ? (
            <img src={student.qrCode} alt={`${student.name} QR Code`} style={{ width: '100%', maxWidth: '280px', borderRadius: '16px', border: '2px solid var(--border-gold)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
          ) : (
            <div style={{ width: '100%', padding: '60px 20px', background: 'var(--glass-bg)', border: '1px dashed var(--border-subtle)', borderRadius: '16px', color: 'var(--text-muted)' }}>
              <QrCodeOutlineIcon style={{ width: 32, height: 32, marginBottom: '12px', opacity: 0.5 }} />
              <div>No QR Code available.</div>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '15px', color: 'var(--white)', fontWeight: '600' }}>{student.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--gold)' }}>{student.phone}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Featured Card (Template-011 Style) ──────────────── */
function FeaturedCard({ student, total, index, onPrev, onNext, onDotClick, direction, animKey, onPause, onShowQr }) {
  return (
    <div
      className="glass-card-wrapper"
      onMouseEnter={() => onPause && onPause(true)}
      onMouseLeave={() => onPause && onPause(false)}
    >
      {/* Nav Arrows */}
      <button className="carousel-btn glass-nav-prev" onClick={onPrev} id="carousel-prev" title="Previous">
        <ChevronLeft />
      </button>
      <button className="carousel-btn glass-nav-next" onClick={onNext} id="carousel-next" title="Next">
        <ChevronRight />
      </button>

      <div className={`card-slide card-slide-${direction}`} key={animKey}>
        <div className="glass-card">

          {/* Card Header: School */}
          <div className="glass-card-header">
            <div className="glass-card-school-icon">
              <GradCapIcon style={{ width: 18, height: 18, color: 'var(--gold)' }} />
            </div>
            <span className="glass-card-school-name">{student.school || 'St. John Paul II College of Davao'}</span>
            <div className="glass-card-header-dots">
              <span /><span /><span /><span />
            </div>
          </div>

          {/* 3-Column Body */}
          <div className="glass-card-body">

            <div className="glass-card-photo-col">
              <div className="glass-card-avatar">
                {student.photo
                  ? <img src={student.photo} alt={student.name} />
                  : <PersonIcon className="glass-avatar-placeholder" />
                }
              </div>
              <div className="glass-card-photo-details">
                <div className="glass-card-student-name">{student.name}</div>
                <div className="glass-card-meta-group">
                  <div className="glass-card-student-meta">
                    <BookIcon /> <span>{student.course}</span>
                  </div>
                  <div className="glass-card-student-meta">
                    <BuildingIcon /> <span>{student.year}</span>
                  </div>
                  <div className="glass-card-student-meta">
                    <GradCapIcon style={{ width: 13, height: 13 }} /> <span>Graduating Student</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2 — Description */}
            <div className="glass-card-info-col">
              <div className="glass-card-solicitation-label">
                <GradCapIcon style={{ width: 13, height: 13 }} />
                {student.solicitationTitle || 'Graduation Fund'}
              </div>
              <p className="glass-card-description">
                {student.description}
              </p>
            </div>

            {/* Col 3 — Contact Details + Actions */}
            <div className="glass-card-contact-col">
              <div className="glass-contact-heading">Contact Info</div>

              <div className="glass-contact-item">
                <div className="glass-contact-label">📱 Phone / GCash</div>
                <div className="glass-contact-value">{student.phone || 'N/A'}</div>
              </div>

              <div className="glass-contact-item">
                <div className="glass-contact-label">✉️ Email</div>
                <div className="glass-contact-value">{student.email || 'N/A'}</div>
              </div>

              <div className="glass-contact-item">
                <div className="glass-contact-label">👤 Facebook</div>
                <div className="glass-contact-value">{student.facebook || student.name}</div>
              </div>

              {/* Action Buttons */}
              <div className="glass-card-actions">
                <button
                  onClick={() => onShowQr(student)}
                  className="glass-action-btn glass-action-primary"
                  id="btn-qr-featured"
                >
                  <QrCodeOutlineIcon style={{ width: 17, height: 17 }} /> <span>GCash / QR</span>
                </button>
                <a
                  href={`mailto:${student.email}`}
                  className="glass-action-btn glass-action-secondary"
                  id="btn-email-featured"
                >
                  <MailIcon /> <span>Send Email</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="glass-carousel-dots">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => onDotClick(i)}
            role="button"
            aria-label={`Go to student ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── App ─────────────────────────────────────────────── */
export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [direction, setDirection] = useState('right')
  const [isPaused, setIsPaused] = useState(false)
  const [qrStudent, setQrStudent] = useState(null)
  const timerRef = useRef(null)

  const total = students.length

  // Auto-advance every 10 seconds
  useEffect(() => {
    if (total <= 1 || isPaused) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setDirection('right')
      setFeaturedIndex(i => (i + 1) % total)
    }, 10000)
    return () => clearInterval(timerRef.current)
  }, [total, isPaused])

  function resetTimer() {
    clearInterval(timerRef.current)
    if (isPaused) return
    timerRef.current = setInterval(() => {
      setDirection('right')
      setFeaturedIndex(i => (i + 1) % total)
    }, 10000)
  }

  function prevFeatured() {
    setDirection('left')
    setFeaturedIndex(i => (i - 1 + total) % total)
    resetTimer()
  }

  function nextFeatured() {
    setDirection('right')
    setFeaturedIndex(i => (i + 1) % total)
    resetTimer()
  }

  function goToDot(i) {
    setDirection(i > featuredIndex ? 'right' : 'left')
    setFeaturedIndex(i)
    resetTimer()
  }

  function addStudent(student) {
    setStudents(prev => {
      const next = [...prev, student]
      setFeaturedIndex(next.length - 1)
      return next
    })
  }

  function deleteStudent(id) {
    setStudents(prev => {
      const next = prev.filter(s => s.id !== id)
      if (next.length === 0) { setFeaturedIndex(0); return next }
      setFeaturedIndex(i => Math.min(i, next.length - 1))
      return next
    })
  }

  const featured = students[featuredIndex] || null
  const progressPercent = total ? ((featuredIndex + 1) / total) * 100 : 0

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" id="main-navbar">
        <div className="navbar-brand">
          <div className="navbar-top-row">
            <div className="navbar-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5a623', width: 44, height: 44, borderRadius: 10, padding: 4, boxShadow: '0 0 14px rgba(245,166,35,0.4)' }}>
              <img src="/Logo-Image.png" alt="Logo" className="navbar-logo-img" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div className="navbar-title">St. John Paul II College of Davao</div>
              <div className="navbar-subtitle">Class of 2026 · Graduation Solicitation</div>
            </div>
          </div>
          <div className="navbar-divider" />
        </div>
      </nav>

      {/* Main content */}
      <main className="page-content">

        {/* Hero Layout */}
        <div className="hero-section">

          {/* Compact Hero Info Row */}
          <div className="hero-left">
            <div className="hero-class-badge">
              <GradCapIcon style={{ width: 12, height: 12 }} />
              SJPII Davao · Class of 2026
            </div>

            <div className="hero-badge">
              <GradCapIcon style={{ width: 12, height: 12 }} />
              Support our Graduates
            </div>

            <h1 className="hero-heading">
              Help Us Cross the&nbsp;<span className="gold-text">Graduation Stage</span>
            </h1>

            <p className="hero-subtext">
              Browse profiles and help our graduating students celebrate their milestone.
            </p>

            <div className="hero-year-row">
              <div className="hero-year">2026</div>
              <div className="hero-year-text">Class Year</div>
            </div>

            <div className="hero-tap-hint">
              <GradCapIcon style={{ width: 12, height: 12 }} />
              Tap a profile to reach out and show your support
            </div>
          </div>

          {/* Full-Width Featured Card */}
          <div className="hero-right">
            <div className="progress-bar-wrap" style={{ width: '100%' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            {featured && (
              <FeaturedCard
                student={featured}
                total={total}
                index={featuredIndex}
                onPrev={prevFeatured}
                onNext={nextFeatured}
                onDotClick={goToDot}
                direction={direction}
                animKey={`${featuredIndex}-${direction}`}
                onPause={(paused) => setIsPaused(paused)}
                onShowQr={(student) => setQrStudent(student)}
              />
            )}
          </div>

        </div>
      </main>

      {/* QR Code Modal for specific student */}
      {qrStudent && <QrModal student={qrStudent} onClose={() => setQrStudent(null)} />}
    </>
  )
}
