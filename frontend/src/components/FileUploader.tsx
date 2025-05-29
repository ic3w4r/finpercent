import React, { useState } from 'react';
import { Upload, Camera, HelpCircle, ExternalLink } from 'lucide-react';
import UserDetailsForm, { UserFormData } from './UserDetailsForm';
import FinancialReport, { KPIData } from './FinancialReport';

interface UploadProgress {
  file: string;
  progress: number;
}

type Stage = 'upload' | 'details' | 'analysis' | 'report';

export default function FileUploader() {
  const [stage, setStage] = useState<Stage>('upload');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [userDetails, setUserDetails] = useState<UserFormData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    kpiData: KPIData;
    ranking: 'Gold' | 'Silver' | 'Bronze' | 'Iron';
  } | null>(null);

  const simulateUpload = (fileName: string) => {
    setUploadProgress({ file: fileName, progress: 0 });
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev && prev.progress >= 100) {
          clearInterval(interval);
          setStage('details');
          return prev;
        }
        return prev ? { ...prev, progress: prev.progress + 10 } : null;
      });
    }, 300);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    try {
      setUploadProgress({ file: file.name, progress: 0 });
      
      // Create FormData and append file
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload', true);
      
      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(prev => prev ? { ...prev, progress } : null);
        }
      };

      // Handle response
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              setStage('details');
            } else {
              throw new Error(response.message || 'Upload failed');
            }
          } catch (error) {
            throw new Error('Invalid server response');
          }
        } else {
          throw new Error(`Upload failed with status ${xhr.status}`);
        }
      };

      // Handle errors
      xhr.onerror = () => {
        throw new Error('Network error during upload');
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(null);
      alert(`Upload failed: ${(error as Error).message}`);
    }
  };

  const handleUserDetails = async (data: UserFormData) => {
    setUserDetails(data);
    setStage('analysis');
    
    try {
      const formData = new FormData();
      if (uploadProgress?.file) {
        formData.append('file', uploadProgress.file);
      }
      formData.append('userDetails', JSON.stringify(data));

      // Use XMLHttpRequest for better progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/analyze', true);
      
      // Track analysis progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(prev => prev ? { ...prev, progress } : null);
        }
      };

      // Handle response
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const result = JSON.parse(xhr.responseText);
            if (result.success) {
              setAnalysisResult({
                kpiData: result.kpiData,
                ranking: result.ranking,
              });
              setStage('report');
            } else {
              throw new Error(result.message || 'Analysis failed');
            }
          } catch (error) {
            throw new Error('Invalid analysis response');
          }
        } else {
          throw new Error(`Analysis failed with status ${xhr.status}`);
        }
      };

      // Handle errors
      xhr.onerror = () => {
        throw new Error('Network error during analysis');
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Analysis error:', error);
      setStage('upload');
      setUploadProgress(null);
      alert(`Analysis failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="glass-container rounded-2xl p-8 space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 flex items-center justify-center logo-container">
              <img
                src="/logo.svg"
                alt="Finpercent Logo"
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {stage === 'upload' && (
            <>
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  Join our growing community!
                </h1>
                <p className="text-gray-600">
                  Upload your documents to access exclusive features and insights
                </p>
                <div className="space-y-2">
                  <button className="w-full glass-button-primary rounded-lg py-3">
                    Sign Up Now
                  </button>
                  <button className="w-full glass-button rounded-lg py-3">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center p-8 glass-card rounded-xl cursor-pointer hover:bg-black/5"
                  >
                    <Upload className="w-12 h-12 text-primary-400 mb-4" />
                    <span className="text-lg font-semibold text-gray-200">Upload PDF</span>
                    <span className="text-sm text-gray-300 mt-2">Drag and drop or click to select</span>
                  </label>
                  <button
                    className="absolute -top-2 -right-2 p-2 glass-card rounded-full shadow-md hover:bg-white/50"
                    title="Learn more about PDF upload"
                  >
                    <HelpCircle className="w-4 h-4 text-primary-600" />
                  </button>
                </div>

                <div className="relative group">
                  <button
                    className="w-full h-full flex flex-col items-center justify-center p-8 glass-card rounded-xl hover:bg-black/5"
                    onClick={() => simulateUpload('camera-capture.pdf')}
                  >
                    <Camera className="w-12 h-12 text-primary-400 mb-4" />
                    <span className="text-lg font-semibold text-gray-200">Upload via Camera</span>
                    <span className="text-sm text-gray-300 mt-2">Take a photo of your document</span>
                  </button>
                  <button
                    className="absolute -top-2 -right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-neo hover:shadow-neo-hover hover:bg-white/50 transition-neo"
                    title="Learn more about camera upload"
                  >
                    <HelpCircle className="w-4 h-4 text-primary-600" />
                  </button>
                </div>
              </div>

              {uploadProgress && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                    <span>Uploading {uploadProgress.file}...</span>
                    <span>{uploadProgress.progress}%</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2">
                    <div
                      className="bg-primary-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {stage === 'details' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Tell us about your business</h2>
                <p className="text-gray-600 mt-2">
                  This information helps us provide more accurate financial insights
                </p>
              </div>
              <UserDetailsForm onSubmit={handleUserDetails} />
            </div>
          )}

          {stage === 'analysis' && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <h2 className="text-xl font-semibold text-gray-800">Analyzing your financial data...</h2>
              <p className="text-gray-600">This will take just a moment</p>
            </div>
          )}

          {stage === 'report' && analysisResult && userDetails && (
            <FinancialReport
              kpiData={analysisResult.kpiData}
            />
          )}

          <div className="flex items-center justify-center space-x-4 pt-4">
            <a
              href="https://finpercent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <span>Visit Finpercent for More</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
