import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import TokenMap from './pages/TokenMap'
import Solution from './pages/Solution'
import RolePlay from './pages/RolePlay'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/token-map" element={<TokenMap />} />
          <Route path="/token-map/:id" element={<TokenMap />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/solution/:id" element={<Solution />} />
          <Route path="/role-play" element={<RolePlay />} />
          <Route path="/role-play/:sessionId" element={<RolePlay />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
