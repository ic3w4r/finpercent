import React, { useState, useEffect } from 'react';
import { 
  Building2, Shield, FileText, Key, Users, CheckCircle2, AlertTriangle, 
  TrendingUp, Calendar, Lock, Upload, Download, RefreshCw, Plus, Trash2, 
  Eye, Edit, Coins, Scale, Search, Sparkles, UserCheck, Check, ArrowRight,
  Info, FileSpreadsheet, Fingerprint, ShieldCheck, Activity, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface Property {
  id: string;
  propertyCode: string;
  name: string;
  type: string;
  ownershipType: string;
  currentOwner: string;
  proposedOwner: string;
  previousOwner: string;
  address: string;
  village: string;
  sro: string;
  surveyNumber: string;
  pattaNumber: string;
  extent: string;
  marketValue: number;
  guidelineValue: number;
  loanStatus: 'None' | 'Active Mortgage' | 'Cleared (Release Pending)' | 'Cleared';
  courtDispute: boolean;
  buildingApproval: boolean;
  insuranceStatus: boolean;
  rentalIncome: boolean;
  possessionStatus: string;
}

interface Document {
  id: string;
  propertyId: string;
  name: string;
  type: string;
  category: 'Title' | 'Government' | 'Encumbrance' | 'Financial' | 'Professional';
  fileUrl: string;
  hash: string;
  uploadedBy: string;
  verifiedBy: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  ocrStatus: 'None' | 'Extracting' | 'Completed';
  ocrConfidence: number; // 0 to 100
  ocrData?: Record<string, string>;
  createdAt: string;
}

interface MutationItem {
  id: string;
  propertyId: string;
  recordType: 'Patta' | 'Property Tax' | 'EB' | 'Water' | 'TSLR' | 'Apartment Assoc';
  currentName: string;
  expectedName: string;
  status: 'Not Required' | 'Not Started' | 'Applied' | 'Pending Verification' | 'Objection Raised' | 'Completed';
  appliedDate?: string;
  completedDate?: string;
}

interface ProfessionalReview {
  id: string;
  propertyId: string;
  reviewerName: string;
  role: 'Lawyer' | 'CA' | 'Valuer' | 'Surveyor';
  findings: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  signedStatus: 'Signed' | 'Unsigned';
  signedAt?: string;
  keyRef?: string;
}

interface USBKey {
  id: string;
  name: string;
  type: 'FIDO2' | 'DSC';
  status: 'Active' | 'Revoked' | 'Lost';
  enrolledAt: string;
  keyIdentifier: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  property: string;
  keyUsed: string;
  result: 'Success' | 'Failed';
}

interface RiskItem {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  actionNeeded: string;
  status: 'Open' | 'Resolved';
}

// --- INITIAL SEED DATA ---
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    propertyCode: 'FP-PROP-421',
    name: 'Golden Heights Villa',
    type: 'Residential House',
    ownershipType: 'Sole Ownership',
    currentOwner: 'Suresh Kumar',
    proposedOwner: 'Suresh Kumar',
    previousOwner: 'Ramesh Kumar (Settlor)',
    address: 'Plot 42, Golden Heights Road, Sholinganallur',
    village: 'Sholinganallur',
    sro: 'SRO Chennai South',
    surveyNumber: '142/3A',
    pattaNumber: '421',
    extent: '2400 Sq.Ft.',
    marketValue: 18000000,
    guidelineValue: 12500000,
    loanStatus: 'None',
    courtDispute: false,
    buildingApproval: true,
    insuranceStatus: true,
    rentalIncome: false,
    possessionStatus: 'Owner Occupied'
  },
  {
    id: 'prop-2',
    propertyCode: 'FP-PROP-1102',
    name: 'SME Corporate Warehouse',
    type: 'Commercial Building',
    ownershipType: 'LLP Owned',
    currentOwner: 'Suresh Kumar Enterprises LLP',
    proposedOwner: 'Suresh Kumar Enterprises LLP',
    previousOwner: 'Vikas Gupta (Seller)',
    address: 'Survey No. 89, Phase 2, Peenya Industrial Area',
    village: 'Peenya',
    sro: 'SRO Peenya Bengaluru',
    surveyNumber: '89/1B',
    pattaNumber: '1102',
    extent: '8500 Sq.Ft.',
    marketValue: 45000000,
    guidelineValue: 30000000,
    loanStatus: 'Active Mortgage',
    courtDispute: false,
    buildingApproval: true,
    insuranceStatus: true,
    rentalIncome: true,
    possessionStatus: 'Leased'
  },
  {
    id: 'prop-3',
    propertyCode: 'FP-PROP-98',
    name: 'Sunrise Fields',
    type: 'Agricultural Land',
    ownershipType: 'Jointly Owned',
    currentOwner: 'Suresh Kumar & Ramesh Kumar',
    proposedOwner: 'Suresh Kumar (Son)',
    previousOwner: 'Ananth Kumar (Grandfather)',
    address: 'S.No. 211, Pollachi Road',
    village: 'Pollachi',
    sro: 'SRO Coimbatore Rural',
    surveyNumber: '211/A',
    pattaNumber: '98',
    extent: '1.5 Acres',
    marketValue: 6500000,
    guidelineValue: 4000000,
    loanStatus: 'Cleared (Release Pending)',
    courtDispute: true,
    buildingApproval: false,
    insuranceStatus: false,
    rentalIncome: false,
    possessionStatus: 'Unclear/Disputed'
  }
];

const INITIAL_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    propertyId: 'prop-1',
    name: 'Settlement Deed (Ramesh to Suresh).pdf',
    type: 'Settlement Deed',
    category: 'Title',
    fileUrl: '#',
    hash: 'sha256-a1c2e3f4...',
    uploadedBy: 'Suresh Kumar',
    verifiedBy: 'Vikram Advani (Lawyer)',
    status: 'Verified',
    ocrStatus: 'Completed',
    ocrConfidence: 96,
    ocrData: {
      ownerName: 'Suresh Kumar',
      settlorName: 'Ramesh Kumar',
      documentNumber: '1240/2026',
      registrationYear: '2026',
      sro: 'SRO Chennai South'
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'doc-2',
    propertyId: 'prop-1',
    name: 'Patta Mutation Passbook.pdf',
    type: 'Patta',
    category: 'Government',
    fileUrl: '#',
    hash: 'sha256-ff45acde...',
    uploadedBy: 'Suresh Kumar',
    verifiedBy: 'Karan Singh (Surveyor)',
    status: 'Verified',
    ocrStatus: 'Completed',
    ocrConfidence: 92,
    ocrData: {
      ownerName: 'Suresh Kumar',
      pattaNumber: '421',
      surveyNumber: '142/3A'
    },
    createdAt: '2026-01-20'
  },
  {
    id: 'doc-3',
    propertyId: 'prop-2',
    name: 'Sale Deed (Vikas Gupta to LLP).pdf',
    type: 'Sale Deed',
    category: 'Title',
    fileUrl: '#',
    hash: 'sha256-bc9823ed...',
    uploadedBy: 'Suresh Kumar',
    verifiedBy: 'Vikram Advani (Lawyer)',
    status: 'Verified',
    ocrStatus: 'Completed',
    ocrConfidence: 95,
    ocrData: {
      ownerName: 'Suresh Kumar Enterprises LLP',
      sellerName: 'Vikas Gupta',
      documentNumber: '8902/2018',
      registrationYear: '2018',
      considerationValue: '₹3,50,00,000'
    },
    createdAt: '2026-02-10'
  },
  {
    id: 'doc-4',
    propertyId: 'prop-2',
    name: 'Property Tax Assessment Bill.pdf',
    type: 'Tax Receipt',
    category: 'Government',
    fileUrl: '#',
    hash: 'sha256-dd102938...',
    uploadedBy: 'Suresh Kumar',
    verifiedBy: 'Pending Review',
    status: 'Pending',
    ocrStatus: 'Completed',
    ocrConfidence: 89,
    ocrData: {
      ownerName: 'Suresh Kumar Enterprises LLP',
      assessmentNumber: 'TX-89-PEENYA'
    },
    createdAt: '2026-06-01'
  },
  {
    id: 'doc-5',
    propertyId: 'prop-3',
    name: 'Sale Deed 1978 (Ancestral).pdf',
    type: 'Parent Deed',
    category: 'Title',
    fileUrl: '#',
    hash: 'sha256-9908123c...',
    uploadedBy: 'Suresh Kumar',
    verifiedBy: 'Pending Review',
    status: 'Pending',
    ocrStatus: 'Completed',
    ocrConfidence: 72,
    ocrData: {
      ownerName: 'Ananth Kumar',
      documentNumber: '345/1978'
    },
    createdAt: '2026-03-02'
  }
];

const INITIAL_MUTATIONS: MutationItem[] = [
  // prop-1 (Golden Heights)
  { id: 'mut-1', propertyId: 'prop-1', recordType: 'Patta', currentName: 'Suresh Kumar', expectedName: 'Suresh Kumar', status: 'Completed', appliedDate: '2026-01-16', completedDate: '2026-01-20' },
  { id: 'mut-2', propertyId: 'prop-1', recordType: 'Property Tax', currentName: 'Suresh Kumar', expectedName: 'Suresh Kumar', status: 'Completed', appliedDate: '2026-01-18', completedDate: '2026-02-10' },
  { id: 'mut-3', propertyId: 'prop-1', recordType: 'EB', currentName: 'Ramesh Kumar', expectedName: 'Suresh Kumar', status: 'Applied', appliedDate: '2026-05-12' },
  // prop-2 (SME Warehouse)
  { id: 'mut-4', propertyId: 'prop-2', recordType: 'Patta', currentName: 'Suresh Kumar Enterprises LLP', expectedName: 'Suresh Kumar Enterprises LLP', status: 'Completed', appliedDate: '2018-09-20', completedDate: '2018-10-15' },
  { id: 'mut-5', propertyId: 'prop-2', recordType: 'Property Tax', currentName: 'Suresh Kumar Enterprises LLP', expectedName: 'Suresh Kumar Enterprises LLP', status: 'Completed', appliedDate: '2018-10-02', completedDate: '2018-12-05' },
  { id: 'mut-6', propertyId: 'prop-2', recordType: 'EB', currentName: 'Vikas Gupta', expectedName: 'Suresh Kumar Enterprises LLP', status: 'Objection Raised', appliedDate: '2026-04-10' },
  // prop-3 (Sunrise Fields)
  { id: 'mut-7', propertyId: 'prop-3', recordType: 'Patta', currentName: 'Ananth Kumar', expectedName: 'Suresh Kumar & Ramesh Kumar', status: 'Not Started' },
  { id: 'mut-8', propertyId: 'prop-3', recordType: 'Property Tax', currentName: 'Ananth Kumar', expectedName: 'Suresh Kumar & Ramesh Kumar', status: 'Not Started' }
];

const INITIAL_REVIEWS: ProfessionalReview[] = [
  {
    id: 'rev-1',
    propertyId: 'prop-1',
    reviewerName: 'Vikram Advani',
    role: 'Lawyer',
    findings: 'Primary title is clear. Settlement deed executed in favor of son Suresh Kumar is fully registered. Verification of parent document chain indicates clean handovers since 1982.',
    riskLevel: 'Low',
    signedStatus: 'Signed',
    signedAt: '2026-01-25 11:30',
    keyRef: 'DSC-IND-VIKRAM-8812'
  },
  {
    id: 'rev-2',
    propertyId: 'prop-2',
    reviewerName: 'Amit Shah',
    role: 'CA',
    findings: 'LLP structuring is clean. Depreciation scheduling is in line. Recommended updating utility bills to LLP name to avoid tax deduction objections.',
    riskLevel: 'Low',
    signedStatus: 'Signed',
    signedAt: '2026-02-18 16:45',
    keyRef: 'DSC-IND-AMIT-4491'
  },
  {
    id: 'rev-3',
    propertyId: 'prop-3',
    reviewerName: 'Vikram Advani',
    role: 'Lawyer',
    findings: 'Pending release deed for 2012 bank mortgage. Also, consent deed from Suresh Kumar\'s sister is missing, representing high partition dispute risk.',
    riskLevel: 'High',
    signedStatus: 'Unsigned'
  }
];

const INITIAL_RISKS: RiskItem[] = [
  {
    id: 'risk-1',
    propertyId: 'prop-2',
    title: 'Missing Parent Document',
    description: 'The parent deed of 1998 purchase is missing from the physical dossier vault.',
    severity: 'Medium',
    actionNeeded: 'Apply for certified copy from SRO Peenya.',
    status: 'Open'
  },
  {
    id: 'risk-2',
    propertyId: 'prop-2',
    title: 'Electricity Bill Name Mismatch',
    description: 'The EB account is still under previous owner Vikas Gupta\'s name.',
    severity: 'Low',
    actionNeeded: 'Resolve objection at local electricity board office.',
    status: 'Open'
  },
  {
    id: 'risk-3',
    propertyId: 'prop-3',
    title: 'Unreleased Mortgage Entry',
    description: 'A mortgage entry of 2012 from SBI Bank remains on the Encumbrance Certificate despite verbal confirmation of closure.',
    severity: 'High',
    actionNeeded: 'Request Mortgage Release Deed from SBI branch and register it at SRO.',
    status: 'Open'
  },
  {
    id: 'risk-4',
    propertyId: 'prop-3',
    title: 'Missing Co-heir Consent',
    description: 'Sister\'s formal relinquishment / consent deed has not been filed for inheritance chain.',
    severity: 'Critical',
    actionNeeded: 'Prepare Relinquishment Deed, sign and register.',
    status: 'Open'
  }
];

const INITIAL_KEYS: USBKey[] = [
  { id: 'key-1', name: 'Primary Security Key (Yubikey 5)', type: 'FIDO2', status: 'Active', enrolledAt: '2026-01-02', keyIdentifier: 'fido2-yubi-88129031' },
  { id: 'key-2', name: 'Backup Security Key (Feitian)', type: 'FIDO2', status: 'Active', enrolledAt: '2026-01-03', keyIdentifier: 'fido2-fei-99211029' },
  { id: 'key-3', name: 'Suresh Kumar DSC Token', type: 'DSC', status: 'Active', enrolledAt: '2026-01-10', keyIdentifier: 'dsc-india-suresh-449' }
];

const INITIAL_AUDITS: AuditLog[] = [
  { id: 'aud-1', timestamp: '2026-06-22 10:14', user: 'Suresh Kumar', action: 'Login (Passkey authenticated)', property: 'All', keyUsed: 'Primary Security Key (Yubikey 5)', result: 'Success' },
  { id: 'aud-2', timestamp: '2026-06-22 10:30', user: 'Suresh Kumar', action: 'Upload Document (Patta Mutation Passbook.pdf)', property: 'Golden Heights Villa', keyUsed: 'None', result: 'Success' },
  { id: 'aud-3', timestamp: '2026-06-22 11:05', user: 'Suresh Kumar', action: 'Approve Bank Sharing request for ICICI', property: 'Golden Heights Villa', keyUsed: 'Primary Security Key (Yubikey 5)', result: 'Success' }
];

export default function AssetDossierStack() {
  // --- STATES ---
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('fp_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('prop-1');
  const [documents, setDocuments] = useState<Document[]>(() => {
    const saved = localStorage.getItem('fp_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });
  const [mutations, setMutations] = useState<MutationItem[]>(() => {
    const saved = localStorage.getItem('fp_mutations');
    return saved ? JSON.parse(saved) : INITIAL_MUTATIONS;
  });
  const [reviews, setReviews] = useState<ProfessionalReview[]>(() => {
    const saved = localStorage.getItem('fp_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [risks, setRisks] = useState<RiskItem[]>(() => {
    const saved = localStorage.getItem('fp_risks');
    return saved ? JSON.parse(saved) : INITIAL_RISKS;
  });
  const [usbKeys, setUsbKeys] = useState<USBKey[]>(() => {
    const saved = localStorage.getItem('fp_usbkeys');
    return saved ? JSON.parse(saved) : INITIAL_KEYS;
  });
  const [audits, setAudits] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('fp_audits');
    return saved ? JSON.parse(saved) : INITIAL_AUDITS;
  });

  // Active Menu / Sub-tabs inside FP Asset Stack
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'properties' | 'bankpack' | 'usbcenter' | 'professional' | 'audit'>('dashboard');

  // Interactive workspace role
  const [activeRole, setActiveRole] = useState<'Owner' | 'Lawyer' | 'CA' | 'Valuer' | 'Surveyor'>('Owner');

  // Modals
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [isUsbModalOpen, setIsUsbModalOpen] = useState(false);
  const [usbActionName, setUsbActionName] = useState<string>('');
  const [usbCallback, setUsbCallback] = useState<(() => void) | null>(null);
  
  // Form States for Add Property
  const [newProp, setNewProp] = useState<Partial<Property>>({
    name: '', type: 'Residential House', ownershipType: 'Sole Ownership',
    currentOwner: 'Suresh Kumar', proposedOwner: 'Suresh Kumar', previousOwner: '',
    address: '', village: '', sro: '', surveyNumber: '', pattaNumber: '',
    extent: '', marketValue: 0, guidelineValue: 0, loanStatus: 'None',
    courtDispute: false, buildingApproval: true, insuranceStatus: false,
    rentalIncome: false, possessionStatus: 'Owner Occupied'
  });

  // Document Upload Form
  const [uploadCategory, setUploadCategory] = useState<'Title' | 'Government' | 'Encumbrance' | 'Financial' | 'Professional'>('Title');
  const [uploadDocType, setUploadDocType] = useState<string>('Sale Deed');
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResultData, setOcrResultData] = useState<any>(null);

  // Bank Sharing
  const [collateralTargetProperty, setCollateralTargetProperty] = useState<string>('prop-1');
  const [bankShareName, setBankShareName] = useState('HDFC Bank Limited');
  const [bankShareExpiry, setBankShareExpiry] = useState('7');
  const [bankShareDownload, setBankShareDownload] = useState(false);
  const [bankShareWatermark, setBankShareWatermark] = useState(true);
  const [activeCollateralTab, setActiveCollateralTab] = useState<'builder' | 'shares'>('builder');
  const [activeShares, setActiveShares] = useState<any[]>([
    { id: 'share-1', bank: 'ICICI Bank Ltd', property: 'Golden Heights Villa', expiry: '2026-06-29', download: 'No', status: 'Active' }
  ]);

  // Key Enrollment State
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'FIDO2' | 'DSC'>('FIDO2');

  // Professional Review Form
  const [profFindings, setProfFindings] = useState('');
  const [profRiskLevel, setProfRiskLevel] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');

  // Tamper detection simulation
  const [corruptedDocId, setCorruptedDocId] = useState<string | null>(null);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('fp_properties', JSON.stringify(properties));
  }, [properties]);
  useEffect(() => {
    localStorage.setItem('fp_documents', JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem('fp_mutations', JSON.stringify(mutations));
  }, [mutations]);
  useEffect(() => {
    localStorage.setItem('fp_reviews', JSON.stringify(reviews));
  }, [reviews]);
  useEffect(() => {
    localStorage.setItem('fp_risks', JSON.stringify(risks));
  }, [risks]);
  useEffect(() => {
    localStorage.setItem('fp_usbkeys', JSON.stringify(usbKeys));
  }, [usbKeys]);
  useEffect(() => {
    localStorage.setItem('fp_audits', JSON.stringify(audits));
  }, [audits]);

  const activeProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];

  // --- SCORE CALCULATOR ENGINE ---
  const calculateScores = (prop: Property) => {
    const propDocs = documents.filter(d => d.propertyId === prop.id);
    const propMutations = mutations.filter(m => m.propertyId === prop.id);
    const propReviews = reviews.filter(r => r.propertyId === prop.id);

    // 1. Legal Title Score (Max 30)
    let legal = 0;
    const hasSaleDeed = propDocs.some(d => d.type === 'Sale Deed' || d.type === 'Settlement Deed' || d.type === 'Gift Deed' || d.type === 'Partition Deed');
    const hasParent = propDocs.some(d => d.type === 'Parent Deed');
    if (hasSaleDeed) legal += 8;
    if (hasParent || prop.type === 'Apartment') legal += 7; // Parent not always required for apartments
    if (prop.ownershipType !== 'Jointly Owned' || propDocs.some(d => d.type === 'Release Deed' || d.type === 'Consent Deed')) legal += 8; // Complete chain
    if (prop.proposedOwner === prop.currentOwner) legal += 4; // Clear consent
    if (!prop.courtDispute) legal += 3;

    // 2. Government Record (Max 20)
    let gov = 0;
    const pattaCompleted = propMutations.find(m => m.recordType === 'Patta')?.status === 'Completed';
    const taxCompleted = propMutations.find(m => m.recordType === 'Property Tax')?.status === 'Completed';
    const hasSurvey = propDocs.some(d => d.type === 'FMB' || d.type === 'TSLR');
    if (pattaCompleted) gov += 7;
    if (taxCompleted) gov += 5;
    if (hasSurvey || prop.type === 'Apartment') gov += 4;
    if (prop.buildingApproval || prop.type === 'Agricultural Land') gov += 4;

    // 3. Encumbrance Score (Max 20)
    let enc = 0;
    const hasEC = propDocs.some(d => d.type === 'Encumbrance Certificate');
    if (hasEC) enc += 8;
    if (prop.loanStatus === 'None') {
      enc += 12;
    } else if (prop.loanStatus === 'Cleared') {
      enc += 12;
    } else if (prop.loanStatus === 'Cleared (Release Pending)') {
      enc += 8;
    } else {
      enc += 3; // Active Mortgage
    }

    // 4. Financial Readiness (Max 15)
    let fin = 0;
    const hasValuation = propDocs.some(d => d.type === 'Valuation Report');
    if (hasValuation) fin += 5;
    if (prop.marketValue > 0) fin += 3;
    if (prop.guidelineValue > 0) fin += 3;
    if (prop.rentalIncome) fin += 2;
    if (prop.insuranceStatus) fin += 2;

    // 5. Data Completeness (Max 15)
    let dataScore = 0;
    if (propDocs.length >= 4) dataScore += 5;
    else if (propDocs.length >= 2) dataScore += 3;
    const hasVerifiedDoc = propDocs.some(d => d.status === 'Verified');
    if (hasVerifiedDoc) dataScore += 3;
    const isReviewed = propReviews.some(r => r.signedStatus === 'Signed');
    if (isReviewed) dataScore += 4;
    dataScore += 3; // Checked within 12 months (simulated)

    const total = legal + gov + enc + fin + dataScore;

    let classification = 'Not usable for bank or legal action yet';
    let ratingColor = 'text-red-500 bg-red-50 border-red-200';
    if (total >= 85) {
      classification = 'Bank-ready asset';
      ratingColor = 'text-green-600 bg-green-50 border-green-200';
    } else if (total >= 70) {
      classification = 'Usable with minor corrections';
      ratingColor = 'text-blue-600 bg-blue-50 border-blue-200';
    } else if (total >= 50) {
      classification = 'Incomplete asset';
      ratingColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    } else if (total >= 30) {
      classification = 'Risk-heavy asset';
      ratingColor = 'text-orange-500 bg-orange-50 border-orange-200';
    }

    return { total, legal, gov, enc, fin, dataScore, classification, ratingColor };
  };

  // --- ACTIONS ---
  
  // Push to Audit Log
  const logAudit = (action: string, property: string, keyUsed: string = 'None', result: 'Success' | 'Failed' = 'Success') => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp,
      user: 'Suresh Kumar',
      action,
      property,
      keyUsed,
      result
    };
    setAudits(prev => [newLog, ...prev]);
  };

  // Simulated USB Challenge Modal
  const requestUsbKeyValidation = (actionName: string, successCallback: () => void) => {
    // If no keys enrolled, prompt them to enroll one
    if (usbKeys.length === 0) {
      alert("No security keys enrolled. Please go to the USB Key Center and enroll a key first.");
      return;
    }
    setUsbActionName(actionName);
    setUsbCallback(() => successCallback);
    setIsUsbModalOpen(true);
  };

  const handleUsbModalConfirm = () => {
    setIsUsbModalOpen(false);
    const selectedKey = usbKeys[0]; // defaults to first active key
    logAudit(usbActionName, activeProperty.name, selectedKey.name, 'Success');
    if (usbCallback) usbCallback();
    setUsbCallback(null);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.name || !newProp.address) {
      alert("Please fill in property name and address.");
      return;
    }
    const propId = `prop-${Date.now()}`;
    const code = `FP-PROP-${Math.floor(100 + Math.random() * 900)}`;
    const fullProp: Property = {
      ...(newProp as Property),
      id: propId,
      propertyCode: code
    };

    setProperties(prev => [...prev, fullProp]);
    
    // Seed basic mutation checklist for the new property
    const defaultMutations: MutationItem[] = [
      { id: `mut-n1-${Date.now()}`, propertyId: propId, recordType: 'Patta', currentName: 'Unverified', expectedName: fullProp.currentOwner, status: 'Not Started' },
      { id: `mut-n2-${Date.now()}`, propertyId: propId, recordType: 'Property Tax', currentName: 'Unverified', expectedName: fullProp.currentOwner, status: 'Not Started' },
      { id: `mut-n3-${Date.now()}`, propertyId: propId, recordType: 'EB', currentName: 'Unverified', expectedName: fullProp.currentOwner, status: 'Not Started' }
    ];
    setMutations(prev => [...prev, ...defaultMutations]);

    // Seed basic reviews for the new property
    const defaultReviews: ProfessionalReview[] = [
      { id: `rev-n1-${Date.now()}`, propertyId: propId, reviewerName: 'Assign Lawyer', role: 'Lawyer', findings: 'Deed analysis pending.', riskLevel: 'Low', signedStatus: 'Unsigned' }
    ];
    setReviews(prev => [...prev, ...defaultReviews]);

    logAudit(`Added new property: ${fullProp.name}`, fullProp.name);
    setSelectedPropertyId(propId);
    setIsAddPropertyOpen(false);
  };

  const handleDocUploadSimulate = () => {
    setOcrLoading(true);
    // Simulate OCR delay of 1.8 seconds
    setTimeout(() => {
      let mockOcr: Record<string, string> = {
        ownerName: activeProperty.currentOwner,
        sro: activeProperty.sro,
        surveyNumber: activeProperty.surveyNumber
      };

      if (uploadDocType === 'Sale Deed') {
        mockOcr = {
          ...mockOcr,
          documentNumber: `${Math.floor(1000 + Math.random()*8000)}/2026`,
          registrationYear: '2026',
          buyerName: activeProperty.currentOwner,
          sellerName: activeProperty.previousOwner || 'Prior Owner'
        };
      } else if (uploadDocType === 'Patta') {
        mockOcr = {
          ...mockOcr,
          pattaNumber: activeProperty.pattaNumber || 'PT-9912',
          surveyNumber: activeProperty.surveyNumber
        };
      }

      setOcrResultData({
        fileName: `${uploadDocType} - Mock Scan.pdf`,
        type: uploadDocType,
        ocrFields: mockOcr,
        confidence: Math.floor(80 + Math.random() * 19)
      });
      setOcrLoading(false);
    }, 1800);
  };

  const handleSaveOcrDocument = () => {
    if (!ocrResultData) return;
    
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      propertyId: selectedPropertyId,
      name: ocrResultData.fileName,
      type: ocrResultData.type,
      category: uploadCategory,
      fileUrl: '#',
      hash: `sha256-${Math.random().toString(16).substr(2, 8)}...`,
      uploadedBy: 'Suresh Kumar',
      verifiedBy: 'Pending Review',
      status: 'Pending',
      ocrStatus: 'Completed',
      ocrConfidence: ocrResultData.confidence,
      ocrData: ocrResultData.ocrFields,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setDocuments(prev => [...prev, newDoc]);
    logAudit(`Uploaded document (OCR parsed): ${newDoc.name}`, activeProperty.name);
    
    // Auto-update Mutation checks if this was a government record matching the expectations
    if (newDoc.type === 'Patta' && newDoc.ocrData?.ownerName === activeProperty.currentOwner) {
      setMutations(prev => prev.map(m => 
        (m.propertyId === selectedPropertyId && m.recordType === 'Patta') 
          ? { ...m, currentName: newDoc.ocrData?.ownerName || '', status: 'Completed', completedDate: newDoc.createdAt }
          : m
      ));
    }

    setOcrResultData(null);
    setIsUploadDocOpen(false);
  };

  const handleSimulateTamper = (docId: string) => {
    // Flag this document as tampered (hash mismatched)
    setCorruptedDocId(docId);
    setDocuments(prev => prev.map(d => 
      d.id === docId ? { ...d, status: 'Rejected', hash: 'HASH-MISMATCH-WARNING!' } : d
    ));
    logAudit(`SECURITY ALERT: Tamper detected for document!`, activeProperty.name, 'System Audit', 'Failed');
    alert("CRITICAL WARNING: Tamper detected! The file's current hash does not match the blockchain/secure-vault hash record. Access restricted.");
  };

  const handleRestoreTamper = (docId: string) => {
    setCorruptedDocId(null);
    setDocuments(prev => prev.map(d => 
      d.id === docId ? { ...d, status: 'Verified', hash: 'sha256-a1c2e3f4...' } : d
    ));
    logAudit(`Document integrity restored from backup`, activeProperty.name, 'Admin Restore', 'Success');
  };

  const handleBankShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestUsbKeyValidation("Approve Bank Sharing Pack for " + bankShareName, () => {
      const shareProp = properties.find(p => p.id === collateralTargetProperty);
      const newShare = {
        id: `share-${Date.now()}`,
        bank: bankShareName,
        property: shareProp ? shareProp.name : 'Unknown',
        expiry: new Date(Date.now() + parseInt(bankShareExpiry) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        download: bankShareDownload ? 'Yes' : 'No',
        status: 'Active'
      };
      setActiveShares(prev => [newShare, ...prev]);
      alert(`Bank Pack shared securely. Link sent to ${bankShareName} (Expires in ${bankShareExpiry} days).`);
    });
  };

  const handleRevokeShare = (shareId: string, bankName: string) => {
    requestUsbKeyValidation(`Revoke share permissions for ${bankName}`, () => {
      setActiveShares(prev => prev.filter(s => s.id !== shareId));
      alert(`Access revoked. ${bankName} can no longer view this asset.`);
    });
  };

  const handleEnrollKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const keyId = `key-${Date.now()}`;
    const newK: USBKey = {
      id: keyId,
      name: newKeyName,
      type: newKeyType,
      status: 'Active',
      enrolledAt: new Date().toISOString().split('T')[0],
      keyIdentifier: `${newKeyType.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setUsbKeys(prev => [...prev, newK]);
    logAudit(`Enrolled new USB Key: ${newK.name}`, 'Security Settings');
    setNewKeyName('');
    alert(`Successfully enrolled key: ${newK.name}`);
  };

  const handleRevokeKey = (keyId: string, name: string) => {
    setUsbKeys(prev => prev.map(k => k.id === keyId ? { ...k, status: 'Revoked' } : k));
    logAudit(`Revoked USB Key: ${name}`, 'Security Settings');
    alert(`Revoked key: ${name}`);
  };

  const handleProfessionalSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profFindings) return;

    requestUsbKeyValidation(`Digitally sign ${activeRole} Title Note`, () => {
      // Add or update review
      const existing = reviews.find(r => r.propertyId === selectedPropertyId && r.role === activeRole);
      if (existing) {
        setReviews(prev => prev.map(r => 
          r.id === existing.id 
            ? { 
                ...r, 
                findings: profFindings, 
                riskLevel: profRiskLevel, 
                signedStatus: 'Signed', 
                signedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
                keyRef: usbKeys[0]?.keyIdentifier || 'dsc-signer'
              }
            : r
        ));
      } else {
        const newR: ProfessionalReview = {
          id: `rev-${Date.now()}`,
          propertyId: selectedPropertyId,
          reviewerName: activeRole === 'Lawyer' ? 'Vikram Advani' : activeRole === 'CA' ? 'Amit Shah' : activeRole === 'Valuer' ? 'Sanjay Mehta' : 'Karan Singh',
          role: activeRole,
          findings: profFindings,
          riskLevel: profRiskLevel,
          signedStatus: 'Signed',
          signedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          keyRef: usbKeys[0]?.keyIdentifier || 'dsc-signer'
        };
        setReviews(prev => [...prev, newR]);
      }

      // Also auto-resolve or create risks based on review inputs
      if (profRiskLevel === 'Low' || profRiskLevel === 'Medium') {
        // Resolve high risk if it was set
        setRisks(prev => prev.map(rk => 
          (rk.propertyId === selectedPropertyId && rk.severity === 'Critical') 
            ? { ...rk, status: 'Resolved' } 
            : rk
        ));
      }

      setProfFindings('');
      alert(`${activeRole} verification uploaded and signed successfully.`);
    });
  };

  const handleDownloadDossier = (type: string) => {
    requestUsbKeyValidation(`Finalize and export ${type}`, () => {
      logAudit(`Generated dossier report (${type})`, activeProperty.name);
      
      // Trigger a print styled wrapper
      window.print();
    });
  };

  // --- STATS HELPER ---
  const activePropertyStats = calculateScores(activeProperty);
  
  const allPropertiesValue = properties.reduce((acc, p) => acc + p.marketValue, 0);
  const bankReadyProperties = properties.filter(p => calculateScores(p).total >= 85);
  const bankReadyValue = bankReadyProperties.reduce((acc, p) => acc + p.marketValue, 0);
  const totalRisksOpen = risks.filter(r => r.status === 'Open').length;
  const totalMutationGaps = mutations.filter(m => m.status !== 'Completed' && m.status !== 'Not Required').length;
  const totalMissingDocs = properties.reduce((acc, p) => {
    const docs = documents.filter(d => d.propertyId === p.id);
    const required = p.type === 'Apartment' ? 4 : 5; // simplified logic
    const diff = required - docs.length;
    return acc + (diff > 0 ? diff : 0);
  }, 0);

  return (
    <div className="space-y-6 text-gray-800 dark:text-gray-100">
      
      {/* SECTION HEADER & ROLE SWITCHER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-gray-800/40 border border-white/20 p-5 rounded-2xl backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Finpercent Asset Dossier Stack
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">Property collateral-readiness ledger and USB cryptographic validation engine.</p>
        </div>
        
        {/* Role switcher to test professional reviews */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700/80 p-1.5 rounded-xl border border-gray-200 dark:border-gray-600">
          <span className="text-xs font-semibold px-2 text-gray-500 dark:text-gray-400">View As:</span>
          {(['Owner', 'Lawyer', 'CA', 'Valuer', 'Surveyor'] as const).map(role => (
            <button
              key={role}
              onClick={() => {
                setActiveRole(role);
                // Switch tab context to professional review if they select a pro role
                if (role !== 'Owner') {
                  setActiveSubTab('professional');
                } else {
                  setActiveSubTab('dashboard');
                }
              }}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                activeRole === role 
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-900' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* INNER PAGES SELECTOR BAR */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === 'dashboard' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        
        <button
          onClick={() => setActiveSubTab('properties')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === 'properties' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Properties Vault ({properties.length})</span>
        </button>
        
        <button
          onClick={() => setActiveSubTab('bankpack')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === 'bankpack' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Bank Collateral Pack</span>
        </button>

        <button
          onClick={() => setActiveSubTab('professional')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === 'professional' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Professional Workspace</span>
        </button>
        
        <button
          onClick={() => setActiveSubTab('usbcenter')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === 'usbcenter' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>USB Key Center ({usbKeys.length})</span>
        </button>
        
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSubTab === 'audit' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Consent & Audit Log</span>
        </button>
      </div>

      {/* SUB-TABS INTERACTIVE CONTENT VIEW */}
      <AnimatePresence mode="wait">
        
        {/* --- VIEW 1: DASHBOARD --- */}
        {activeSubTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="neo-card p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10 border-indigo-200/50">
                <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Total Assets Portfolio</div>
                <div className="text-2xl font-black mt-2 text-indigo-900 dark:text-indigo-200">
                  ₹{(allPropertiesValue / 10000000).toFixed(2)} Cr
                </div>
                <div className="text-xs text-gray-500 mt-1">{properties.length} Registered Properties</div>
              </div>
              
              <div className="neo-card p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border-green-200/50">
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider">Bank-Ready Collateral</div>
                <div className="text-2xl font-black mt-2 text-green-800 dark:text-green-200">
                  ₹{(bankReadyValue / 10000000).toFixed(2)} Cr
                </div>
                <div className="text-xs text-green-600 font-medium mt-1 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {bankReadyProperties.length} Properties (Score &ge; 85)
                </div>
              </div>

              <div className="neo-card p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border-amber-200/50">
                <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Mutation Gap Gaps</div>
                <div className="text-2xl font-black mt-2 text-amber-800 dark:text-amber-200">
                  {totalMutationGaps} Pending
                </div>
                <div className="text-xs text-gray-500 mt-1">Utility & Government records</div>
              </div>

              <div className="neo-card p-5 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/10 border-rose-200/50">
                <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Critical Title Risks</div>
                <div className="text-2xl font-black mt-2 text-rose-800 dark:text-rose-200">
                  {totalRisksOpen} Active
                </div>
                <div className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  Action Required
                </div>
              </div>
            </div>

            {/* Quick Property Checklist Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Property Portfolio Card List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-purple-600" />
                    Property Profiles Inventory
                  </h3>
                  <button 
                    onClick={() => {
                      setNewProp({
                        name: '', type: 'Residential House', ownershipType: 'Sole Ownership',
                        currentOwner: 'Suresh Kumar', proposedOwner: 'Suresh Kumar', previousOwner: '',
                        address: '', village: '', sro: '', surveyNumber: '', pattaNumber: '',
                        extent: '', marketValue: 0, guidelineValue: 0, loanStatus: 'None',
                        courtDispute: false, buildingApproval: true, insuranceStatus: false,
                        rentalIncome: false, possessionStatus: 'Owner Occupied'
                      });
                      setIsAddPropertyOpen(true);
                    }}
                    className="flex items-center space-x-1 text-xs bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1.5 rounded-lg shadow font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Property</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {properties.map(p => {
                    const stats = calculateScores(p);
                    return (
                      <div 
                        key={p.id}
                        className={`p-5 rounded-2xl border transition-all duration-300 ${
                          selectedPropertyId === p.id 
                            ? 'bg-white dark:bg-gray-800 border-purple-500 shadow-xl scale-[1.01]' 
                            : 'bg-white/50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800'
                        } cursor-pointer`}
                        onClick={() => setSelectedPropertyId(p.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded font-mono font-semibold">
                                {p.propertyCode}
                              </span>
                              <h4 className="font-bold text-gray-900 dark:text-white">{p.name}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{p.address}</p>
                          </div>
                          
                          {/* Readiness score ring preview */}
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-sm font-black text-gray-800 dark:text-white">
                                Score: <span className="text-purple-600 dark:text-purple-400">{stats.total}</span>/100
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${stats.ratingColor}`}>
                                {stats.classification}
                              </span>
                            </div>
                            
                            <div className="relative w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full">
                              <span className="text-xs font-black">{stats.total}</span>
                              <svg className="absolute w-full h-full transform -rotate-90">
                                <circle 
                                  cx="24" cy="24" r="20" 
                                  className="stroke-gray-200 dark:stroke-gray-700" 
                                  strokeWidth="3.5" fill="none"
                                />
                                <circle 
                                  cx="24" cy="24" r="20" 
                                  className={`${stats.total >= 85 ? 'stroke-green-500' : stats.total >= 70 ? 'stroke-blue-500' : stats.total >= 50 ? 'stroke-yellow-500' : 'stroke-red-500'}`}
                                  strokeWidth="3.5" fill="none"
                                  strokeDasharray="125"
                                  strokeDashoffset={125 - (125 * stats.total) / 100}
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-gray-100 dark:border-gray-700/60 pt-3 text-xs text-gray-600 dark:text-gray-300">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Property Type</span>
                            <span className="font-semibold">{p.type}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Current Owner</span>
                            <span className="font-semibold">{p.currentOwner}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Estimated Value</span>
                            <span className="font-semibold text-purple-600 dark:text-purple-400">₹{(p.marketValue / 100000).toFixed(1)} L</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Mortgage Status</span>
                            <span className={`font-semibold ${p.loanStatus === 'Active Mortgage' ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                              {p.loanStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consolidated Risk Register */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" />
                  Portfolio Risk Register
                </h3>
                
                <div className="neo-card p-5 bg-white dark:bg-gray-800 space-y-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-2">
                    Active Risks ({risks.filter(r => r.status === 'Open').length})
                  </div>
                  
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {risks.filter(r => r.status === 'Open').map(risk => {
                      const linkedProp = properties.find(p => p.id === risk.propertyId);
                      const severityColors = {
                        Low: 'bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-950 dark:text-blue-300',
                        Medium: 'bg-yellow-50 text-yellow-800 border-yellow-100 dark:bg-yellow-950 dark:text-yellow-300',
                        High: 'bg-orange-50 text-orange-800 border-orange-100 dark:bg-orange-950 dark:text-orange-300',
                        Critical: 'bg-red-50 text-red-800 border-red-100 dark:bg-red-950 dark:text-red-300'
                      };
                      return (
                        <div key={risk.id} className="p-3 bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">
                              {linkedProp ? linkedProp.name : 'Unknown Property'}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${severityColors[risk.severity]}`}>
                              {risk.severity}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-gray-900 dark:text-white">{risk.title}</h5>
                          <p className="text-[11px] text-gray-500 leading-normal">{risk.description}</p>
                          <div className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold pt-1 border-t border-dashed border-gray-200 dark:border-gray-700 mt-1">
                            Action: {risk.actionNeeded}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Print/Export Dossier Layout */}
            <div className="neo-card p-5 bg-white dark:bg-gray-800 border-purple-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 rounded-xl flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Export Master Asset Dossier</h4>
                  <p className="text-xs text-gray-500">Compile all verified property timeline chains, scores, and tax records into a certified audit PDF.</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDownloadDossier('Master Property Dossier')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Certified PDF</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- VIEW 2: PROPERTY VAULT & PROFILE --- */}
        {activeSubTab === 'properties' && (
          <motion.div
            key="properties"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            
            {/* Sidebar list to select property */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Property</h3>
              <div className="space-y-2">
                {properties.map(p => {
                  const score = calculateScores(p).total;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPropertyId(p.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedPropertyId === p.id 
                          ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-500 text-purple-900 dark:text-purple-300 font-bold ring-2 ring-purple-100'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-700/40 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gray-400 block">{p.propertyCode}</span>
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 font-black">
                          Score: {score}
                        </span>
                      </div>
                      <div className="text-sm font-bold truncate mt-1">{p.name}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{p.address}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main property detail pane */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Header profile cards */}
              <div className="neo-card p-6 bg-white dark:bg-gray-800 space-y-6">
                
                {/* Visual score row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-gray-700 pb-4 gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-950 dark:text-white">{activeProperty.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{activeProperty.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-700/40 p-3 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-inner">
                      <span className="text-lg font-black text-purple-600 dark:text-purple-400">{activePropertyStats.total}</span>
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" className="stroke-gray-100 dark:stroke-gray-700" strokeWidth="4" fill="none"/>
                        <circle 
                          cx="32" cy="32" r="28" 
                          className={`${activePropertyStats.total >= 85 ? 'stroke-green-500' : activePropertyStats.total >= 70 ? 'stroke-blue-500' : activePropertyStats.total >= 50 ? 'stroke-yellow-500' : 'stroke-red-500'}`}
                          strokeWidth="4" fill="none"
                          strokeDasharray="175"
                          strokeDashoffset={175 - (175 * activePropertyStats.total) / 100}
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">Readiness Score</span>
                      <div className="text-sm font-black text-gray-800 dark:text-gray-200">{activePropertyStats.classification}</div>
                      <button 
                        onClick={() => alert(`Score breakdown:\n- Legal Title: ${activePropertyStats.legal}/30\n- Govt Records: ${activePropertyStats.gov}/20\n- Encumbrance: ${activePropertyStats.enc}/20\n- Financials: ${activePropertyStats.fin}/15\n- Data Completeness: ${activePropertyStats.dataScore}/15`)}
                        className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center"
                      >
                        <Info className="w-3.5 h-3.5 mr-1" /> View Breakdown
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-sections tabs: Vault, Timeline, Mutation, Risks */}
                <div className="space-y-6">
                  
                  {/* 1. DOCUMENT VAULT */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                        <Shield className="w-4 h-4 mr-1.5 text-purple-500" />
                        Document Vault & Verification
                      </h4>
                      <button
                        onClick={() => {
                          setOcrResultData(null);
                          setIsUploadDocOpen(true);
                        }}
                        className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded font-semibold"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload & OCR</span>
                      </button>
                    </div>

                    <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                      {documents.filter(d => d.propertyId === activeProperty.id).map(doc => {
                        const isCorrupted = corruptedDocId === doc.id;
                        return (
                          <div key={doc.id} className="p-4 bg-white dark:bg-gray-800/80 hover:bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCorrupted ? 'bg-red-100 text-red-600' : 'bg-purple-100/60 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'}`}>
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-gray-955 dark:text-white flex items-center gap-1.5">
                                  {doc.name}
                                  {doc.status === 'Verified' && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                                  {isCorrupted && <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">TAMPER WARNING</span>}
                                </h5>
                                <p className="text-[11px] text-gray-400">
                                  Category: {doc.category} | Hash: <span className="font-mono text-[10px]">{doc.hash}</span>
                                </p>
                                
                                {/* OCR Data Tag Info */}
                                {doc.ocrData && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {Object.entries(doc.ocrData).slice(0, 3).map(([key, val]) => (
                                      <span key={key} className="text-[9px] bg-slate-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded font-mono">
                                        {key}: {val}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 justify-end">
                              {/* Tamper testing simulation buttons */}
                              {!isCorrupted ? (
                                <button
                                  onClick={() => handleSimulateTamper(doc.id)}
                                  className="text-[10px] text-red-500 border border-red-200 hover:bg-red-50 px-2.5 py-1 rounded"
                                  title="Simulate modifying file on disk to test tamper detection"
                                >
                                  Simulate Mismatch
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRestoreTamper(doc.id)}
                                  className="text-[10px] text-green-600 border border-green-200 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded font-bold"
                                >
                                  Restore Backup
                                </button>
                              )}
                              
                              <button 
                                onClick={() => alert(`Document Details:\nHash: ${doc.hash}\nUploaded By: ${doc.uploadedBy}\nReviewer: ${doc.verifiedBy}\nCreated At: ${doc.createdAt}`)}
                                className="text-gray-500 hover:text-purple-600 p-1.5 rounded"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      
                      {documents.filter(d => d.propertyId === activeProperty.id).length === 0 && (
                        <div className="p-8 text-center text-gray-400 text-sm">
                          No documents uploaded. Click "Upload & OCR" above to add property papers.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. VISUAL TITLE CHAIN TIMELINE */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                      <Scale className="w-4 h-4 mr-1.5 text-purple-500" />
                      Visual Title Chain Timeline
                    </h4>
                    
                    <div className="relative border-l-2 border-purple-200 dark:border-purple-950 pl-5 ml-3.5 py-2 space-y-6">
                      
                      {/* Grandfather node */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 bg-purple-500 border-2 border-white rounded-full"></div>
                        <div className="text-xs font-bold text-gray-400">1982 Acquire Year</div>
                        <h5 className="text-sm font-extrabold text-gray-905 dark:text-white">Sale Deed acquired by Ananth Kumar (Grandfather)</h5>
                        <p className="text-xs text-gray-500">Registered Document #345/1978. Property acquired from ancestral family holding.</p>
                      </div>

                      {/* Father node */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 bg-purple-500 border-2 border-white rounded-full"></div>
                        <div className="text-xs font-bold text-gray-400">2005 Inheritance Year</div>
                        <h5 className="text-sm font-extrabold text-gray-905 dark:text-white">Inherited by Ramesh Kumar (Father)</h5>
                        <p className="text-xs text-gray-500">Transferred via Legal Heir Certificate and Will Probate. Patta mutated successfully in 2006.</p>
                      </div>

                      {/* Current owner node */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full ring-4 ring-green-100"></div>
                        <div className="text-xs font-bold text-green-500">2026 Settlement Year</div>
                        <h5 className="text-sm font-extrabold text-gray-905 dark:text-white flex items-center gap-1.5">
                          Settlement Deed to {activeProperty.currentOwner} (Current User)
                          <span className="text-[9px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold">Active Title</span>
                        </h5>
                        <p className="text-xs text-gray-500">
                          Registered Document #1240/2026. Patta transfer: <span className="font-semibold">{mutations.find(m => m.propertyId === activeProperty.id && m.recordType === 'Patta')?.status}</span>.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* 3. MUTATION TRACKER & GAP REPORT */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                      <RefreshCw className="w-4 h-4 mr-1.5 text-purple-500" />
                      Mutation & Government Record Tracker
                    </h4>

                    {/* Mutation gap alert if mismatch exists */}
                    {mutations.filter(m => m.propertyId === activeProperty.id && m.status !== 'Completed' && m.status !== 'Not Required').length > 0 && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 rounded-xl flex items-start space-x-2 text-xs text-amber-800 dark:text-amber-300">
                        <AlertTriangle className="w-4.5 h-4.5 mr-1 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Mutation Gap Detected:</span> Mismatches exist between the registered Title Deed owner name (<span className="underline">{activeProperty.currentOwner}</span>) and the current government or municipal registers. See details below.
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      {mutations.filter(m => m.propertyId === activeProperty.id).map(mut => {
                        const statusColor = {
                          'Not Required': 'bg-gray-100 text-gray-600',
                          'Not Started': 'bg-red-50 text-red-600 border border-red-100',
                          'Applied': 'bg-blue-50 text-blue-600 border border-blue-100',
                          'Pending Verification': 'bg-yellow-50 text-yellow-600 border border-yellow-100',
                          'Objection Raised': 'bg-red-100 text-red-800 border border-red-300 font-bold',
                          'Completed': 'bg-green-50 text-green-600 border border-green-100 font-semibold'
                        };
                        return (
                          <div key={mut.id} className="p-3.5 bg-slate-50 dark:bg-slate-700/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-gray-900 dark:text-white">{mut.recordType}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded ${statusColor[mut.status]}`}>
                                {mut.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                              <div>
                                <span className="block text-gray-400">Record Name</span>
                                <span className={`font-mono ${mut.currentName !== mut.expectedName ? 'text-red-500 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                                  {mut.currentName || 'Not Set'}
                                </span>
                              </div>
                              <div>
                                <span className="block text-gray-400">Title Deed Name</span>
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">{mut.expectedName}</span>
                              </div>
                            </div>
                            
                            {/* Actions to mutate */}
                            {mut.status === 'Not Started' && (
                              <button
                                onClick={() => {
                                  setMutations(prev => prev.map(m => m.id === mut.id ? { ...m, status: 'Applied', appliedDate: new Date().toISOString().split('T')[0] } : m));
                                  alert(`Applied for ${mut.recordType} mutation. Tracking ID generated.`);
                                }}
                                className="w-full text-center py-1 bg-white hover:bg-slate-100 text-[10px] text-purple-600 border border-purple-200 rounded font-semibold mt-1"
                              >
                                File Mutation Transfer
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* --- VIEW 3: BANK COLLATERAL PACK --- */}
        {activeSubTab === 'bankpack' && (
          <motion.div
            key="bankpack"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header sub-tabs: builder vs active shares */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setActiveCollateralTab('builder')}
                className={`px-4 py-2 font-bold text-sm border-b-2 transition-all ${activeCollateralTab === 'builder' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'}`}
              >
                1. Collateral Pack Builder
              </button>
              <button 
                onClick={() => setActiveCollateralTab('shares')}
                className={`px-4 py-2 font-bold text-sm border-b-2 transition-all ${activeCollateralTab === 'shares' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'}`}
              >
                2. Active Shares & Audits ({activeShares.length})
              </button>
            </div>

            {activeCollateralTab === 'builder' && (
              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Configuration Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="neo-card p-6 bg-white dark:bg-gray-800 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-2 text-purple-600" />
                      Configure Collateral Security Pack
                    </h3>
                    
                    <form onSubmit={handleBankShareSubmit} className="space-y-4">
                      
                      {/* Property selector */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Target Collateral Property</label>
                        <select
                          value={collateralTargetProperty}
                          onChange={(e) => setCollateralTargetProperty(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                          {properties.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.propertyCode})</option>
                          ))}
                        </select>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Privacy Guard active: All other properties in your Finpercent dossier will be completely hidden from the reviewer.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Recipient Bank / NBFC</label>
                          <input
                            type="text"
                            value={bankShareName}
                            onChange={(e) => setBankShareName(e.target.value)}
                            placeholder="e.g. HDFC Bank, SBI Bank"
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Access Expiry Period</label>
                          <select
                            value={bankShareExpiry}
                            onChange={(e) => setBankShareExpiry(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="3">3 Days</option>
                            <option value="7">7 Days</option>
                            <option value="15">15 Days</option>
                            <option value="30">30 Days</option>
                          </select>
                        </div>
                      </div>

                      {/* Security policies */}
                      <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl space-y-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sharing & Privacy Policy</div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-700 dark:text-gray-200">Allow PDF Document Download</span>
                          <input 
                            type="checkbox" 
                            checked={bankShareDownload} 
                            onChange={(e) => setBankShareDownload(e.target.checked)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-700 dark:text-gray-200">Apply Audit Watermarking (IP + Actor ID)</span>
                          <input 
                            type="checkbox" 
                            checked={bankShareWatermark} 
                            onChange={(e) => setBankShareWatermark(e.target.checked)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                          />
                        </div>
                      </div>

                      {/* Key validation disclaimer */}
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-100 rounded-lg flex items-center space-x-2 text-[10px] text-purple-700 dark:text-purple-300">
                        <Lock className="w-3.5 h-3.5 text-purple-600 mr-1" />
                        <span>High-Security Action: Sharing requires USB Cryptographic Key approval.</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                      >
                        <Fingerprint className="w-4 h-4" />
                        <span>Sign & Share Collateral Pack</span>
                      </button>

                    </form>
                  </div>
                </div>

                {/* Readiness Score Checklist sidebar */}
                <div className="space-y-6">
                  <div className="neo-card p-5 bg-white dark:bg-gray-800 space-y-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Collateral Integrity Checklist</h4>
                    
                    {(() => {
                      const shareProp = properties.find(p => p.id === collateralTargetProperty) || properties[0];
                      const propDocs = documents.filter(d => d.propertyId === shareProp.id);
                      const propMutations = mutations.filter(m => m.propertyId === shareProp.id);
                      
                      const hasSaleDeed = propDocs.some(d => d.category === 'Title');
                      const pattaCompleted = propMutations.find(m => m.recordType === 'Patta')?.status === 'Completed';
                      const taxCompleted = propMutations.find(m => m.recordType === 'Property Tax')?.status === 'Completed';
                      const noMortgage = shareProp.loanStatus === 'None' || shareProp.loanStatus === 'Cleared';
                      const hasValuation = propDocs.some(d => d.type === 'Valuation Report');

                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b pb-2 border-slate-100 dark:border-slate-800">
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Property</span>
                            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{shareProp.name}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">1. Original Title Deeds</span>
                            {hasSaleDeed ? <Check className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">2. Patta/Govt Record Match</span>
                            {pattaCompleted ? <Check className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">3. Property Tax Mutated</span>
                            {taxCompleted ? <Check className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">4. Clear Encumbrance</span>
                            {noMortgage ? <Check className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">5. Registered Valuation Report</span>
                            {hasValuation ? <Check className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>

                          {/* LTV Estimation */}
                          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-1">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Estimated LTV (65%)</div>
                            <div className="text-lg font-black text-purple-700 dark:text-purple-300">
                              ₹{((shareProp.marketValue * 0.65) / 100000).toFixed(1)} Lakhs
                            </div>
                            <p className="text-[9px] text-gray-400">Based on market valuation of ₹{(shareProp.marketValue / 100000).toFixed(1)} L.</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

              </div>
            )}

            {activeCollateralTab === 'shares' && (
              <div className="neo-card p-6 bg-white dark:bg-gray-800 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Bank Sharing Links</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400">
                        <th className="py-2.5">Bank Name</th>
                        <th className="py-2.5">Property</th>
                        <th className="py-2.5">Expiry Date</th>
                        <th className="py-2.5">PDF Download</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-200">
                      {activeShares.map(sh => (
                        <tr key={sh.id} className="hover:bg-slate-50/50">
                          <td className="py-3 font-bold">{sh.bank}</td>
                          <td className="py-3 text-purple-600 dark:text-purple-400 font-semibold">{sh.property}</td>
                          <td className="py-3 font-mono">{sh.expiry}</td>
                          <td className="py-3">{sh.download}</td>
                          <td className="py-3"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-600 border border-green-100 font-semibold">{sh.status}</span></td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => handleRevokeShare(sh.id, sh.bank)}
                              className="text-[10px] text-red-500 font-semibold border border-red-200 hover:bg-red-50 px-2 py-0.5 rounded"
                            >
                              Revoke Access
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* --- VIEW 4: PROFESSIONAL REVIEWER WORKSPACE --- */}
        {activeSubTab === 'professional' && (
          <motion.div
            key="professional"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Pro side pane summary */}
            <div className="space-y-6">
              <div className="neo-card p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/10 border-purple-200/50 space-y-4">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                  <h4 className="font-extrabold text-gray-900 dark:text-white">Active Reviewer: {activeRole}</h4>
                </div>
                
                <div className="text-xs text-gray-600 leading-normal">
                  You have switched your workspace role. You can write official findings, assess risk profiles, and apply your digital signature to the active property.
                </div>
                
                <div className="border-t border-purple-200/60 pt-3">
                  <span className="text-[10px] text-purple-500 uppercase tracking-wider block font-bold">Property Selected</span>
                  <span className="text-sm font-bold text-purple-955 dark:text-purple-300">{activeProperty.name}</span>
                </div>
              </div>
            </div>

            {/* Findings entry form */}
            <div className="lg:col-span-2">
              <div className="neo-card p-6 bg-white dark:bg-gray-800 space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-3 border-gray-100 dark:border-gray-700">
                  Submit Professional Opinion & Sign
                </h3>
                
                <form onSubmit={handleProfessionalSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {activeRole} Report Findings & Notes
                    </label>
                    <textarea
                      value={profFindings}
                      onChange={(e) => setProfFindings(e.target.value)}
                      placeholder={`Enter detailed report, findings, encumbrances, or structural assessments as a certified ${activeRole.toUpperCase()}...`}
                      rows={5}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Risk Severity Assessment</label>
                      <select
                        value={profRiskLevel}
                        onChange={(e) => setProfRiskLevel(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Low">Low Risk</option>
                        <option value="Medium">Medium Risk</option>
                        <option value="High">High Risk</option>
                        <option value="Critical">Critical Risk</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Signing Token type</label>
                      <div className="bg-slate-50 dark:bg-slate-700/40 p-3 rounded-xl border border-gray-100 dark:border-slate-800 text-xs font-semibold flex items-center">
                        <Key className="w-4 h-4 mr-2 text-purple-600" />
                        <span>PKCS#11 DSC Security Token</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>Digitally Sign & Register Opinion</span>
                  </button>
                </form>

                {/* Show current reviews for this property */}
                <div className="space-y-4 border-t pt-4 border-slate-100 dark:border-slate-800 mt-6">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Existing Professional Audits ({reviews.filter(r => r.propertyId === activeProperty.id).length})
                  </div>
                  
                  <div className="space-y-3">
                    {reviews.filter(r => r.propertyId === activeProperty.id).map(rev => (
                      <div key={rev.id} className="p-4 bg-slate-50 dark:bg-slate-700/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{rev.reviewerName} ({rev.role})</span>
                            <span className="text-[10px] text-gray-400 block font-mono">Sign Token: {rev.keyRef || 'N/A'}</span>
                          </div>
                          
                          <div className="text-right">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                              rev.riskLevel === 'Low' ? 'bg-green-50 text-green-600' : rev.riskLevel === 'Medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {rev.riskLevel} Risk
                            </span>
                            <span className="text-[9px] text-gray-400 block mt-1">{rev.signedAt || 'Unsigned'}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-650 dark:text-gray-305 italic">"{rev.findings}"</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* --- VIEW 5: USB KEY CENTER --- */}
        {activeSubTab === 'usbcenter' && (
          <motion.div
            key="usbcenter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Enrollment form */}
            <div className="neo-card p-6 bg-white dark:bg-gray-800 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Plus className="w-5 h-5 mr-1.5 text-purple-600" />
                Enroll New USB Security Key
              </h3>
              
              <form onSubmit={handleEnrollKey} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Key Name/Label</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. My Yubikey Blue, Office token"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Key Category</label>
                  <select
                    value={newKeyType}
                    onChange={(e) => setNewKeyType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="FIDO2">FIDO2 USB security key (Authentication)</option>
                    <option value="DSC">Licensed Indian DSC Provider (Signing)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
                >
                  Enroll Cryptographic Token
                </button>
              </form>
            </div>

            {/* Enrolled key list */}
            <div className="lg:col-span-2 space-y-6">
              <div className="neo-card p-6 bg-white dark:bg-gray-800 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Cryptographic Vault Tokens</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {usbKeys.map(k => (
                    <div 
                      key={k.id} 
                      className={`p-4 rounded-xl border relative overflow-hidden flex items-start space-x-3 transition-all ${
                        k.status === 'Revoked' ? 'opacity-50 border-gray-200 bg-gray-50' : 'bg-slate-50 dark:bg-slate-700/20 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-bold text-sm text-gray-900 dark:text-white">{k.name}</h5>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold uppercase">
                            {k.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">ID: {k.keyIdentifier}</p>
                        <p className="text-[10px] text-gray-400">Enrolled: {k.enrolledAt}</p>
                      </div>

                      {k.status === 'Active' && (
                        <button
                          onClick={() => handleRevokeKey(k.id, k.name)}
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- VIEW 6: AUDIT TRAIL --- */}
        {activeSubTab === 'audit' && (
          <motion.div
            key="audit"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="neo-card p-6 bg-white dark:bg-gray-800 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Immutable Ledger Audit Trail</h3>
              <button 
                onClick={() => {
                  setAudits([]); 
                  logAudit('Audit trail logs cleared manually', 'Security settings');
                }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Clear Logs
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400">
                    <th className="py-2.5">Timestamp</th>
                    <th className="py-2.5">Actor</th>
                    <th className="py-2.5">Action Event</th>
                    <th className="py-2.5">Affected Asset</th>
                    <th className="py-2.5">USB Key Validated</th>
                    <th className="py-2.5 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-200">
                  {audits.map(aud => (
                    <tr key={aud.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-mono">{aud.timestamp}</td>
                      <td className="py-3 font-semibold">{aud.user}</td>
                      <td className="py-3">{aud.action}</td>
                      <td className="py-3 text-purple-600 dark:text-purple-400 font-semibold">{aud.property}</td>
                      <td className="py-3 font-mono text-gray-500">{aud.keyUsed}</td>
                      <td className="py-3 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          aud.result === 'Success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {aud.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* --- MODAL 1: ADD PROPERTY --- */}
      <AnimatePresence>
        {isAddPropertyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Property to Inventory</h3>
              
              <form onSubmit={handleAddProperty} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Property Name</label>
                    <input
                      type="text"
                      value={newProp.name}
                      onChange={(e) => setNewProp(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Riverdale Villa"
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Property Type</label>
                    <select
                      value={newProp.type}
                      onChange={(e) => setNewProp(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    >
                      <option value="Residential House">Residential House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial Building">Commercial Building</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase">Address</label>
                  <input
                    type="text"
                    value={newProp.address}
                    onChange={(e) => setNewProp(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Plot, Street, Area, City"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Survey / Subdivision No</label>
                    <input
                      type="text"
                      value={newProp.surveyNumber}
                      onChange={(e) => setNewProp(prev => ({ ...prev, surveyNumber: e.target.value }))}
                      placeholder="e.g. 142/3A"
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Patta Number</label>
                    <input
                      type="text"
                      value={newProp.pattaNumber}
                      onChange={(e) => setNewProp(prev => ({ ...prev, pattaNumber: e.target.value }))}
                      placeholder="e.g. 421"
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Extent / Size</label>
                    <input
                      type="text"
                      value={newProp.extent}
                      onChange={(e) => setNewProp(prev => ({ ...prev, extent: e.target.value }))}
                      placeholder="e.g. 2400 sq.ft"
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Market Value (₹)</label>
                    <input
                      type="number"
                      value={newProp.marketValue}
                      onChange={(e) => setNewProp(prev => ({ ...prev, marketValue: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Guideline Value (₹)</label>
                    <input
                      type="number"
                      value={newProp.guidelineValue}
                      onChange={(e) => setNewProp(prev => ({ ...prev, guidelineValue: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t">
                  <button 
                    type="button" 
                    onClick={() => setIsAddPropertyOpen(false)}
                    className="px-4 py-2 border rounded-xl text-xs hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow"
                  >
                    Save Property
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: UPLOAD & OCR --- */}
      <AnimatePresence>
        {isUploadDocOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upload and OCR Data Extraction</h3>
                <button onClick={() => setIsUploadDocOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
              </div>

              {!ocrResultData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Document Category</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Title">Title Document</option>
                        <option value="Government">Government Records (Patta, Tax, EB)</option>
                        <option value="Encumbrance">Encumbrance Certificate (EC)</option>
                        <option value="Financial">Financial Reports / Valuation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Document Type</label>
                      <select
                        value={uploadDocType}
                        onChange={(e) => setUploadDocType(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Sale Deed">Sale Deed</option>
                        <option value="Parent Deed">Parent Deed</option>
                        <option value="Settlement Deed">Settlement Deed</option>
                        <option value="Patta">Patta Mutation Record</option>
                        <option value="Tax Receipt">Property Tax Receipt</option>
                        <option value="EB Bill">Electricity Bill</option>
                        <option value="Encumbrance Certificate">Encumbrance Certificate (EC)</option>
                        <option value="Valuation Report">Valuation Report</option>
                      </select>
                    </div>
                  </div>

                  {/* Drag drop zone */}
                  <div 
                    onClick={handleDocUploadSimulate}
                    className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/25 transition-all text-center relative overflow-hidden"
                  >
                    {ocrLoading ? (
                      <div className="space-y-3">
                        <RefreshCw className="w-10 h-10 text-purple-600 animate-spin mx-auto" />
                        <p className="text-xs font-semibold text-purple-600">Extracting fields with AI OCR engine...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400" />
                        <h4 className="font-bold text-sm text-gray-700 dark:text-gray-200">Drag property documents here or click to select</h4>
                        <p className="text-[10px] text-gray-400">Supports PDF, JPG, PNG up to 25MB.</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-xl space-y-3 border">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold px-2 py-0.5 rounded">
                        OCR PARSED SUCCESS
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                        ocrResultData.confidence >= 90 ? 'bg-green-50 border-green-200 text-green-600' : 'bg-yellow-50 border-yellow-200 text-yellow-600'
                      }`}>
                        Confidence: {ocrResultData.confidence}%
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase">File Name</span>
                        <span className="font-bold">{ocrResultData.fileName}</span>
                      </div>
                      
                      {/* Fields extracted */}
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {Object.entries(ocrResultData.ocrFields).map(([key, val]) => (
                          <div key={key}>
                            <span className="text-gray-400 block text-[9px] uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <input
                              type="text"
                              value={val as string}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                setOcrResultData(prev => ({
                                  ...prev,
                                  ocrFields: {
                                    ...prev.ocrFields,
                                    [key]: newVal
                                  }
                                }));
                              }}
                              className="w-full bg-white dark:bg-gray-800 border rounded p-1.5 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-3 border-t">
                    <button 
                      onClick={() => setOcrResultData(null)}
                      className="px-4 py-2 border rounded-xl text-xs hover:bg-slate-50 font-semibold"
                    >
                      Clear File
                    </button>
                    <button 
                      onClick={handleSaveOcrDocument}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow"
                    >
                      Approve & Register Document
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 3: USB SECURITY KEY VALIDATION INTERACTION --- */}
      <AnimatePresence>
        {isUsbModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl space-y-6 text-center"
            >
              <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center animate-pulse">
                <Key className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Insert USB Digital Key</h3>
                <p className="text-xs text-gray-500">
                  Cryptographic challenge validation required for action:
                </p>
                <div className="bg-purple-50 dark:bg-purple-950/20 text-purple-900 dark:text-purple-300 text-xs font-bold p-3 rounded-xl border border-purple-100 max-w-xs mx-auto">
                  {usbActionName}
                </div>
              </div>

              {/* USB insert animation simulator */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-700/20 max-w-xs mx-auto space-y-3">
                <div className="flex justify-center space-x-2 text-xs">
                  <span className="text-gray-400">Challenge Code:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">FP-CHALLENGE-9912A-x88</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  Waiting for challenge response from key: <span className="font-bold">{usbKeys[0]?.name || 'No Key Enrolled'}</span>.
                </div>
              </div>

              <div className="flex space-x-3 justify-center max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setIsUsbModalOpen(false);
                    setUsbCallback(null);
                    logAudit(usbActionName, activeProperty.name, 'None', 'Failed');
                  }}
                  className="w-1/2 py-2 border rounded-xl text-xs hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUsbModalConfirm}
                  className="w-1/2 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow hover:shadow-lg transition-all"
                >
                  Simulate Key Touch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
