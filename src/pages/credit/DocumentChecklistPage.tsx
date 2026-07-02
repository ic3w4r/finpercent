import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, FileText, Upload, AlertCircle, CheckCircle2, ShieldCheck, 
  Trash2, Eye, Download, Info
} from 'lucide-react';
import FileUploader from '../../components/FileUploader';

interface DocItem {
  id: string;
  name: string;
  category: 'Registration' | 'Tax' | 'Bank' | 'Financial';
  status: 'Complete' | 'Missing' | 'Expired';
  expiry?: string;
  fileName?: string;
}

import { useReadiness } from '../../contexts/ReadinessContext';

export default function DocumentChecklistPage() {
  const navigate = useNavigate();
  const { documents, uploadDocument } = useReadiness();
  const [showUploader, setShowUploader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  
  const docs = documents;

  const filteredDocs = selectedCategory === 'All' 
    ? docs 
    : docs.filter(d => d.category === selectedCategory);

  const completeCount = docs.filter(d => d.status === 'Complete').length;
  const completenessRate = Math.round((completeCount / docs.length) * 100);

  const handleUploadComplete = (file: File) => {
    if (activeUploadId) {
      uploadDocument(activeUploadId, file.name);
    } else {
      uploadDocument('financials', file.name);
    }
    setShowUploader(false);
    setActiveUploadId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/overview')}
            className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Back to Command Center</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Document Checklist & Locker</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Manage required documentation, upload audit statements, and compile your bank-ready borrower file.
          </p>
        </div>

        {/* Completeness score banner */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 rounded-xl flex items-center justify-center font-bold text-lg">
              {completenessRate}%
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Document Completeness Rating</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">{completeCount} of {docs.length} required files verified</p>
            </div>
          </div>
          <button
            onClick={() => setShowUploader(true)}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md text-xs font-bold transition-all"
          >
            Upload Document
          </button>
        </div>

        {/* File uploader popup modal */}
        {showUploader && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-primary-200 dark:border-gray-700 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">Upload Credit Dossier Document</h4>
              <button onClick={() => setShowUploader(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
            </div>
            <FileUploader
              onFileUpload={handleUploadComplete}
              acceptedFileTypes={['.pdf', '.xlsx', '.csv']}
              maxFileSize={10 * 1024 * 1024}
            />
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {['All', 'Registration', 'Tax', 'Bank', 'Financial'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 dark:bg-gray-900 text-gray-500 rounded-lg flex-shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-800 dark:text-gray-200 block">{doc.name}</span>
                    <span className="text-[10px] text-gray-400 block">{doc.category} • {doc.fileName ?? 'No file uploaded'}</span>
                    {doc.expiry && (
                      <span className="text-[9px] text-red-500 block font-semibold mt-0.5">Expired on: {doc.expiry}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    doc.status === 'Complete' ? 'bg-green-100 text-green-700' : 
                    doc.status === 'Expired' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{doc.status}</span>
                  <div className="flex space-x-2">
                    {doc.fileName && (
                      <>
                        <button className="p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-white transition-all" onClick={() => alert(`Previewing ${doc.fileName}...`)}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-white transition-all" onClick={() => alert(`Downloading ${doc.fileName}...`)}>
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => {
                        setActiveUploadId(doc.id);
                        setShowUploader(true);
                      }}
                      className="p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-white transition-all"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
