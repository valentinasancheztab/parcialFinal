import { useState } from 'react'
import './App.css'

function App() {
  const [isLightMode, setIsLightMode] = useState(false)

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

  return (
    <div className={`dashboard ${isLightMode ? 'dashboard--light' : ''}`}>

      <header className="dashboard__header">
        <div className="dashboard__header-top">
          <span className="badge">TOP CLUB / BASKETBALL</span>
        </div>

        <div className="dashboard__header-main">
          <div className="dashboard__header-text">
            <h1>Central de Rendimiento</h1>
            <p>Administra convocatorias, analiza métricas clave y mantén la intensidad de juego en cada partido.</p>
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
            {isLightMode ? '🌙 Modo oscuro' : '☀️ Modo claro'}
          </button>
        </div>
      </header>

      <section className="score-board">
        <div className="score-board__team score-board__team--home">
          <h2 className="score-board__team-abbr">TCB</h2>
          <span className="score-board__team-name">TOP CLUB FLAMES</span>
        </div>
        
        <div className="score-board__score">
          <span className="score-board__number score-board__number--accent">98</span> 
          <span className="score-board__divider">-</span> 
          <span className="score-board__number">92</span>
        </div>
        
        <div className="score-board__team score-board__team--away">
          <h2 className="score-board__team-abbr">RIV</h2>
          <span className="score-board__team-name">RIVAL ALL-STARS</span>
        </div>
        
        <div className="score-board__info">
          <div className="badge badge--yellow">Q4 - 01:12</div>
          <div className="score-board__venue">ARENA CENTRAL - 10 NOV</div>
        </div>
      </section>

    </div>
  )
}

export default App
