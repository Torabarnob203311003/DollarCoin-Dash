/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

const View = ({ user, onClose, baseUrl }) => {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const application = user.applicationData;
  const isBusiness = application.accountType === 'business';
  const accountData = isBusiness ? application.businessAccount : application.personalAccount;

  // Helper function to get full document URL
  const getDocumentUrl = (docPath) => {
    if (!docPath) return null;
    return `${baseUrl}/${docPath.replace(/\\/g, '/')}`;
  };

  const formSections = [
    {
      title: "SECTION 1. COUNTERPARTY INFORMATION",
      content: () => (
        <div className="space-y-3">
          <div>
            <span className="font-semibold text-gray-300">Account Type: </span>
            <span className="text-gray-400 capitalize">{application.accountType}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-300">Email: </span>
            <span className="text-gray-400">{application.email}</span>
          </div>
          {isBusiness ? (
            <>
              <div>
                <span className="font-semibold text-gray-300">Legal Entity Name: </span>
                <span className="text-gray-400">{accountData.legalEntityName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Country of Incorporation: </span>
                <span className="text-gray-400">{accountData.countryOfIncorporation}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Date of Incorporation: </span>
                <span className="text-gray-400">{new Date(accountData.dateOfIncorporation).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Place of Incorporation: </span>
                <span className="text-gray-400">{accountData.placeOfIncorporation}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Registered Address: </span>
                <span className="text-gray-400">{accountData.registeredAddress}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Office Address: </span>
                <span className="text-gray-400">{accountData.officeAddress}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">EIN/Tax ID: </span>
                <span className="text-gray-400">{accountData.einTaxId}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="font-semibold text-gray-300">Full Name: </span>
                <span className="text-gray-400">{accountData.fullName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Date of Birth: </span>
                <span className="text-gray-400">{new Date(accountData.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Place of Birth: </span>
                <span className="text-gray-400">{accountData.placeOfBirth}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Nationality: </span>
                <span className="text-gray-400">{accountData.nationality}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Residential Address: </span>
                <span className="text-gray-400">{accountData.residentialAddress}</span>
              </div>
            </>
          )}
        </div>
      )
    },
    {
      title: "BUSINESS & CONTACT INFORMATION",
      content: () => (
        <div className="space-y-3">
          {isBusiness ? (
            <>
              <div>
                <span className="font-semibold text-gray-300">Business Activities: </span>
                <span className="text-gray-400">{accountData.businessActivities}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Source of Funds: </span>
                <span className="text-gray-400">{accountData.sourceOfFunds}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Transaction Purpose: </span>
                <span className="text-gray-400">{accountData.transactionPurpose}</span>
              </div>
              <div className="border-t border-gray-600 pt-3">
                <h5 className="font-semibold text-gray-300 mb-2">Authorized Contact:</h5>
                <div className="ml-4 space-y-1">
                  <div>
                    <span className="font-semibold text-gray-300">Name: </span>
                    <span className="text-gray-400">{accountData.authorizedContact.firstName} {accountData.authorizedContact.lastName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-300">Email: </span>
                    <span className="text-gray-400">{accountData.authorizedContact.email}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-300">Telephone: </span>
                    <span className="text-gray-400">{accountData.authorizedContact.telephone}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Politically Exposed Person (PEP): </span>
                <span className="text-gray-400">{accountData.isPEP ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Third Party Transactions: </span>
                <span className="text-gray-400">{accountData.isThirdParty ? 'Yes' : 'No'}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="font-semibold text-gray-300">Occupation: </span>
                <span className="text-gray-400">{accountData.occupation}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">US Citizen/Resident: </span>
                <span className="text-gray-400">{accountData.isUSCitizenOrResident ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Telephone: </span>
                <span className="text-gray-400">{accountData.telephone}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Mobile: </span>
                <span className="text-gray-400">{accountData.mobile}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Other Contact: </span>
                <span className="text-gray-400">{accountData.othersContact}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Source of Funds: </span>
                <span className="text-gray-400">
                  {accountData.sourceOfFunds?.options?.join(', ') || 'Not specified'}
                  {accountData.sourceOfFunds?.othersDetail && ` - ${accountData.sourceOfFunds.othersDetail}`}
                </span>
              </div>
            </>
          )}
        </div>
      )
    },
    {
      title: "SECTION 2. BANK INFORMATION",
      content: () => (
        <div className="space-y-3">
          {isBusiness && accountData.bankInformation ? (
            <>
              <div>
                <span className="font-semibold text-gray-300">Bank Name: </span>
                <span className="text-gray-400">{accountData.bankInformation.bankName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Bank Address: </span>
                <span className="text-gray-400">{accountData.bankInformation.bankAddress}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Account Number: </span>
                <span className="text-gray-400">{accountData.bankInformation.accountNumber}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">SWIFT Code: </span>
                <span className="text-gray-400">{accountData.bankInformation.swiftCode}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Routing Number: </span>
                <span className="text-gray-400">{accountData.bankInformation.routingNumber}</span>
              </div>
            </>
          ) : (
            <div className="text-gray-400">No bank information provided for personal account.</div>
          )}
        </div>
      )
    },
    {
      title: "SECTION 3. OWNERSHIP / CONTROL INFORMATION",
      content: () => (
        <div className="space-y-3">
          {isBusiness ? (
            <>
              <div className="font-semibold text-gray-300 mb-2">Ownership/Control Individuals:</div>
              {accountData.ownershipControl?.individuals?.length > 0 ? (
                <ul className="list-disc ml-6 text-gray-400">
                  {accountData.ownershipControl.individuals.map((individual, index) => (
                    <li key={index}>{individual}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400">No ownership information provided.</span>
              )}
            </>
          ) : (
            <div className="text-gray-400">Ownership information not applicable for personal accounts.</div>
          )}
        </div>
      )
    },
    {
      title: "DOCUMENTS & CERTIFICATION",
      content: () => (
        <div className="space-y-4">
          {/* Documents Section */}
          <div>
            <h5 className="font-semibold text-gray-300 mb-3">Uploaded Documents:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(accountData.documents).map(([docType, docPath]) => {
                if (!docPath || (Array.isArray(docPath) && docPath.length === 0)) return null;

                const documents = Array.isArray(docPath) ? docPath : [docPath];

                return documents.map((doc, index) => {
                  const docUrl = getDocumentUrl(doc);
                  if (!docUrl) return null;

                  const docName = doc.split(/[\\/]/).pop() || `Document ${index + 1}`;
                  const displayType = docType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                  return (
                    <div key={`${docType}-${index}`} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="font-semibold text-gray-300 text-sm mb-1">{displayType}</div>
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm break-all"
                      >
                        {docName}
                      </a>
                    </div>
                  );
                });
              })}
            </div>
            {Object.values(accountData.documents).every(doc =>
              !doc || (Array.isArray(doc) && doc.length === 0)
            ) && (
                <div className="text-gray-400 text-center py-4">No documents uploaded.</div>
              )}
          </div>

          {/* Certification Section */}
          {isBusiness && accountData.certification && (
            <div className="border-t border-gray-600 pt-4">
              <h5 className="font-semibold text-gray-300 mb-2">Certification:</h5>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-300">Agreed to Terms: </span>
                  <span className="text-gray-400">{accountData.certification.agreed ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Signature: </span>
                  <span className="text-gray-400">{accountData.certification.signature}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Date: </span>
                  <span className="text-gray-400">{new Date(accountData.certification.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {!isBusiness && accountData.signature && (
            <div className="border-t border-gray-600 pt-4">
              <h5 className="font-semibold text-gray-300 mb-2">Signature:</h5>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-300">Signature: </span>
                  <span className="text-gray-400">{accountData.signature}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Date: </span>
                  <span className="text-gray-400">{new Date(accountData.signatureDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  // Toast auto-hide
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleApproveReject = async (action) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      const endpoint = action === 'approve'
        ? `${baseUrl}/api/v1/admin/applications/${application._id}/approve`
        : `${baseUrl}/api/v1/admin/applications/${application._id}/reject`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: action === 'reject' ? 'Application rejected by admin' : undefined,
        })
      });
      console.log(response)
      if (response.ok) {
        const result = await response.json();
        
        setToast({
          type: action === 'approve' ? 'success' : 'error',
          message: result.message || (action === 'approve' ? 'Application approved!' : 'Application rejected!')
        });
        setTimeout(() => {
          onClose();
          window.location.reload(); // Refresh to update the list
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${action} application`);
      }
    } catch (err) {
      setToast({ type: 'error', message: `Error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition
          ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="bg-gray-900 rounded-xl w-full max-w-4xl p-6 space-y-6 border border-green-700/50 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-green-700 pb-2 mb-2">
          <h3 className="text-2xl font-bold text-green-400">
            KYC/AML Application Details
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold">&times;</button>
        </div>
        <div className="space-y-4 text-sm">
          <div className="mb-4 bg-gray-800 p-4 rounded-lg">
            <span className="font-semibold text-gray-300">Application ID: </span>
            <span className="text-gray-400 font-mono">{application._id}</span>
            <br />
            <span className="font-semibold text-gray-300">Submitted: </span>
            <span className="text-gray-400">{new Date(application.submittedAt).toLocaleString()}</span>
            <br />
            <span className="font-semibold text-gray-300">Current Status: </span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${application.status === 'approved' ? 'bg-green-700 text-green-200' :
                application.status === 'rejected' ? 'bg-red-700 text-red-200' :
                  'bg-yellow-700 text-yellow-200'
              }`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-green-300 mb-2">{formSections[step].title}</h4>
          {formSections[step].content()}
        </div>
        <div className="flex justify-between gap-4 mt-6 sticky bottom-0 bg-gray-900 pt-4 border-t border-gray-700">
          {step > 0 ? (
            <button
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50"
              onClick={() => setStep(step - 1)}
              disabled={loading}
            >
              Previous
            </button>
          ) : <div className="flex-1" />}
          {step < formSections.length - 1 ? (
            <button
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50"
              onClick={() => setStep(step + 1)}
              disabled={loading}
            >
              Next
            </button>
          ) : (
            <>
              <button
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50"
                onClick={() => handleApproveReject('approve')}
                disabled={loading || application.status !== 'pending'}
              >
                {loading ? 'Processing...' : 'Approve'}
              </button>
              <button
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50 ml-4"
                onClick={() => handleApproveReject('reject')}
                disabled={loading || application.status !== 'pending'}
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
            </>
          )}
        </div>
        {application.status !== 'pending' && (
          <div className="text-center text-gray-400 text-sm mt-2">
            This application has already been {application.status}. No further action can be taken.
          </div>
        )}
      </div>
    </div>
  );
};

export default View;