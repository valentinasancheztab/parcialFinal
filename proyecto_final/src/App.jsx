import { useState } from 'react'
import './App.css'

function App() {
  const [isLightMode, setIsLightMode] = useState(false)

  // --- DATOS DE LOS JUGADORES ---
  const [players] = useState([
    { id: '03', name: 'Kevin Harrell', team: 'Top Club', pos: 'Guard', pts: 24.5, reb: 4.1, ast: 6.8, eff: 27.4, age: 28, height: '1.93 m', weight: '95 kg' },
    { id: '05', name: 'James Fletcher', team: 'Top Club', pos: 'Center', pts: 18.9, reb: 11.7, ast: 2.4, eff: 25.1, age: 30, height: '2.11 m', weight: '115 kg' },
    { id: '14', name: 'Jeff Montes', team: 'Top Club', pos: 'Forward-Guard', pts: 21.2, reb: 6.5, ast: 4.9, eff: 24.8, age: 26, height: '2.01 m', weight: '100 kg' },
    { id: '00', name: 'Andre Wallace', team: 'Top Club', pos: 'Guard', pts: 18.3, reb: 3.8, ast: 6.5, eff: 24.2, age: 24, height: '1.88 m', weight: '88 kg' },
    { id: '30', name: 'Scott Dale', team: 'Top Club', pos: 'Forward', pts: 19.6, reb: 7.2, ast: 3.8, eff: 23.7, age: 27, height: '2.06 m', weight: '105 kg' },
    { id: '31', name: 'Stephen Curry', team: 'Golden State Warriors', pos: 'Guard', pts: 24.5, reb: 4.1, ast: 6.8, eff: 27.4, age: 37, height: '1.88 m', weight: '84 kg' },
    { id: '23', name: 'LeBron James', team: 'Los Angeles Lakers', pos: 'Forward', pts: 18.9, reb: 11.7, ast: 2.4, eff: 25.1, age: 41, height: '2.06 m', weight: '113 kg' },
    { id: '34', name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks', pos: 'Forward', pts: 21.2, reb: 6.5, ast: 4.9, eff: 24.8, age: 31, height: '2.11 m', weight: '110 kg' },
    { id: '77', name: 'Luka Doncic', team: 'Dallas Mavericks', pos: 'Guard', pts: 18.3, reb: 3.8, ast: 6.5, eff: 24.2, age: 27, height: '2.01 m', weight: '104 kg' },
    { id: '15', name: 'Nikola Jokic', team: 'Denver Nuggets', pos: 'Center', pts: 19.6, reb: 7.2, ast: 3.8, eff: 23.7, age: 31, height: '2.11 m', weight: '129 kg' }
  ]);

  // --- ESTADOS PARA LA TABLA Y EL MODAL ---
  const [searchTerm, setSearchTerm] = useState(''); // Para la barra de búsqueda
  const [favorites, setFavorites] = useState([]); // Arreglo para guardar los IDs favoritos
  const [sortConfig, setSortConfig] = useState({ key: 'eff', direction: 'desc' }); // Para ordenar la tabla
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Para abrir el modal

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // --- LÓGICA DE FAVORITOS ---
  const toggleFavorite = (playerId) => {
    if (favorites.includes(playerId)) {
      setFavorites(favorites.filter(id => id !== playerId));
    } else {
      setFavorites([...favorites, playerId]);
    }
  };

  return (
    <div className={`dashboard ${isLightMode ? 'dashboard--light' : ''}`}>
      <div className="dashboard__content">
        
        {/* --- SECCIÓN 1: HEADER --- */}
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

        {/* --- SECCIÓN 2: MARCADOR (Score) --- */}
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
            <div className="score-board__venue">ARENA CENTRAL - 18 NOV</div>
          </div>
        </section>

        {/* --- SECCIÓN BUSCADOR --- */}
        <section className="search-section">
          <label className="search-label">BUSCAR JUGADORES</label>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Escribe un nombre o equipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* --- TARJETAS DE ESTADÍSTICAS --- */}
        <div className="stats-grid">
          <div className="stat-card stat-card--yellow">
            <h3>JUGADORES EN TABLA</h3>
            <p className="stat-number">{players.length}</p>
            <span className="badge badge--dark">Favoritos: {favorites.length}</span>
          </div>

          <div className="stat-card">
            <h3>PROMEDIO DE PUNTOS</h3>
            <p className="stat-number">
              {(players.reduce((sum, p) => sum + p.pts, 0) / players.length).toFixed(1)}
            </p>
          </div>

          <div className="stat-card">
            <h3>PROMEDIO DE REBOTES</h3>
            <p className="stat-number">
              {(players.reduce((sum, p) => sum + p.reb, 0) / players.length).toFixed(1)}
            </p>
          </div>
          
          <div className="stat-card stat-card--leaders">
            <h3>LÍDERES</h3>
            <p className="leader-stat"><span>Anotador</span><br/>Kevin Harrell - 24.5 pts</p>
            <p className="leader-stat"><span>Eficiencia</span><br/>Kevin Harrell - 27.4 PER</p>
          </div>
        </div>

        {/* --- TABLA DE JUGADORES (Estilo Pixel-Perfect) --- */}
        <section className="table-section">
          <div className="table-wrapper">
            <table className="players-table">
              <thead>
                <tr>
                  <th>FAV</th>
                  <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}># <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>JUGADOR <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('team')} style={{ cursor: 'pointer' }}>EQUIPO <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('pos')} style={{ cursor: 'pointer' }} className="active-header">POSICIÓN <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('pts')} style={{ cursor: 'pointer' }}>PTS <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('reb')} style={{ cursor: 'pointer' }}>REB <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('ast')} style={{ cursor: 'pointer' }}>AST <span className="sort-icon"></span></th>
                  <th onClick={() => requestSort('eff')} style={{ cursor: 'pointer' }}>EFICIENCIA <span className="sort-icon"></span></th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player) => (
                  <tr key={player.id} onClick={() => setSelectedPlayer(player)}>
                    <td>
                      <button 
                        className={`fav-button ${favorites.includes(player.id) ? 'fav-active' : ''}`}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          toggleFavorite(player.id);
                        }}
                      >
                        <div className="star-icon"></div>
                      </button>
                    </td>
                    <td className="player-id-cell">{player.id.padStart(2, '0')}</td>
                    <td className="player-name-cell">{player.name}</td>
                    <td>{player.team}</td>
                    <td>{player.pos}</td>
                    <td>{player.pts}</td>
                    <td>{player.reb}</td>
                    <td>{player.ast}</td>
                    <td>{player.eff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- PAGINACIÓN --- */}
          <div className="table-pagination">
            <div className="pagination-left">
              <span>MOSTRAR</span>
              <select className="pagination-select">
                <option>5 por página</option>
                <option>10 por página</option>
              </select>
            </div>
            <div className="pagination-right">
              <button className="page-btn">«</button>
              <button className="page-btn">‹</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <button className="page-btn">›</button>
              <button className="page-btn">»</button>
            </div>
          </div>
        </section>

        {/* --- MODAL DE JUGADOR --- */}
        {selectedPlayer && (
          <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedPlayer(null)}>✖</button>
              <h2>{selectedPlayer.name}</h2>
              <p className="modal-team">{selectedPlayer.team} • {selectedPlayer.pos}</p>
              
              <div className="modal-stats-grid">
                <div className="m-stat"><span>PTS</span><strong>{selectedPlayer.pts}</strong></div>
                <div className="m-stat"><span>REB</span><strong>{selectedPlayer.reb}</strong></div>
                <div className="m-stat"><span>AST</span><strong>{selectedPlayer.ast}</strong></div>
                <div className="m-stat"><span>EFF</span><strong className="eff-text">{selectedPlayer.eff}</strong></div>
              </div>

              <button 
                className="modal-fav-btn"
                onClick={() => toggleFavorite(selectedPlayer.id)}
              >
                {favorites.includes(selectedPlayer.id) ? 'Quitar de Favoritos ⭐' : 'Añadir a Favoritos ⭐'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
