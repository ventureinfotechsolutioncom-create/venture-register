import React, { useState } from 'react';
import {
  Check,
  Copy,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { BrandMark } from './components/BrandMark';
import { LegalDrawer, LegalDocType } from './components/LegalDrawer';

function generateUniqueFiveDigitId(existingIds: Set<string>): string {
  let candidate = '';
  do {
    candidate = String(Math.floor(10000 + Math.random() * 90000));
  } while (existingIds.has(candidate));
  return candidate;
}

export default function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    contactNumber?: string;
    agreed?: string;
  }>({});

  const [generatedIds] = useState<Set<string>>(() => new Set());
  const [submittedData, setSubmittedData] = useState<{
    customerId: string;
    fullName: string;
    email: string;
    contactNumber: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [sharedWithExecutive, setSharedWithExecutive] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const digits = contactNumber.replace(/\D/g, '');
    if (!digits || digits.length < 7 || digits.length > 15) {
      nextErrors.contactNumber = 'Please enter a valid contact number.';
    }

    if (!agreed) {
      nextErrors.agreed = 'Please tick the box to proceed.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newFiveDigitId = generateUniqueFiveDigitId(generatedIds);
    generatedIds.add(newFiveDigitId);

    setSubmittedData({
      customerId: newFiveDigitId,
      fullName: fullName.trim(),
      email: email.trim(),
      contactNumber: contactNumber.trim(),
    });
  };

  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  const handleCopyId = async (id: string) => {
    await copyTextToClipboard(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToSupportExecutive = async () => {
    if (!submittedData) return;

    const shareMessage = `Client Registration Confirmation\nClient ID: ${submittedData.customerId}\nName: ${submittedData.fullName}\nEmail: ${submittedData.email}\nContact Number: ${submittedData.contactNumber}`;

    await copyTextToClipboard(shareMessage);
    setSharedWithExecutive(true);

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Client ID: ${submittedData.customerId}`,
          text: shareMessage,
        });
      } catch {
        // User cancelled or share unavailable in iframe; clipboard copy already succeeded
      }
    }

    setTimeout(() => setSharedWithExecutive(false), 3500);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setContactNumber('');
    setAgreed(false);
    setErrors({});
    setCopied(false);
    setSharedWithExecutive(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8FAFC] text-[#0F172A] px-4 py-10">
      <main className="w-full max-w-md bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Bold & Professional Corporate Header: Client Registration */}
        <div className="flex flex-col items-center text-center pb-6 border-b-2 border-slate-100">
          <BrandMark className="w-16 h-16 mb-3" />
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 font-display">
            Client Registration
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-semibold text-[#15803D] bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-md">
            Enter your details to generate your 5-digit Client ID
          </p>
        </div>

        {!submittedData ? (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {/* Name - Bold & Highlighted */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-slate-950 mb-1.5 tracking-tight"
              >
                Full Name <span className="text-[#15803D]">*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }
                }}
                placeholder="Enter your full name"
                className={`w-full h-12 px-4 text-sm font-bold text-slate-950 bg-emerald-50/30 rounded-xl border-2 transition-all placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#16A34A]/20 ${
                  errors.fullName
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-slate-300 focus:border-[#15803D]'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email - Bold & Highlighted */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-950 mb-1.5 tracking-tight"
              >
                Email Address <span className="text-[#15803D]">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                placeholder="Enter your email address"
                className={`w-full h-12 px-4 text-sm font-bold text-slate-950 bg-emerald-50/30 rounded-xl border-2 transition-all placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#16A34A]/20 ${
                  errors.email
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-slate-300 focus:border-[#15803D]'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Contact Number - Bold & Highlighted */}
            <div>
              <label
                htmlFor="contact-number"
                className="block text-sm font-bold text-slate-950 mb-1.5 tracking-tight"
              >
                Contact Number <span className="text-[#15803D]">*</span>
              </label>
              <input
                id="contact-number"
                type="tel"
                autoComplete="tel"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                  if (errors.contactNumber) {
                    setErrors((prev) => ({ ...prev, contactNumber: undefined }));
                  }
                }}
                placeholder="Enter your contact number"
                className={`w-full h-12 px-4 text-sm font-mono font-bold text-slate-950 bg-emerald-50/30 rounded-xl border-2 transition-all placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#16A34A]/20 tabular-nums ${
                  errors.contactNumber
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-slate-300 focus:border-[#15803D]'
                }`}
              />
              {errors.contactNumber && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.contactNumber}</span>
                </p>
              )}
            </div>

            {/* Submit Button Placed Prominently */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 inline-flex items-center justify-center px-6 text-base font-bold tracking-wide text-white bg-gradient-to-r from-[#65A30D] to-[#15803D] hover:from-[#4D7C0F] hover:to-[#166534] rounded-xl shadow-sm transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
              >
                Submit &amp; Generate Client ID
              </button>
            </div>

            {/* Small Branded Tick Box + Subtle Low-Highlight Privacy Policy & T&C */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={agreed}
                  id="terms-tick"
                  onClick={() => {
                    const next = !agreed;
                    setAgreed(next);
                    if (next && errors.agreed) {
                      setErrors((prev) => ({ ...prev, agreed: undefined }));
                    }
                  }}
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border transition-all focus-visible:outline-1 focus-visible:outline-[#16A34A] ${
                    agreed
                      ? 'bg-gradient-to-br from-[#84CC16] via-[#16A34A] to-[#14532D] border-[#15803D] text-white'
                      : errors.agreed
                      ? 'bg-white border-red-400'
                      : 'bg-emerald-50/40 border-[#65A30D]/50 hover:border-[#15803D]'
                  }`}
                >
                  {agreed && <Check className="h-2.5 w-2.5 stroke-[3.5]" />}
                </button>

                <label
                  htmlFor="terms-tick"
                  onClick={() => {
                    const next = !agreed;
                    setAgreed(next);
                    if (next && errors.agreed) {
                      setErrors((prev) => ({ ...prev, agreed: undefined }));
                    }
                  }}
                  className="text-[10px] leading-tight text-slate-400 font-normal cursor-pointer select-none"
                >
                  By submitting, you agree to our{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLegalDoc('privacy');
                    }}
                    className="font-normal text-slate-400 hover:text-slate-500 transition-colors"
                  >
                    Privacy Policy
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLegalDoc('terms');
                    }}
                    className="font-normal text-slate-400 hover:text-slate-500 transition-colors"
                  >
                    T&amp;C
                  </button>
                  .
                </label>
              </div>

              {errors.agreed && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.agreed}</span>
                </p>
              )}
            </div>
          </form>
        ) : (
          /* 5-Digit Customer ID Confirmation Screen */
          <div className="mt-6 text-center space-y-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#15803D]">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Client ID Confirmation Number
              </p>
              <div className="mt-2 py-4 px-5 rounded-xl bg-emerald-50/50 border-2 border-[#15803D]/30 flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-widest text-[#15803D] tabular-nums">
                  {submittedData.customerId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyId(submittedData.customerId)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                  title="Copy 5-digit Client ID"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#15803D]" />
                      <span className="text-[#15803D]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-left space-y-2 text-xs">
              <div className="flex justify-between gap-2">
                <span className="font-medium text-slate-500">Name</span>
                <span className="font-bold text-slate-950 truncate">
                  {submittedData.fullName}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-medium text-slate-500">Email</span>
                <span className="font-mono font-bold text-slate-950 truncate">
                  {submittedData.email}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-medium text-slate-500">Contact Number</span>
                <span className="font-mono font-bold text-slate-950 tabular-nums">
                  {submittedData.contactNumber}
                </span>
              </div>
            </div>

            {/* End Instruction: Take a Screenshot and Share to Support Executive */}
            <div className="pt-2 space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-[#15803D]/30 text-center">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Please take a screenshot and share it to your{' '}
                  <span className="text-[#15803D]">Support Executive</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleShareToSupportExecutive}
                className="w-full h-11 inline-flex items-center justify-center gap-2 px-5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#65A30D] to-[#15803D] hover:from-[#4D7C0F] hover:to-[#166534] rounded-xl shadow-sm transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
              >
                {sharedWithExecutive ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Details to Share with Support Executive!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span>Click to Share to Support Executive</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Register Another Client</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <LegalDrawer
        openDoc={legalDoc}
        onClose={() => setLegalDoc(null)}
        onAcceptBoth={() => {
          setAgreed(true);
          setErrors((prev) => ({ ...prev, agreed: undefined }));
        }}
      />
    </div>
  );
}
