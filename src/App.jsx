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
      '"I am organizing a medical mission to a remote community in Palawan. We need funds for medicines, transportation, and supplies. Your generosity can help provide healthcare to those in need."',
    phone: '+63 945 335 6016',
    email: 'anthonyrealiza@gmail.com',
    facebook: 'Anthony John Vergel Realiza',
    photo: '/Student-picture-005.png',
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
      '"Our engineering team is competing in a national robotics competition. We need support for materials, registration fees, and travel expenses."',
    phone: '+63 953 2733 909',
    email: 'aarondimzon@gmail.com',
    facebook: 'Aaron Dimzon',
    photo: '/Student-picture-007.png',
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
      '"Our engineering team is competing in a national robotics competition. We need support for materials, registration fees, and travel expenses."',
    phone: '+63 991 096 7409',
    email: 'manuelsarabia163@gmail.com',
    facebook: 'Manuel Sarabia',
    photo: '/Student-picture-006.png',
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
      '"Our engineering team is competing in a national robotics competition. We need support for materials, registration fees, and travel expenses."',
    phone: '+63 912 345 6789',
    email: 'lyndontabinas@gmail.com',
    facebook: 'Lyndon Tabinas',
    photo: '/Student-picture-008.jpg',
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

/* ── Action Modal ────────────────────────────────────── */
function ActionModal({ isOpen, onClose, type, value, onPrev, onNext }) {
  if (!isOpen) return null;

  let title = '';
  let content = null;
  let headerIcon = null;

  const accentColor = type === 'phone' ? '#f59e0b' :
    type === 'email' ? '#0ea5e9' :
      type === 'facebook' ? '#1877f2' :
        '#10b981';

  switch (type) {
    case 'phone':
      title = 'Phone Number';
      headerIcon = <PhoneIcon />;
      content = <div className="modal-data-text" style={{ color: accentColor }}>{value || 'Not provided'}</div>;
      break;
    case 'email':
      title = 'Email Address';
      headerIcon = <MailIcon />;
      content = <div className="modal-data-text" style={{ color: accentColor }}>{value || 'Not provided'}</div>;
      break;
    case 'facebook':
      title = 'Facebook Profile';
      headerIcon = <FacebookIcon />;
      content = <div className="modal-data-text" style={{ color: accentColor }}>{value || 'Not provided'}</div>;
      break;
    case 'qr':
      title = 'Scan QR Code';
      headerIcon = <QrCodeOutlineIcon />;
      content = (
        <div style={{ textAlign: 'center', marginTop: 10, color: '#8a9ab5' }}>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', display: 'inline-block', marginBottom: '16px' }}>
            <QrCodeOutlineIcon style={{ width: 120, height: 120, display: 'block', color: '#1a1f3a' }} />
          </div>
          <p style={{ fontSize: '15px' }}>Official QR Code is being generated and will be updated shortly.</p>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal action-modal-premium" style={{ borderTop: `4px solid ${accentColor}` }}>
        <button className="modal-close-premium" onClick={onClose}>
          <CloseIcon />
        </button>

        <button className="modal-arrow-btn modal-arrow-left" onClick={onPrev}>
          <ChevronLeft />
        </button>
        <button className="modal-arrow-btn modal-arrow-right" onClick={onNext}>
          <ChevronRight />
        </button>

        <div className="action-modal-header" style={{ color: accentColor }}>
          <div className="icon-wrapper" style={{ background: `${accentColor}1A` }}>
            {headerIcon}
          </div>
          <h2 className="modal-title">{title}</h2>
        </div>

        <div className="action-modal-body">
          {content}
        </div>

        <div className="action-modal-footer">
          <button className="btn-premium-close" style={{ background: `${accentColor}1A`, color: accentColor }} onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Featured Card ───────────────────────────────────── */
function FeaturedCard({ student, total, index, onPrev, onNext, onDotClick, direction, animKey, onPause }) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [actionModal, setActionModal] = useState({ isOpen: false, type: '' })

  const actionTypes = ['phone', 'email', 'qr', 'facebook']

  function handleActionClick(type) {
    setActionModal({ isOpen: true, type })
    if (onPause) onPause(true)
  }

  function handleCloseModal() {
    setActionModal({ isOpen: false, type: '' })
    if (onPause) onPause(false)
  }

  function handleModalNext() {
    const currentIndex = actionTypes.indexOf(actionModal.type)
    const nextIndex = (currentIndex + 1) % actionTypes.length
    setActionModal({ ...actionModal, type: actionTypes[nextIndex] })
  }

  function handleModalPrev() {
    const currentIndex = actionTypes.indexOf(actionModal.type)
    const prevIndex = (currentIndex - 1 + actionTypes.length) % actionTypes.length
    setActionModal({ ...actionModal, type: actionTypes[prevIndex] })
  }

  function getValueForType(type) {
    if (type === 'phone') return student.phone
    if (type === 'email') return student.email
    if (type === 'facebook') return student.facebook
    return null
  }

  return (
    <div className={`featured-card ${isMinimized ? 'minimized' : 'expanded'}`} style={{ position: 'relative' }}>

      {/* Minimize/Maximize Toggle */}
      <button className="toggle-size-btn" onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? "Maximize" : "Minimize"}>
        {isMinimized ? <MaximizeIcon /> : <MinimizeIcon />}
      </button>

      {/* Nav arrows always accessible */}
      <button className="carousel-btn" onClick={onPrev} id="carousel-prev" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
        <ChevronLeft />
      </button>
      <button className="carousel-btn" onClick={onNext} id="carousel-next" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
        <ChevronRight />
      </button>

      {/* Animated content wrapper */}
      <div className={`card-slide card-slide-${direction}`} key={animKey} style={{ height: '100%' }}>

        {isMinimized ? (
          // --- MINIMIZED LAYOUT ---
          <div className="featured-minimized-layout">
            <div className="student-profile-top" style={{ marginBottom: 0, alignItems: 'center' }}>
              <div className="student-avatar-featured" style={{ width: 60, height: 60 }}>
                {student.photo
                  ? <img src={student.photo} alt={student.name} />
                  : <PersonIcon className="avatar-icon-placeholder" style={{ width: 30, height: 30 }} />
                }
              </div>
              <div className="student-info-featured" style={{ paddingTop: 0 }}>
                <div className="student-name-featured" style={{ fontSize: 20 }}>{student.name}</div>
                <div className="student-meta-featured" style={{ flexDirection: 'row', gap: 12 }}>
                  <div className="meta-row">
                    <BookIcon />
                    <span className="highlight">{student.course}</span>
                  </div>
                  <div className="meta-row">
                    <BuildingIcon />
                    <span>{student.school}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-actions minimized-actions">
              <button className="btn-call round-icon" title="Call" onClick={() => handleActionClick('phone')}>
                <PhoneIcon />
              </button>
              <button className="btn-email round-icon" title="Email" onClick={() => handleActionClick('email')}>
                <MailIcon />
              </button>
            </div>
          </div>
        ) : (
          // --- EXPANDED LAYOUT ---
          <div className="featured-expanded-layout">
            {/* Left Column: Image Background */}
            <div className="featured-left-image">
              <div className="image-wrapper">
                {student.photo ? (
                  <>
                    <img src={student.photo} alt={student.name} className="bg-image-blurred" />
                    <img src={student.photo} alt={student.name} className="bg-image-clear" />
                  </>
                ) : (
                  <div className="placeholder-bg">
                    <PersonIcon className="avatar-icon-placeholder big" />
                  </div>
                )}
                <div className="gradient-overlay"></div>
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="featured-right-info">

              <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'hidden', paddingRight: '4px' }}>
                <h2 style={{ textAlign: 'center', color: '#60a5fa', fontSize: '20px', letterSpacing: '4px', lineHeight: 1.2, marginBottom: '16px', fontWeight: 800, textTransform: 'uppercase' }}>
                  Be part of my <br /> graduation journey
                </h2>

                <div style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.5, fontWeight: 300 }}>
                  <p style={{ marginBottom: '12px' }}>
                    I am <strong style={{ color: '#fff', fontWeight: 600 }}>{student.name}</strong>, enthusiastically completing my degree in <span style={{ color: '#fff', fontWeight: 600 }}>{student.course === 'BSIT' ? 'Bachelor of Science in Information Technology' : student.course}</span> at <strong style={{ color: '#fff', fontWeight: 600 }}>{student.school || "St. John Paul II College of Davao"}</strong>.
                  </p>

                  <p style={{ marginBottom: '12px' }}>
                    This milestone isn't just a personal achievement—it's the culmination of shared struggles and unwavering support from people like you. As I approach the finish line, I am humbly reaching out to seek your generosity for my graduation fund.
                  </p>

                  <div style={{ marginBottom: '12px', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                    <p style={{ marginBottom: '6px', color: '#93c5fd', fontWeight: 600, fontSize: '12px' }}>Expected Expenses:</p>
                    <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: '20px', color: '#fff', fontWeight: 500, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '11.5px' }}>
                      <li>Graduation Fee</li>
                      <li>Pictorial</li>
                      <li>Toga Rental</li>
                      <li>Miscellaneous</li>
                    </ul>
                  </div>

                  <p style={{ marginBottom: '0px', fontStyle: 'italic', opacity: 0.9 }}>
                    Any amount you share will significantly alleviate these costs. Thank you so much for being part of my journey. To God be the Glory!
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="featured-actions icon-mode">
                <button className="btn-call round-icon" id="btn-call-featured" title="Call" onClick={() => handleActionClick('phone')}>
                  <PhoneIcon />
                </button>
                <button className="btn-email round-icon" id="btn-email-featured" title="Email" onClick={() => handleActionClick('email')}>
                  <MailIcon />
                </button>
                <button className="btn-qr round-icon" id="btn-qr-featured" title="QR Code" onClick={() => handleActionClick('qr')}>
                  <QrCodeOutlineIcon />
                </button>
                <button className="btn-facebook round-icon" id="btn-facebook-featured" title="Facebook" onClick={() => handleActionClick('facebook')}>
                  <FacebookIcon />
                </button>
              </div>

              {/* Dots at bottom of info */}
              <div className="carousel-dots-bottom">
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
          </div>
        )}

      </div> {/* end card-slide */}

      <ActionModal
        isOpen={actionModal.isOpen}
        type={actionModal.type}
        value={getValueForType(actionModal.type)}
        onClose={handleCloseModal}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
      />
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
          <div className="navbar-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', width: 44, height: 44, borderRadius: 8, padding: 4 }}>
            <img src="/Logo-Image.png" alt="Logo" className="navbar-logo-img" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ marginLeft: 12 }}>
            <div className="navbar-title">Graduation Solicitation</div>
            <div className="navbar-subtitle">Student fundraising profiles</div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="page-content">
        {/* Featured carousel */}
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
          />
        )}

        {/* Progress bar */}
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>

      </main>
    </>
  )
}
