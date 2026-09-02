import { useState, type FormEvent } from 'react';
import { submitEnquiry, type EnquiryInput } from '../../services/enquiryService';

const emptyForm: EnquiryInput = {
  name: '',
  company: '',
  email: '',
  phone: '',
  requirement: '',
  message: '',
};

type EnquirySectionProps = {
  defaultRequirement?: string;
  embedded?: boolean;
};

export function EnquirySection({
  defaultRequirement = '',
  embedded = false,
}: EnquirySectionProps) {
  const [form, setForm] = useState<EnquiryInput>({
    ...emptyForm,
    requirement: defaultRequirement,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Partial<Record<keyof EnquiryInput, string>> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.company.trim()) next.company = 'Company is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) next.phone = 'Phone is required';
    if (!form.requirement.trim()) next.requirement = 'Requirement is required';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitEnquiry({
        ...form,
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        requirement: form.requirement.trim(),
        message: form.message.trim(),
      });
      setSubmitted(true);
      setForm({ ...emptyForm, requirement: defaultRequirement });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    'w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[var(--forest)]';

  if (submitted) {
    return (
      <div className="border border-[var(--border)] bg-[var(--white)] px-6 py-10 md:px-10">
        <p className="eyebrow">Enquiry received</p>
        <h3 className="font-display mt-4 text-3xl md:text-4xl">
          Thank you. Our team will contact you shortly.
        </h3>
        <button
          type="button"
          className="mt-8 text-[11px] uppercase tracking-[0.16em] underline-offset-4 hover:underline"
          onClick={() => setSubmitted(false)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${
        embedded ? '' : 'border border-[var(--border)] bg-[var(--white)]'
      } grid gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-10`}
    >
      {(
        [
          ['name', 'Name', 'text'],
          ['company', 'Company', 'text'],
          ['email', 'Email', 'email'],
          ['phone', 'Phone', 'tel'],
        ] as const
      ).map(([key, label, type]) => (
        <label key={key} className="block">
          <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
            {label}
          </span>
          <input
            type={type}
            name={key}
            value={form[key]}
            onChange={(e) => setForm((c) => ({ ...c, [key]: e.target.value }))}
            className={fieldClass}
          />
          {errors[key] ? (
            <span className="mt-2 block text-sm text-[var(--danger)]">
              {errors[key]}
            </span>
          ) : null}
        </label>
      ))}

      <label className="block md:col-span-2">
        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
          Product / Requirement
        </span>
        <input
          type="text"
          name="requirement"
          value={form.requirement}
          onChange={(e) =>
            setForm((c) => ({ ...c, requirement: e.target.value }))
          }
          className={fieldClass}
        />
        {errors.requirement ? (
          <span className="mt-2 block text-sm text-[var(--danger)]">
            {errors.requirement}
          </span>
        ) : null}
      </label>

      <label className="block md:col-span-2">
        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))}
          className={`${fieldClass} resize-y`}
        />
        {errors.message ? (
          <span className="mt-2 block text-sm text-[var(--danger)]">
            {errors.message}
          </span>
        ) : null}
      </label>

      <div className="md:col-span-2">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Sending...' : 'Submit Enquiry'}
        </button>
      </div>
    </form>
  );
}
