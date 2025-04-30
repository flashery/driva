import { LenderOffer } from '@driva/types';
import { ApplyPayload } from '@driva/types';

export async function submitLoanApplication(payload: ApplyPayload): Promise<LenderOffer[]> {
  const res = await fetch('http://localhost:3000/api/v1/loan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch offers');
  }

  const data = await res.json();

  console.log(data);
  
  return data;
}
