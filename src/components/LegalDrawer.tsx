import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { BrandMark } from './BrandMark';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalDrawerProps {
  openDoc: LegalDocType;
  onClose: () => void;
  onAcceptBoth: () => void;
}

export const LegalDrawer: React.FC<LegalDrawerProps> = ({
  openDoc,
  onClose,
  onAcceptBoth,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (openDoc) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openDoc, onClose]);

  if (!openDoc) return null;

  const isPrivacy = openDoc === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full max-w-lg max-h-[82vh] flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <BrandMark className="w-8 h-8 shrink-0" />
            <div>
              <p className="text-[11px] font-medium text-slate-400">
                Standard Operational Framework &amp; General Provisions
              </p>
              <h2
                id="legal-modal-title"
                className="text-base font-bold text-slate-900 font-display"
              >
                {isPrivacy
                  ? 'Comprehensive Privacy Policy & Data Governance'
                  : 'General Terms & Conditions of Portal Usage'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Long, multi-section corporate policy scroll container */}
        <div className="flex-1 overflow-y-auto py-4 pr-2 space-y-4 text-[11px] leading-relaxed text-slate-500">
          <section className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-700">
              1. Preamble, Scope of Application &amp; General Definitions
            </h3>
            <p>
              This document establishes the general administrative, procedural, and operational parameters governing the voluntary submission of preliminary identification attributes through this digital interface. Any reference herein to &ldquo;User,&rdquo; &ldquo;Participant,&rdquo; &ldquo;Client,&rdquo; or &ldquo;Submitting Party&rdquo; shall be construed broadly to encompass any natural person or authorized representative interacting with the registration mechanism, irrespective of geographic origin, session duration, or subsequent service engagement.
            </p>
            <p>
              By initiating a session or transmitting alphanumeric records through this portal, the Submitting Party acknowledges that these provisions operate in conjunction with overarching organizational protocols, standard industry practices, and applicable administrative guidelines as periodically revised, amended, or superseded without prior individualized notification.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-700">
              2. Information Collection, Processing &amp; Metadata Aggregation
            </h3>
            <p>
              In the ordinary course of generating a five-digit sequential or randomized confirmation reference, the system processes user-supplied strings—including nominal identifiers, electronic mail routing addresses, and telephonic contact sequences—alongside automated session telemetry, chronological timestamps, and browser compatibility parameters.
            </p>
            <p>
              Such data elements are utilized to facilitate internal routing, queue prioritization, support executive assignment, quality assurance auditing, and general recordkeeping across affiliated operational units, service desks, and designated infrastructural environments.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-700">
              3. Procedural Verification &amp; Support Executive Handoff
            </h3>
            <p>
              The issuance of a numeric confirmation identifier constitutes solely an administrative acknowledgment of form transmission and does not, in isolation, establish a binding commercial warranty, service-level guarantee, or fiduciary obligation. The Submitting Party remains responsible for accurately communicating the generated reference code to the designated support representative during follow-up correspondence.
            </p>
            <p>
              Organizational personnel reserve the discretion to request supplementary verification, reconcile duplicate entries, or defer processing where submitted attributes appear incomplete, inconsistent, or non-conforming with standard intake criteria.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-700">
              4. Storage Retention, Archival Protocols &amp; System Continuity
            </h3>
            <p>
              Submitted records may be retained within transient session caches, distributed operational registries, or archival logs for durations deemed reasonably appropriate to fulfill administrative continuity, regulatory inquiries, dispute resolution, and historical workflow analysis. While commercially reasonable technical measures are maintained to preserve system integrity, no representation is made regarding uninterrupted availability or immunity from network latencies.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-700">
              5. Limitation of Liability, Indemnification &amp; Miscellaneous Clauses
            </h3>
            <p>
              Under no circumstances shall the portal operators, affiliated entities, or support personnel be liable for indirect, incidental, consequential, or punitive damages arising out of delayed transmissions, misquoted confirmation numbers, or third-party telecommunications interruptions. If any provision herein is held unenforceable by a competent authority, the remaining clauses shall continue in full force and effect.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-700">
              6. Amendments, Governing Interpretation &amp; Extended Documentation
            </h3>
            <p>
              These general stipulations may be updated dynamically to reflect evolving operational standards, compliance frameworks, or infrastructural modifications. Continued utilization of the registration workflow constitutes ongoing acceptance of the prevailing terms as published across official organizational channels. For supplementary disclosures and general information, read our website www.ventureinfotech.in/ for reference.
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onAcceptBoth();
              onClose();
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#65A30D] to-[#15803D] hover:from-[#4D7C0F] hover:to-[#166534] rounded-lg transition-colors"
          >
            <Check className="h-3.5 w-3.5" />
            I Agree &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};
