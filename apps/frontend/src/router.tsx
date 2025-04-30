import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalDetailsForm from './pages/PersonalDetailsForm';
import LoanDetailsForm from './pages/LoanDetailsForm';
import ResultsPage from './pages/ResultsPage';


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonalDetailsForm />} />
        <Route path="/loan" element={<LoanDetailsForm />} />
        <Route path="/offers" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
