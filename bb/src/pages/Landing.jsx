import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you! We'll notify you at ${email} when we launch!`)
    setEmail('')
  }

  const handleGetStarted = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/login')
  }

  return (
    <div className="theme-voxel">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">Build Buddy</div>
          <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>buildBuddy</h1>
          <p>Connect, Build, and Collaborate with student builders and makers worldwide</p>
          <button className="btn-voxel" onClick={handleGetStarted}>GET STARTED</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">Why Build Buddy?</h2>
        <div className="card-grid">
          <div className="voxel-card">
            <h3>Find Your Team</h3>
            <p>Connect with passionate student builders who share your interests and skills. Build amazing projects together.</p>
          </div>
          <div className="voxel-card">
            <h3>Showcase Projects</h3>
            <p>Display your work, get feedback, and inspire others. Your portfolio is your power.</p>
          </div>
          <div className="voxel-card">
            <h3>Learn & Grow</h3>
            <p>Join a community that celebrates learning. Share knowledge, ask questions, and level up together.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section" id="projects">
        <h2 className="section-title">Explore Projects</h2>


        <div className="domains-grid">
          {/* AI */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🧠</span>
            </div>
            <h3>AI</h3>
            <div className="dot-separator"></div>
            <p>Build intelligent models and prototypes — from NLP to vision, guided mentoring & starter templates.</p>
          </div>

          {/* AIML */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🤖</span>
            </div>
            <h3>AIML</h3>
            <div className="dot-separator"></div>
            <p>Hands-on ML projects: training pipelines, experiments tracking and simple deployment examples.</p>
          </div>

          {/* Web Development */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🌐</span>
            </div>
            <h3>Web Development</h3>
            <div className="dot-separator"></div>
            <p>Responsive sites, component-based UIs, and performance-first landing pages with smooth interactions.</p>
          </div>

          {/* Mobile App */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">📱</span>
            </div>
            <h3>Mobile App</h3>
            <div className="dot-separator"></div>
            <p>Prototype mobile experiences, cross-platform layouts and simple backend integration guides.</p>
          </div>

          {/* Cloud */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">☁️</span>
            </div>
            <h3>Cloud</h3>
            <div className="dot-separator"></div>
            <p>Cloud infrastructure basics, serverless functions, and scalable deployment patterns for modern apps.</p>
          </div>

          {/* DevOps */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🛠️</span>
            </div>
            <h3>DevOps</h3>
            <div className="dot-separator"></div>
            <p>CI/CD examples, containerization, and deployment recipes to ship projects reliably.</p>
          </div>

          {/* Data Science */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">📊</span>
            </div>
            <h3>Data Science</h3>
            <div className="dot-separator"></div>
            <p>Exploratory analysis, visualization templates, and basic model evaluation walkthroughs.</p>
          </div>

          {/* Blockchain */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🕸️</span>
            </div>
            <h3>Blockchain</h3>
            <div className="dot-separator"></div>
            <p>Smart contract demos, wallet interactions and idea-to-prototype guidance.</p>
          </div>

          {/* Cybersecurity */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🔒</span>
            </div>
            <h3>Cybersecurity</h3>
            <div className="dot-separator"></div>
            <p>Security fundamentals, basic vulnerability scanning, and safe coding practice guides.</p>
          </div>

          {/* Game Development */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🎮</span>
            </div>
            <h3>Game Development</h3>
            <div className="dot-separator"></div>
            <p>Small game jams, engine basics, and visual scripting introductions for beginners.</p>
          </div>

          {/* AR/VR */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">🥽</span>
            </div>
            <h3>AR/VR</h3>
            <div className="dot-separator"></div>
            <p>Immersive experiences, spatial design principles, and getting started with XR frameworks.</p>
          </div>

          {/* IoT */}
          <div className="domain-card">
            <div className="icon-wrapper">
              <span className="domain-icon">📡</span>
            </div>
            <h3>IoT</h3>
            <div className="dot-separator"></div>
            <p>Connected devices, sensor integration tutorials, and real-time data streaming examples.</p>
          </div>
        </div>      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2><strong>JOIN NOW</strong></h2>
          <button className="cta-button" onClick={handleSignUp}>SIGN UP</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Build Buddy. Built by students, for students.</p>
      </footer>
    </div>
  )
}

export default Landing
