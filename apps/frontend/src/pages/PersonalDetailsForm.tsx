import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { personalDetailsSchema } from "@driva/schema"

type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

export default function PersonalDetailsForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
  });

  const employmentStatus = watch('employmentStatus');

  const onSubmit = (data: PersonalDetailsFormData) => {
    localStorage.setItem('personalDetails', JSON.stringify(data));
    navigate('/loan');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Personal Details</h2>

      <div>
        <label>First Name</label>
        <input {...register('firstName')} />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <label>Employment Status</label>
        <select {...register('employmentStatus')}>
          <option value="Employed">Employed</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>
        {errors.employmentStatus && <p className="error">{errors.employmentStatus.message}</p>}
      </div>

      {employmentStatus === 'Employed' && (
        <div>
          <label>Employer Name</label>
          <input {...register('employerName')} />
          {errors.employerName && <p className="error">{errors.employerName.message}</p>}
        </div>
      )}

      <button type="submit" style={{ marginTop: 20 }}>Next</button>
    </form>
  );
}
