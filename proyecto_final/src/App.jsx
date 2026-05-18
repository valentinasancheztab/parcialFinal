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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); // Historial de búsqueda
  const [favorites, setFavorites] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'eff', direction: 'desc' });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(5); // Jugadores por página

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

  // --- LÓGICA DE BÚSQUEDA CON HISTORIAL ---
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear a página 1 al buscar
    if (value.trim() && !searchHistory.includes(value.trim())) {
      setSearchHistory(prev => [value.trim(), ...prev].slice(0, 5)); // máximo 5 en historial
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const clearHistory = () => setSearchHistory([]);

  // --- LÓGICA DE PAGINACIÓN ---
  const totalPages = Math.max(1, Math.ceil(sortedPlayers.length / itemsPerPage));
  const paginatedPlayers = sortedPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
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

        {/* === PANEL PRINCIPAL (recuadro oscuro de fondo) === */}
        <div className="main-panel">

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
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchTerm && (
              <button className="search-clear-btn" onClick={clearSearch}>✖</button>
            )}
            {searchTerm && (
              <button className="search-limpiar-btn" onClick={clearSearch}>Limpiar</button>
            )}
          </div>
        </section>

        {/* --- TARJETAS DE ESTADÍSTICAS --- */}
        <div className="stats-grid">
          <div className="stat-card stat-card--yellow">
            <h3>JUGADORES EN TABLA</h3>
            <p className="stat-number">{filteredPlayers.length}</p>
            <span className="badge badge--dark">Favoritos: {favorites.length}</span>
          </div>

          <div className="stat-card">
            <h3>PROMEDIO DE PUNTOS</h3>
            <p className="stat-number">
              {filteredPlayers.length > 0
                ? (filteredPlayers.reduce((sum, p) => sum + p.pts, 0) / filteredPlayers.length).toFixed(1)
                : '0.0'}
            </p>
          </div>

          <div className="stat-card">
            <h3>PROMEDIO DE REBOTES</h3>
            <p className="stat-number">
              {filteredPlayers.length > 0
                ? (filteredPlayers.reduce((sum, p) => sum + p.reb, 0) / filteredPlayers.length).toFixed(1)
                : '0.0'}
            </p>
          </div>

          <div className="stat-card stat-card--leaders">
            <h3>LÍDERES</h3>
            {filteredPlayers.length > 0 ? (
              <>
                <p className="leader-stat"><span>Anotador</span><br />{sortedPlayers[0]?.name} - {sortedPlayers[0]?.pts} pts</p>
                <p className="leader-stat"><span>Eficiencia</span><br />{sortedPlayers[0]?.name} - {sortedPlayers[0]?.eff} PER</p>
              </>
            ) : (
              <p className="leader-stat">Sin datos</p>
            )}
          </div>

          {/* --- HISTORIAL DE BÚSQUEDA --- */}
          {searchHistory.length > 0 && (
            <div className="stat-card stat-card--history">
              <div className="history-header">
                <h3>HISTORIAL DE BÚSQUEDA</h3>
                <button className="history-clear-btn" onClick={clearHistory}>Limpiar</button>
              </div>
              <div className="history-chips">
                {searchHistory.map((term, i) => (
                  <button key={i} className="history-chip" onClick={() => handleSearch(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
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
                {paginatedPlayers.length > 0 ? paginatedPlayers.map((player) => (
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
                )) : (
                  <tr><td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No se encontraron jugadores</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINACIÓN FUNCIONAL --- */}
          <div className="table-pagination">
            <div className="pagination-left">
              <span>MOSTRAR</span>
              <select className="pagination-select" value={itemsPerPage} onChange={handleItemsPerPage}>
                <option value={5}>5 por página</option>
                <option value={10}>10 por página</option>
                <option value={15}>15 por página</option>
              </select>
              <span className="pagination-info">
                {Math.min((currentPage - 1) * itemsPerPage + 1, sortedPlayers.length)}-{Math.min(currentPage * itemsPerPage, sortedPlayers.length)} de {sortedPlayers.length}
              </span>
            </div>
            <div className="pagination-right">
              <button className="page-btn" onClick={() => goToPage(1)} disabled={currentPage === 1}>«</button>
              <button className="page-btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="page-btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
              <button className="page-btn" onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>»</button>
            </div>
          </div>
        </section>

        </div>{/* === FIN PANEL PRINCIPAL === */}

        {selectedPlayer && (
          <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
            <div className="modal-content-wide" onClick={(e) => e.stopPropagation()}>

              {/* --- Barra Superior (Gris) --- */}
              <div className="modal-top-bar">
                <h2>{selectedPlayer.name}</h2>
                <button className="modal-close-icon" onClick={() => setSelectedPlayer(null)}>✖</button>
              </div>

              {/* --- Cuerpo Principal (Morado) --- */}
              <div className="modal-body-content">

                {/* Placa y Botón Favorito */}
                <div className="modal-badge-row">
                  <div className="badge-group">
                    <span className="badge badge--yellow">{selectedPlayer.pos.toUpperCase()}</span>
                    <span className="player-id-faint">#{selectedPlayer.id}</span>
                  </div>
                  <button
                    className={`modal-fav-btn-small ${favorites.includes(selectedPlayer.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(selectedPlayer.id)}
                  >
                    ★ Favorito
                  </button>
                </div>

                {/* Cuadrícula de Información */}
                <div className="modal-info-grid">
                  <div className="info-col">
                    <div className="info-item">
                      <span className="info-label">EQUIPO</span>
                      <span className="info-value">{selectedPlayer.team}</span>
                    </div>
                    <div className="info-item mt-custom">
                      <span className="info-label">ALTURA</span>
                      <span className="info-value">{selectedPlayer.height}</span>
                    </div>
                  </div>

                  <div className="info-col">
                    <div className="info-item">
                      <span className="info-label">EDAD</span>
                      <span className="info-value">{selectedPlayer.age} años</span>
                    </div>
                    <div className="info-item mt-custom">
                      <span className="info-label">PESO</span>
                      <span className="info-value">{selectedPlayer.weight}</span>
                    </div>
                  </div>

                  <div className="info-col align-bottom">
                    <div className="info-item mt-custom">
                      <span className="info-label">ASISTENCIAS</span>
                      <span className="info-value">{selectedPlayer.ast}</span>
                    </div>
                  </div>
                </div>

                {/* Tarjetas Grandes */}
                <div className="modal-big-stats">
                  <div className="big-card bg-yellow">
                    <span className="big-label">PUNTOS</span>
                    <span className="big-val">{selectedPlayer.pts}</span>
                  </div>
                  <div className="big-card bg-dark">
                    <span className="big-label">REBOTES</span>
                    <span className="big-val">{selectedPlayer.reb}</span>
                  </div>
                  <div className="big-card bg-white">
                    <span className="big-label">EFICIENCIA</span>
                    <span className="big-val text-yellow">{selectedPlayer.eff}</span>
                  </div>
                </div>

                {/* Botón Cerrar Abajo */}
                <div className="modal-footer">
                  <button className="modal-close-btn" onClick={() => setSelectedPlayer(null)}>
                    Cerrar
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
