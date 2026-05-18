# 📘 Guía de React Hooks + Proyecto Dashboard

---

## 📌 Tabla de contenido

- Introducción
- useState
- useEffect
- useMemo
- Cleanup en useEffect
- localStorage en React
- IA utilizada
- Autor
- Tecnologías usadas

---

## 🚀 Introducción

Este documento explica el uso de los principales **React Hooks** aplicados en un proyecto de dashboard interactivo de basketball.

Los hooks son funciones especiales de React que permiten manejar estado, efectos secundarios y optimización del rendimiento en componentes funcionales.

---

## ⚙️ useState

useState es un Hook que permite manejar estado en componentes funcionales de React.

### 📌 ¿Para qué se usa?

- Guardar información dinámica  
- Actualizar la interfaz  
- Manejar formularios  
- Favoritos  
- Modales  
- Filtros  
- Temas oscuro/claro  

---

### 🧠 Sintaxis

const [estado, setEstado] = useState(valorInicial)

---

### 🌗 Ejemplo 1: Cambio de tema (Modo oscuro / claro)

```js
const [isLightMode, setIsLightMode] = useState(false)

const toggleTheme = () => {
  setIsLightMode(!isLightMode)
}
```
Este estado permite alternar entre modo oscuro y modo claro en la interfaz.

### ⭐ Ejemplo 2: SISTEMA DE FAVORITOS
```js
const [favorites, setFavorites] = useState([])

const toggleFavorite = (playerId) => {
  if (favorites.includes(playerId)) {
    setFavorites(favorites.filter(id => id !== playerId))
  } else {
    setFavorites([...favorites, playerId])
  }
}
```
Este estado almacena los jugadores favoritos y permite agregarlos o eliminarlos dinámicamente.

### 🔶 Ejemplo 3: MODAL DE INFORMACIÓN DEL JUGADOR
```js
const [selectedPlayer, setSelectedPlayer] = useState(null)

onClick={() => setSelectedPlayer(player)}
```
Este estado guarda el jugador seleccionado para mostrar su información en un modal.

### 🔄 useEffect

useEffect permite ejecutar efectos secundarios en React.

### 📌 Casos de uso
- Llamadas a APIs
- Uso de localStorage
- Timers
- Eventos
- Debounce
- Sincronización de datos

### 🔁 Ejemplo 1: Ejecutar en cada render
```js
useEffect(() => {
  console.log('Se ejecuta en cada render')
})
```
Este efecto se ejecuta cada vez que el componente se renderiza, es decir, cada vez que hay un cambio en el estado o en las props.

### 🟢 Ejemplo 2: Ejecutar solo al montar el componente

```js
useEffect(() => {
  console.log('Se ejecuta solo una vez')
}, [])
```
Este efecto solo se ejecuta una vez, cuando el componente se monta, debido al array de dependencias vacío `[]`.

### 🔄 Ejemplo 3: Ejecutar cuando cambia una variable

```js
useEffect(() => {
  console.log('Cambia searchTerm')
}, [searchTerm])
```
Este efecto se ejecuta cada vez que la variable `searchTerm` cambia.

### 💾 Ejemplo 4: Guardar datos en localStorage

```js
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])
```
Este efecto guarda los jugadores favoritos en localStorage cada vez que cambian.

### ⚡ useMemo

useMemo sirve para optimizar el rendimiento evitando cálculos innecesarios en cada render.

### 📌 Casos de uso
- Filtros
- Ordenamientos
- Listas grandes
- Cálculos costosos

### 🧠 Ejemplo: Filtrar jugadores

```js
const filteredPlayers = useMemo(() => {
  return players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [players, searchTerm])
```
Este hook memoiza el resultado del filtro y solo se vuelve a ejecutar si cambia `players` o `searchTerm`.

### 🧹 Cleanup en useEffect

El cleanup es una función que React ejecuta antes de volver a ejecutar un effect o cuando el componente se desmonta.

### 📌 Ejemplo: Debounce

```js
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Buscando jugadores...')
  }, 500)

  return () => {
    clearTimeout(timer)
  }
}, [searchTerm])
```
Este patrón evita múltiples ejecuciones innecesarias y mejora el rendimiento.

### 💾 localStorage en React

localStorage permite guardar información en el navegador incluso después de recargar la página o cerrar el navegador.

### 📥 Guardar datos
```js
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])
📤 Recuperar datos
useEffect(() => {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites'))

  if (savedFavorites) {
    setFavorites(savedFavorites)
  }
}, [])
```
Este patrón permite persistir los jugadores favoritos en localStorage y recuperarlos cuando el componente se monta.

### 🤖 IA utilizada

### 🤖 ChatGPT — OpenAI

Uso en el proyecto:

- Explicación de React Hooks
- Optimización de código
- Estructuración de documentación

### 🤖 Gemini — Google

Uso en el proyecto:

- Revisión de código
- Explicación de código
- Ayuda en la corrección de errores
- Ayuda en la implementación de nuevas funcionalidades

### 🤖 CLAUDE — Anthropic

Uso en el proyecto:

- Ayuda en la implementación de nuevas funcionalidades
- Ayuda en la corrección de errores
- Ayuda en el Readme

### 👤 Autor

Valentina Sanchez

### 🛠️ Tecnologías usadas

- React
- JavaScript
- HTML5
- CSS3
- GitHub
- Netlify
