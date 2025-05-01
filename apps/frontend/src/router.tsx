import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormPage } from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/offers" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
