import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ApiPage from './pages/ApiPage.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api-data" element={<ApiPage />} />
      </Routes>
    </Layout>
  );
}

export default App;