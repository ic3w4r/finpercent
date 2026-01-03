# EMI Capacity Tool - Complete Flow Analysis

## 📊 Data Input Sources & Flow

### 1. INPUT COLLECTION LAYER
**Location:** `src/components/DebtManagement.tsx` (Lines 410-447)

User enters 6 cashflow inputs:
```
┌─────────────────────────────────────────────────────┐
│ USER INPUT FORM (6 Main Fields)                     │
├─────────────────────────────────────────────────────┤
│ 1. Monthly Revenue (₹)           → monthlyRevenue   │
│ 2. Monthly Fixed Costs (₹)       → monthlyFixed     │
│ 3. Existing EMI (₹)              → existingEmi      │
│ 4. Low Season Surplus (₹)        → p20Surplus       │
│ 5. Median Surplus (₹)            → p50Surplus       │
│ 6. High Season Surplus (₹)       → p80Surplus       │
│                                                      │
│ Hidden Fields (Auto-populated):                     │
│ - Other Commitments (₹): 2000    → otherCommitments │
│ - Interest Rate (%): 16%         → interestRate     │
│ - Tenure (months): 60            → tenureMonths     │
│ - GST Payment Ratio: 0.7         → gstOnTimeRatio   │
│ - Cheque Bounces: 2              → chequeBounceCount│
│ - Months Neg Balance: 3          → monthsNegBalance │
└─────────────────────────────────────────────────────┘
```

**State Management:**
```typescript
const [emiToolInputs, setEmiToolInputs] = useState({
  monthlyRevenue: 100000,      // Default: ₹1 lakh
  monthlyFixed: 30000,         // Default: ₹30k
  p20Surplus: 15000,           // Low season
  p50Surplus: 20000,           // Median season
  p80Surplus: 25000,           // High season
  existingEmi: 5000,           // Default: ₹5k
  otherCommitments: 2000,      // Loans, vendor payments
  interestRate: 16,            // Interest %
  tenureMonths: 60,            // Loan duration
  gstOnTimeRatio: 0.7,         // Compliance score
  chequeBounceCount: 2,        // Payment failures
  monthsNegativeBalance: 3,    // Liquidity stress months
});
```

---

### 2. CALCULATION ENGINE (Lines 76-195)
**Function:** `calculateEmiCapacity()`

#### Step 1: Extract & Normalize Inputs
```
Input Values
    ↓
Safe Parsing: n(val) = isNaN(val) ? 0 : val
    ↓
monthlyRevenue = 100000 (₹)
annualRevenue = 100000 × 12 = 1,200,000 (₹1.2L annual)
emiExisting = 50000 (₹/month)
```

#### Step 2: Calculate Cashflow Available for Debt Service (CADS)
```
Surplus Inputs (3 bands):
  p20 (Low season):    ₹15,000/month
  p50 (Median season): ₹20,000/month
  p80 (High season):   ₹25,000/month

Average Net Cash = (15k + 20k + 25k) / 3 = ₹20,000/month

Volatility Calculation:
  volatility = (p80 - p20) / avg = (25k - 15k) / 20k = 0.5
  
Volatility Factor (risk penalty):
  if volatility < 0.3 → volFactor = 1.0 (stable)
  if 0.3 ≤ volatility ≤ 0.6 → volFactor = 0.9 (moderate risk: apply 10% discount)
  if volatility > 0.6 → volFactor = 0.75 (high risk: apply 25% discount)
  
Result: volFactor = 0.9 (moderate volatility penalty)

CADS Bands (after deducting other commitments & volatility):
  CADS_Safe   = max(0, (p20 - 2000) × 0.9) = max(0, 13000 × 0.9) = ₹11,700
  CADS_Normal = max(0, (p50 - 2000) × 0.9) = max(0, 18000 × 0.9) = ₹16,200
  CADS_Stretch= max(0, (p80 - 2000) × 0.9) = max(0, 23000 × 0.9) = ₹20,700
```

#### Step 3: Scale DSCR Based on Revenue
```
Revenue-Based DSCR (Debt Service Coverage Ratio):

Annual Revenue: ₹1,200,000 (₹1.2 Lakhs)

if annualRevenue < ₹1,500,000 (₹15L) → DSCR = 1.5 (stricter for small biz)
if ₹1,500,000 ≤ revenue < ₹5,000,000 → DSCR = 1.4
if revenue ≥ ₹5,000,000 → DSCR = 1.3 (standard)

Result: scaledDscr = 1.5 (high standard for small business protection)
```

#### Step 4: Calculate Total EMI Capacity
```
Formula: Total EMI Capacity = CADS / DSCR

For each band:
  Total_Capacity_Safe    = ₹11,700 / 1.5 = ₹7,800
  Total_Capacity_Normal  = ₹16,200 / 1.5 = ₹10,800
  Total_Capacity_Stretch = ₹20,700 / 1.5 = ₹13,800

Then subtract existing EMI:
  New EMI Capacity = Total Capacity - Existing EMI
  
  Safe_New    = 7,800 - 50,000 = -42,200 → capped to 0 (can't be negative!)
  Normal_New  = 10,800 - 50,000 = -39,200 → capped to 0
  Stretch_New = 13,800 - 50,000 = -36,200 → capped to 0

⚠️ Result: Over-leveraged! All EMI bands = ₹0
```

#### Step 5: Apply Revenue-Based EMI Cap
```
Maximum EMI allowed by revenue: 2.5% of annual revenue per month

Max EMI Cap = (₹1,200,000 × 0.025) / 12 = ₹2,500/month

This further constrains the new EMI to never exceed 2.5% annual revenue
```

#### Step 6: Apply Safety Buffer
```
Buffer Calculation:
  if annualRevenue < ₹15L → bufferPercent = 15% (small business)
  else → bufferPercent = 10%

Result: bufferPercent = 15% (small business protection)

Final EMI (after buffer reduction):
  Safe_Final    = max(0, 0 × (1 - 0.15)) = ₹0
  Normal_Final  = max(0, 0 × (1 - 0.15)) = ₹0
  Stretch_Final = max(0, 0 × (1 - 0.15)) = ₹0
```

#### Step 7: Round & Apply Minimum Threshold
```
Minimum EMI for small business: ₹1,000

survivalEmi  = 0 < 1000 ? 0 : round(0/100) × 100 = ₹0
operatingEmi = 0 < 1000 ? 0 : round(0/100) × 100 = ₹0
stretchEmi   = 0 < 1000 ? 0 : round(0/100) × 100 = ₹0
```

#### Step 8: Calculate Loan Amounts from EMI
```
Formula: Principal = EMI × [(1+r)^n - 1] / [r × (1+r)^n]

Where:
  r = monthly interest rate = 16% / 100 / 12 = 0.0133
  n = tenure in months = 60

Since all EMI values are ₹0:
  survivalLoan = 0
  operatingLoan = 0
  stretchLoan = 0
```

#### Step 9: Calculate Behaviour Score
```
Components:
  GST Score     = gstOnTimeRatio × 30 = 0.7 × 30 = 21 points
  Cheque Score  = chequeBounceCount ≤ 2 ? 20 : 10 = 20 points
  NegBal Score  = monthsNegBalance ≤ 3 ? 15 : 10 = 15 points

Total Score = 21 + 20 + 15 = 56/100
```

#### Step 10: Determine Global Risk Color
```
Risk Thresholds:

GREEN: DSCR ≥ 1.5 AND SurplusRatio ≥ 50% AND BehaviourScore ≥ 70
AMBER: DSCR ≥ 1.2 AND SurplusRatio ≥ 20% AND BehaviourScore ≥ 50
RED:   Otherwise

Analysis:
  DSCR = CADS / (existingEmi + newEmi)
       = 16,200 / (50,000 + 0) = 0.324 (< 1.5) ✗
  
  Surplus Ratio = baseEmi / monthlyRevenue = 0 / 100,000 = 0% (< 50%) ✗
  
  Behaviour Score = 56 (< 70) ✗

Result: globalRiskColor = RED ⛔
```

#### Step 11: Calculate Working Capital Need & Deficit
```
WC Need = Monthly Revenue × 20% = 100,000 × 0.2 = ₹20,000

WC Deficit = max(0, WC Need - CADS_Normal)
           = max(0, 20,000 - 16,200) = ₹3,800

This means business needs ₹3,800 more liquidity buffer
```

---

### 3. RESULTS OUTPUT (Lines 448-525)
**Location:** `src/components/DebtManagement.tsx` (Lines 448-525)

```
┌────────────────────────────────────────────────────────────┐
│ ANALYSIS RESULTS                                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│ ⛔ BUSINESS OVER-LEVERAGED (Alert Banner)                 │
│ Existing EMI ₹50,000/month exceeds repayment capacity     │
│ Action Items:                                              │
│  • Restructure/refinance existing loans                    │
│  • Increase business revenue                               │
│  • Consolidate high-interest debts at lower rates          │
│                                                             │
│ ┌─ EMI Capacity Summary ──────────────────────────────┐   │
│ │ Debt Readiness: RED   │ Safe EMI: ₹0               │   │
│ │ Max EMI: ₹0           │ Behaviour Score: 56/100    │   │
│ └────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌─ EMI Bands Breakdown ──────────────────────────────┐   │
│ │ Band      │ Monthly EMI │ Loan Amount │ Risk      │   │
│ │ Survival  │ ₹0          │ ₹0          │ Low       │   │
│ │ Operating │ ₹0          │ ₹0          │ Medium    │   │
│ │ Stretch   │ ₹0          │ ₹0          │ High      │   │
│ └────────────────────────────────────────────────────┘   │
│                                                             │
│ ⚠️  Working Capital Alert                                  │
│ Your business needs ₹3,800 in additional working capital  │
│                                                             │
│ Key Metrics:                                               │
│ • Average Cashflow: ₹20,000/month                         │
│ • Cashflow Volatility: 0.5 (Moderate)                     │
│ • Behaviour Score: 56/100                                 │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete Data Flow Diagram

```
USER INPUTS
    ↓
    ├─ monthlyRevenue: 100,000
    ├─ existingEmi: 50,000
    ├─ p20Surplus: 15,000
    ├─ p50Surplus: 20,000
    ├─ p80Surplus: 25,000
    └─ otherCommitments: 2,000
    
    ↓ [validateInputs()]
    
CASHFLOW ANALYSIS
    ↓
    ├─ Average Net Cash: ₹20,000
    ├─ Volatility: 0.5 (50% range)
    └─ Volatility Factor: 0.9
    
    ↓ [calculateCADS()]
    
CADS CALCULATION (Cash Available for Debt Service)
    ↓
    ├─ CADS Safe: ₹11,700
    ├─ CADS Normal: ₹16,200
    └─ CADS Stretch: ₹20,700
    
    ↓ [scaleDSCR()]
    
DSCR SCALING (based on ₹1.2L annual revenue)
    ↓
    └─ Scaled DSCR: 1.5 (small business standard)
    
    ↓ [calculateEmiCapacity()]
    
EMI CAPACITY CALCULATION
    ↓
    ├─ Total Safe Capacity: ₹7,800
    ├─ Total Normal Capacity: ₹10,800
    ├─ Total Stretch Capacity: ₹13,800
    ├─ Subtract Existing EMI (₹50,000)
    └─ Result: All bands negative → ₹0
    
    ↓ [applySafetyBuffer()]
    
SAFETY BUFFER & THRESHOLDS
    ↓
    ├─ Small Business Buffer: 15%
    ├─ Minimum EMI Threshold: ₹1,000
    └─ Final EMI: All ₹0
    
    ↓ [calculateBehaviourScore()]
    
BEHAVIOUR SCORING
    ↓
    ├─ GST Compliance: 21/30
    ├─ Payment Discipline: 20/25
    ├─ Liquidity Management: 15/20
    └─ Total Score: 56/100
    
    ↓ [determinRiskColor()]
    
RISK ASSESSMENT
    ↓
    ├─ DSCR Check: 0.32 < 1.5 ✗
    ├─ Surplus Ratio: 0% < 50% ✗
    ├─ Behaviour: 56 < 70 ✗
    └─ RESULT: RED (Over-leveraged)
    
    ↓ [calculateWCDeficit()]
    
WORKING CAPITAL ANALYSIS
    ↓
    ├─ WC Need: ₹20,000 (20% of revenue)
    ├─ WC Available: ₹16,200
    └─ WC Deficit: ₹3,800
    
    ↓ [setEmiCapacityResults()]
    
DISPLAY RESULTS
    ↓
    ├─ ⛔ Over-Leveraged Warning
    ├─ EMI Bands: All ₹0
    ├─ Risk Color: RED
    ├─ Behaviour Score: 56/100
    └─ Action Items for User
```

---

## 💡 Key Business Logic Points

### 1. **DSCR Scaling** (Small Business Protection)
- Small businesses (< ₹15L revenue) use stricter 1.5x DSCR
- This means: CADS must be 1.5x total debt service
- **Why?** Small businesses have volatile cashflow, need more buffer

### 2. **Volatility Penalty** (Cashflow Risk)
- Businesses with high variation (p80-p20) get discount
- 10-25% penalty applied to surplus calculation
- **Why?** Safer to reserve for lean seasons

### 3. **Revenue-Based EMI Cap** (2.5% Rule)
- Maximum EMI ≈ 2.5% of annual revenue per month
- Prevents over-borrowing regardless of surplus
- **Why?** Industry standard for sustainable debt

### 4. **Over-Leveraged Detection**
- When existing EMI > CADS / DSCR → ₹0 new capacity
- Triggers alert banner with refinancing suggestions
- **Why?** Protects business from additional debt stress

### 5. **Behaviour Score** (67/100 max)
- 30pts: GST compliance (0-100%)
- 25pts: Payment discipline (cheque bounces)
- 20pts: Liquidity management (negative months)
- **Why?** Lender risk indicator + compliance track record

---

## 📋 Hidden Input Fields (Auto-Calculated)

These fields use default or derived values:

```typescript
// Fixed defaults in current implementation:
otherCommitments: 2000        // Loan to vendor, trade credit
interestRate: 16              // Current market benchmark
tenureMonths: 60              // Standard 5-year term
gstOnTimeRatio: 0.7           // Default assumption
chequeBounceCount: 2          // Default test value
monthsNegativeBalance: 3      // Default test value
```

**Future Enhancement:** These could be user-filled for more accurate scoring.

---

## 🎯 Example Scenarios

### Scenario A: Healthy Business (₹100K revenue, ₹5K existing EMI)
```
→ CADS Normal: ₹18K
→ New EMI Capacity: (18K/1.5) - 5K = ₹7K
→ Safe EMI: ₹5.9K, Max EMI: ₹7K
→ Risk: AMBER/GREEN (healthy)
```

### Scenario B: Over-Leveraged (₹100K revenue, ₹50K existing EMI)
```
→ CADS Normal: ₹16.2K
→ New EMI Capacity: (16.2K/1.5) - 50K = -39K → ₹0
→ Safe EMI: ₹0, Max EMI: ₹0
→ Risk: RED (refinance needed)
```

### Scenario C: High Volatility (₹100K revenue, p80-p20 = ₹20K swing)
```
→ Volatility: 1.0 (very high)
→ Volatility Factor: 0.75 (25% discount applied)
→ CADS reduced by 25%
→ EMI capacity drops proportionally
→ Risk: Higher penalty, more conservative estimates
```

---

## 🔗 Code References

| Component | File | Lines | Purpose |
|-----------|------|-------|---------|
| Input Collection | DebtManagement.tsx | 410-447 | User input form |
| Calculation Logic | DebtManagement.tsx | 76-195 | EMI capacity engine |
| Results Display | DebtManagement.tsx | 448-525 | Show analysis results |
| State Management | DebtManagement.tsx | 36-52 | Input state + results |
| Helper Component | DebtManagement.tsx | 596-604 | EmiInputField input box |

