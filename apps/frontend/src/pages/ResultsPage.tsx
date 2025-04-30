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
      .then(( lenderOffers: LenderOffer[]) => {
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
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Loan Offers</h2>
      <ul>
        {offers.map((lender, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <strong>{lender.lenderName}</strong><br />
            Monthly Repayment: ${lender.monthlyRepayment.toFixed(2)}<br />
            Interest Rate: {lender.interestRate}% APR<br />
            Fees: ${lender.fees}
          </li>
        ))}
      </ul>
    </div>
  );
}
