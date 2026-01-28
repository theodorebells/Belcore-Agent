
import React, { useState } from 'react';
import { BUSINESS_CHALLENGES } from '../constants';
import { SMESubmission, ReadinessAnswers } from '../types';

interface IntakeFormProps {
  onSubmit: (entry: Omit<SMESubmission, 'id' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, onCancel }) => {
  // Add missing readiness property to meet Omit<SMESubmission, 'id' | 'status' | 'createdAt'> type requirements
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    contactPerson: '',
    phoneNumber: '',
    challenge: BUSINESS_CHALLENGES[0],
    // Fix: Added implementationProgress to satisfy the required property in Omit<SMESubmission, 'id' | 'status' | 'createdAt'>
    implementationProgress: 0,
    // Fix: Correctly initialize ReadinessAnswers with required string[] and string properties
    readiness: {
      customerRecording: [],
      storageMethod: [],
      lostLeadsCount: 'I have no idea',
      followUpMethod: [],
      paymentReminders: [],
      repetitiveTasks: '',
      orderProcess: [],
      inventoryMethod: [],
      searchTime: '',
      teamComm: [],
      digitalTools: [],
      primaryDevice: 'Smartphone',
      invoicingMethod: [],
      errorSource: [],
      biggestFrustration: '',
      breakPoint: [],
      blockerToGrowth: [],
      autoWish: '',
      monthlyLoss: '',
      investmentLevel: ''
    } as ReadinessAnswers
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phoneNumber) {
      alert("Please fill in business name and phone number.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">SME Intake Module</h2>
        <p className="text-gray-500">Capture business details to identify automation opportunities.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Business Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Kola's Kitchen"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.businessName}
              onChange={e => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Industry</label>
            <input
              type="text"
              required
              placeholder="e.g. Hospitality, Retail"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.industry}
              onChange={e => setFormData({ ...formData, industry: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Contact Person</label>
            <input
              type="text"
              required
              placeholder="Owner or Manager Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.contactPerson}
              onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Phone Number (WhatsApp preferred)</label>
            <input
              type="tel"
              required
              placeholder="08012345678"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.phoneNumber}
              onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Primary Business Challenge</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            value={formData.challenge}
            onChange={e => setFormData({ ...formData, challenge: e.target.value })}
          >
            {BUSINESS_CHALLENGES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 pt-1 italic">This selection will drive our automation recommendation.</p>
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <button
            type="submit"
            className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-95"
          >
            Submit for Review
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntakeForm;
