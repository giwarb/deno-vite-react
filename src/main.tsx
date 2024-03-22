import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return <h1>Hello World</h1>
}

ReactDOM.createRoot(document.getElementById('main')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
