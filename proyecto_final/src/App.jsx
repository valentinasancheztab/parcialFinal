import { useState } from 'react'
import './App.css'

function App() {
  // 1. Creamos la "memoria" (estado). 
  // isLightMode empieza siendo 'false' (osea, modo oscuro por defecto)
  const [isLightMode, setIsLightMode] = useState(false)

  // 2. Esta función se ejecuta cuando hacemos clic en el botón. 
  // Simplemente cambia el valor al contrario (de falso a verdadero y viceversa)
  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

  return (
    // 3. Magia: Si isLightMode es verdadero, le agregamos la clase CSS "light-mode"
    <div className={`dashboard-container ${isLightMode ? 'light-mode' : ''}`}>

      <header className="dashboard-header">
        <div className="header-top">
          <span className="badge">TOP CLUB / BASKETBALL</span>
        </div>

        <div className="header-main">
          <div className="header-text">
            <h1>Central de Rendimiento</h1>
            <p>Administra convocatorias, analiza métricas clave y mantén la intensidad de juego en cada partido.</p>
          </div>

          {/* 4. Le decimos al botón que al hacer clic (onClick) ejecute la función. 
              Además, el texto del botón cambia dependiendo del modo. */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {isLightMode ? '🌙 Modo oscuro' : '☀️ Modo claro'}
          </button>

        </div>
      </header>

    </div>
  )
}

export default App
