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
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="neo-card bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header with Progress */}
            <div className="p-6 border-b border-primary-200 dark:border-gray-700 bg-gradient-to-r from-primary-100 to-beige-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="neo-button glass-action w-12 h-12 flex items-center justify-center">
                    <div className="w-6 h-6 text-primary-600 font-bold flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-1"></div>
                      <div className="text-lg">%</div>
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full ml-1"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-900 dark:text-white font-['Manrope']">
                      Complete Your Onboarding
                    </h2>
                    <p className="text-primary-700 dark:text-gray-300 font-['Manrope']">
                      Set up your FinPercent experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="neo-button glass-action p-3 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="flex justify-between text-sm text-primary-700 dark:text-gray-400 mb-3 font-['Manrope']">
                  <span className="font-medium">Step {currentStage + 1} of {stages.length}</span>
                  <span className="font-medium">{Math.round(progressPercent)}% Complete</span>
                </div>
                <div className="neo-card p-1">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-green-500 h-3 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stages Container */}
            <div 
              ref={containerRef}
              className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6 bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100"
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
        height: isCompleted ? 100 : 'auto'
      }}
      transition={{ 
        duration: 0.8,
        type: 'spring',
        stiffness: 120,
        damping: 20
      }}
      className={`
        relative neo-card transition-all duration-500 font-['Manrope']
        ${isActive ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-200' : ''}
        ${isCompleted ? 'bg-gradient-to-r from-green-50 to-primary-50' : 'bg-gradient-to-br from-white to-primary-50'}
        ${!isActive && !isCompleted ? 'opacity-70' : 'opacity-100'}
      `}
    >
      {isCompleted ? (
        // Completed State - Minimized Card
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center space-x-4">
              <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="neo-button glass-action w-12 h-12 bg-gradient-to-r from-green-500 to-primary-500 text-white flex items-center justify-center"
            >
              <CheckCircle className="w-6 h-6" />
            </motion.div>
            <div>
              <h3 className="font-bold text-green-700 dark:text-green-400 text-lg">
                {stage.title}
              </h3>
              <p className="text-sm text-green-600 dark:text-green-500">
                Completed successfully
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="neo-button glass-action w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        // Active/Pending State - Full Card
        <div className="space-y-6 p-6">
          <div className="flex items-center space-x-4">
            <div className={`
              neo-button glass-action w-16 h-16 flex items-center justify-center transition-all duration-300
              ${isActive ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg' : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600'}
            `}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className={`text-xl font-bold transition-colors ${
                isActive ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
              }`}>
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
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Component onComplete={onComplete} />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Stage Components with consistent theming
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
        return prev + 8;
      });
    }, 150);
  };

  return (
    <div className="space-y-4 font-['Manrope']">
      <div className="neo-card p-8 text-center border-2 border-dashed border-primary-300">
        {!file ? (
          <div>
            <div className="neo-button glass-action w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-600" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
              Drag and drop your balance sheet or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Supported formats: PDF, Excel, CSV
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
              className="neo-button glass-action px-6 py-3 bg-gradient-to-r from-primary-500 to-green-500 text-white cursor-pointer font-medium inline-flex items-center space-x-2 hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Choose File</span>
            </label>
          </div>
        ) : (
          <div>
            <div className="neo-button glass-action w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-green-700 dark:text-green-400 mb-4 font-medium">
              {file.name}
            </p>
            {uploading ? (
              <div>
                <div className="neo-card p-1 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-primary-500 h-3 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </motion.div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <button
                onClick={startUpload}
                className="neo-button glass-action px-6 py-3 bg-gradient-to-r from-green-500 to-primary-500 text-white font-medium hover:shadow-lg transition-all"
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
        const newProgress = prev + 1.5;
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
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-8 font-['Manrope']">
    <div className="neo-button glass-action w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-100 to-green-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
      <h3 className="text-lg font-bold text-primary-800 mb-4">{currentTask}</h3>
      <div className="neo-card p-1 mb-4 max-w-md mx-auto">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-green-500 h-3 rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </motion.div>
      </div>
      <p className="text-sm text-primary-600 font-medium">{Math.round(progress)}% Complete</p>
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
    <form onSubmit={handleSubmit} className="space-y-6 font-['Manrope']">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Business Form
          </label>
          <select
            required
            value={formData.businessForm}
            onChange={(e) => setFormData(prev => ({ ...prev, businessForm: e.target.value }))}
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
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
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Udyam Aadhar Number
          </label>
          <input
            type="text"
            required
            value={formData.udyamAadhar}
            onChange={(e) => setFormData(prev => ({ ...prev, udyamAadhar: e.target.value }))}
            placeholder="UDYAM-XX-XX-XXXXXXX"
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Industry
          </label>
          <input
            type="text"
            required
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            placeholder="e.g., Manufacturing, IT Services"
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Employee Count
          </label>
          <select
            required
            value={formData.employeeCount}
            onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: e.target.value }))}
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
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
        className="w-full neo-button py-4 bg-gradient-to-r from-primary-500 to-green-500 text-white font-bold text-lg hover:shadow-lg transition-all"
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
    <form onSubmit={handleSubmit} className="space-y-6 font-['Manrope']">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Primary Financial Goal
          </label>
          <select
            required
            value={formData.primaryGoal}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">Select Goal</option>
            <option value="growth">Business Growth</option>
            <option value="stability">Financial Stability</option>
            <option value="investment">Investment Returns</option>
            <option value="debt_reduction">Debt Reduction</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Risk Tolerance
          </label>
          <select
            required
            value={formData.riskTolerance}
            onChange={(e) => setFormData(prev => ({ ...prev, riskTolerance: e.target.value }))}
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">Select Risk Level</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Investment Time Horizon
          </label>
          <select
            required
            value={formData.timeHorizon}
            onChange={(e) => setFormData(prev => ({ ...prev, timeHorizon: e.target.value }))}
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">Select Time Horizon</option>
            <option value="short">Short-term (1-3 years)</option>
            <option value="medium">Medium-term (3-7 years)</option>
            <option value="long">Long-term (7+ years)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-primary-800 dark:text-primary-300 mb-2">
            Financial Experience
          </label>
          <select
            required
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            className="w-full neo-card p-3 border-0 text-gray-800 focus:ring-2 focus:ring-primary-500 transition-all"
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
        className="w-full neo-button py-4 bg-gradient-to-r from-green-500 to-primary-600 text-white font-bold text-lg hover:shadow-xl transition-all"
      >
        Complete Onboarding
      </button>
    </form>
  );
};

export default OnboardingFlow;