import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Building2, 
  User, 
  CheckCircle, 
  Clock, 
  ArrowUp,
  X,
  ChevronDown
} from 'lucide-react';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface OnboardingStage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'processing' | 'completed' | 'active';
  component: React.ComponentType<any>;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState<OnboardingStage[]>([
    {
      id: 'upload',
      title: 'Upload Balance Sheet',
      description: 'Upload your company balance sheet for analysis',
      icon: Upload,
      status: 'active',
      component: BalanceSheetUpload
    },
    {
      id: 'extraction',
      title: 'Data Extraction',
      description: 'Extracting company and user details from your balance sheet',
      icon: FileText,
      status: 'pending',
      component: DataExtraction
    },
    {
      id: 'business',
      title: 'Business Information',
      description: 'Tell us about your business form and Udyam Aadhar',
      icon: Building2,
      status: 'pending',
      component: BusinessDetails
    },
    {
      id: 'details',
      title: 'Essential Details',
      description: 'Complete your profile with additional information',
      icon: User,
      status: 'pending',
      component: EssentialDetails
    }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressPercent = ((currentStage) / stages.length) * 100;

  const completeStage = (stageIndex: number) => {
    setStages(prev => prev.map((stage, index) => {
      if (index === stageIndex) {
        return { ...stage, status: 'completed' };
      } else if (index === stageIndex + 1) {
        return { ...stage, status: 'active' };
      }
      return stage;
    }));
    
    if (stageIndex < stages.length - 1) {
      setTimeout(() => {
        setCurrentStage(stageIndex + 1);
        scrollToStage(stageIndex + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const scrollToStage = (stageIndex: number) => {
    if (containerRef.current) {
      const stageElement = containerRef.current.children[stageIndex] as HTMLElement;
      if (stageElement) {
        stageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header with Progress */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Complete Your Onboarding
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Step {currentStage + 1} of {stages.length}</span>
                  <span>{Math.round(progressPercent)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Stages Container */}
            <div 
              ref={containerRef}
              className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6"
            >
              {stages.map((stage, index) => (
                <OnboardingCard
                  key={stage.id}
                  stage={stage}
                  index={index}
                  isActive={index === currentStage}
                  isCompleted={stage.status === 'completed'}
                  onComplete={() => completeStage(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Individual Onboarding Card Component
const OnboardingCard: React.FC<{
  stage: OnboardingStage;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: () => void;
}> = ({ stage, index, isActive, isCompleted, onComplete }) => {
  const Icon = stage.icon;
  const Component = stage.component;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isCompleted ? 0.95 : 1,
        height: isCompleted ? 80 : 'auto'
      }}
      transition={{ 
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }}
      className={`
        relative border-2 rounded-2xl p-6 transition-all duration-500
        ${isActive ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 
          isCompleted ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' :
          'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
        }
        ${!isActive && !isCompleted ? 'opacity-60' : 'opacity-100'}
      `}
    >
      {isCompleted ? (
        // Completed State - Minimized Card
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                {stage.title}
              </h3>
              <p className="text-sm text-green-600 dark:text-green-500">
                Completed successfully
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        // Active/Pending State - Full Card
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-colors
              ${isActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
            `}>
              <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {stage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {stage.description}
              </p>
            </div>
          </div>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
            >
              <Component onComplete={onComplete} />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Stage Components
const BalanceSheetUpload: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const startUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        {!file ? (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your balance sheet or click to browse
            </p>
            <input
              type="file"
              accept=".pdf,.xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
              id="balance-sheet-upload"
            />
            <label
              htmlFor="balance-sheet-upload"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Choose File
            </label>
          </div>
        ) : (
          <div>
            <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-600 dark:text-green-400 mb-4">
              {file.name}
            </p>
            {uploading ? (
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <motion.div
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <button
                onClick={startUpload}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Upload Balance Sheet
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const DataExtraction: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Scanning document...');

  const tasks = [
    'Scanning document...',
    'Extracting financial data...',
    'Identifying key metrics...',
    'Parsing company information...',
    'Validating data integrity...',
    'Processing complete!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        const taskIndex = Math.floor((newProgress / 100) * tasks.length);
        if (taskIndex < tasks.length) {
          setCurrentTask(tasks[taskIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
      />
      <h3 className="text-lg font-semibold mb-2">{currentTask}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <p className="text-sm text-gray-600">{progress}% Complete</p>
    </div>
  );
};

const BusinessDetails: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    businessForm: '',
    udyamAadhar: '',
    industry: '',
    employeeCount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Form
          </label>
          <select
            required
            value={formData.businessForm}
            onChange={(e) => setFormData(prev => ({ ...prev, businessForm: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          >
            <option value="">Select Business Form</option>
            <option value="proprietorship">Sole Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llp">Limited Liability Partnership</option>
            <option value="private_limited">Private Limited Company</option>
            <option value="public_limited">Public Limited Company</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Udyam Aadhar Number
          </label>
          <input
            type="text"
            required
            value={formData.udyamAadhar}
            onChange={(e) => setFormData(prev => ({ ...prev, udyamAadhar: e.target.value }))}
            placeholder="UDYAM-XX-XX-XXXXXXX"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry
          </label>
          <input
            type="text"
            required
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            placeholder="e.g., Manufacturing, IT Services"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Employee Count
          </label>
          <select
            required
            value={formData.employeeCount}
            onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          >
            <option value="">Select Range</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Continue
      </button>
    </form>
  );
};

const EssentialDetails: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    primaryGoal: '',
    riskTolerance: '',
    timeHorizon: '',
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Financial Goal
          </label>
          <select
            required
            value={formData.primaryGoal}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          >
            <option value="">Select Goal</option>
            <option value="growth">Business Growth</option>
            <option value="stability">Financial Stability</option>
            <option value="investment">Investment Returns</option>
            <option value="debt_reduction">Debt Reduction</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risk Tolerance
          </label>
          <select
            required
            value={formData.riskTolerance}
            onChange={(e) => setFormData(prev => ({ ...prev, riskTolerance: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          >
            <option value="">Select Risk Level</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Investment Time Horizon
          </label>
          <select
            required
            value={formData.timeHorizon}
            onChange={(e) => setFormData(prev => ({ ...prev, timeHorizon: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          >
            <option value="">Select Time Horizon</option>
            <option value="short">Short-term (1-3 years)</option>
            <option value="medium">Medium-term (3-7 years)</option>
            <option value="long">Long-term (7+ years)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Financial Experience
          </label>
          <select
            required
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          >
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Complete Onboarding
      </button>
    </form>
  );
};

export default OnboardingFlow;