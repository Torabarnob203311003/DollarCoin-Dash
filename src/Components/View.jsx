import React, { useState } from 'react';

const formSections = [
  {
    title: "SECTION 1. COUNTERPARTY INFORMATION",
    content: (user) => (
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-300">Legal Entity Name: </span>
          <span className="text-gray-400">Point95 Global (Hong Kong) Limited</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Country of Incorporation/Citizenship: </span>
          <span className="text-gray-400">Hong Kong</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Date and Place of Incorporation: </span>
          <span className="text-gray-400">2015-06-01, Hong Kong</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Registered Address of Business: </span>
          <span className="text-gray-400">Room 1201, 12/F, Tower 1, Admiralty Centre, 18 Harcourt Road, Hong Kong</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Office Address: </span>
          <span className="text-gray-400">Same as registered address</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">EIN/Tax Identification Number: </span>
          <span className="text-gray-400">123456789</span>
        </div>
      </div>
    )
  },
  {
    title: "AUTHORIZED INDIVIDUAL OPENING THIS ACCOUNT",
    content: (user) => (
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-300">First Name: </span>
          <span className="text-gray-400">John</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Last Name: </span>
          <span className="text-gray-400">Doe</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Telephone: </span>
          <span className="text-gray-400">+852 1234 5678</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Email: </span>
          <span className="text-gray-400">john.doe@point95.com</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Nature of Business: </span>
          <span className="text-gray-400">Digital Asset Trading</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Source of Funds: </span>
          <span className="text-gray-400">Business Revenue</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Purpose of Transactions: </span>
          <span className="text-gray-400">Trading and investment</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Any PEPs?: </span>
          <span className="text-gray-400">Yes</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">PEP Details: </span>
          <span className="text-gray-400">Director is a foreign political public figure.</span>
        </div>
      </div>
    )
  },
  {
    title: "SECTION 2. BANK INFORMATION",
    content: (user) => (
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-300">Bank Name: </span>
          <span className="text-gray-400">HSBC Hong Kong</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Bank Address: </span>
          <span className="text-gray-400">1 Queen's Road Central, Hong Kong</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Account Number: </span>
          <span className="text-gray-400">987654321</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">SWIFT Code: </span>
          <span className="text-gray-400">HSBCHKHHHKH</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Routing Number: </span>
          <span className="text-gray-400">N/A</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Third Party Transaction: </span>
          <span className="text-gray-400">No</span>
        </div>
      </div>
    )
  },
  {
    title: "SECTION 3. OWNERSHIP / CONTROL INFORMATION",
    content: (user) => (
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-300">Legal Name: </span>
          <span className="text-gray-400">Dan Block Limited</span>
          <span className="ml-4 font-semibold text-gray-300">% Ownership: </span>
          <span className="text-gray-400">100%</span>
        </div>
      </div>
    )
  },
  {
    title: "Declaration & Documents",
    content: (user) => (
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-300">Signature: </span>
          <span className="text-gray-400">John Doe</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Date: </span>
          <span className="text-gray-400">2024-05-01</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Required Documentation:</span>
          <ul className="list-disc ml-6 text-gray-400">
            <li>Business License/Registration and Certificate of Incorporation</li>
            <li>Memorandum and Articles of Association</li>
            <li>Directors Minutes to open an account and who has the authority to operate the account</li>
            <li>Bank statement (issued within the last 3 months and in color version)</li>
            <li>Scanned copies of authorized person’s passports and proof of residence</li>
            <li>Scanned copies of all individuals’ passports and proof of residence</li>
            <li>Corporate documents for each entity listed in Section 3</li>
          </ul>
        </div>
      </div>
    )
  }
];

const View = ({ user, onClose }) => {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);

  if (!user) return null;

  // Toast auto-hide
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition
          ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl p-6 space-y-6 border border-green-700/50 shadow-2xl">
        <div className="flex justify-between items-center border-b border-green-700 pb-2 mb-2">
          <h3 className="text-2xl font-bold text-green-400">
            KYC/AML Onboarding Questionnaire & Required Documents
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold">&times;</button>
        </div>
        <div className="space-y-4 text-sm">
          <div className="mb-4">
            <span className="font-semibold text-gray-300">User: </span>
            <span className="text-gray-400">{user.name} ({user.email})</span>
          </div>
          <h4 className="text-lg font-semibold text-green-300 mb-2">{formSections[step].title}</h4>
          {formSections[step].content(user)}
        </div>
        <div className="flex justify-between gap-4 mt-6">
          {step > 0 ? (
            <button
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition duration-200"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          ) : <div className="flex-1" />}
          {step < formSections.length - 1 ? (
            <button
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          ) : (
            <>
              <button
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200"
                onClick={() => {
                  setToast({ type: 'success', message: 'Approved!' });
                  setTimeout(onClose, 2000);
                }}
              >
                Approve
              </button>
              <button
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-200 ml-4"
                onClick={() => {
                  setToast({ type: 'error', message: 'Rejected!' });
                  setTimeout(onClose, 2000);
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;