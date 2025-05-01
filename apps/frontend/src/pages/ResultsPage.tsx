import { useEffect, useState } from 'react';
import { LenderOffer } from '@driva/types';
import { submitLoanApplication } from "../api/";

export default function ResultsPage() {
  const [offers, setOffers] = useState<LenderOffer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const personal = localStorage.getItem('personalDetails');
    const loan = localStorage.getItem('loanDetails');

    if (!personal || !loan) {
      setError('Missing application data.');
      setLoading(false);
      return;
    }

    const payload = { ...JSON.parse(personal), ...JSON.parse(loan) };

    submitLoanApplication(payload)
      .then((lenderOffers: LenderOffer[]) => {
        console.log(lenderOffers);
        setOffers(lenderOffers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'An error occurred.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading loan offers...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!offers?.length) return <p>No lenders available.</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Loan Offers</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {offers.map((lender, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              background: '#fff',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem' }}>{lender.lenderName}</h3>
            <p>
              <strong>Monthly Repayment:</strong> ${lender.monthlyRepayment.toFixed(2)}
            </p>
            <p>
              <strong>Interest Rate:</strong> {lender.interestRate}% APR
            </p>
            <p>
              <strong>Fees:</strong> {lender.fees}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
