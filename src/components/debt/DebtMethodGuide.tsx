import React, { useState } from 'react';
import { CreditCard, Building2, PiggyBank, ArrowRight } from 'lucide-react';

interface DebtMethodGuideProps {
  onMethodSelect: (method: string) => void;
}

const questions = [
  {
    id: 1,
    question: "What's your primary goal for debt repayment?",
    options: [
      { text: "Pay off highest interest first", method: "avalanche" },
      { text: "Build momentum with small wins", method: "snowball" },
      { text: "Leverage existing credit", method: "velocity" }
    ]
  },
  {
    id: 2,
    question: "How comfortable are you with financial strategies?",
    options: [
      { text: "Very comfortable with complex strategies", method: "velocity" },
      { text: "Prefer straightforward approaches", method: "snowball" },
      { text: "Focus on mathematical optimization", method: "avalanche" }
    ]
  },
  {
    id: 3,
    question: "What motivates you most?",
    options: [
      { text: "Quick wins and visible progress", method: "snowball" },
      { text: "Maximum interest savings", method: "avalanche" },
      { text: "Efficient use of available credit", method: "velocity" }
    ]
  }
];

export default function DebtMethodGuide({ onMethodSelect }: DebtMethodGuideProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (method: string) => {
    const newAnswers = [...answers, method];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate most recommended method based on answers
      const methodCounts = newAnswers.reduce((acc, method) => {
        acc[method] = (acc[method] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const recommendedMethod = Object.entries(methodCounts)
        .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

      onMethodSelect(recommendedMethod);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-lg font-medium mb-4">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.method)}
              className="w-full p-4 neo-card hover:bg-primary-50 transition-colors rounded-xl flex items-center justify-between group"
            >
              <span className="text-left">{option.text}</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="p-2 bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <CreditCard className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="font-medium">Velocity Banking</h4>
          <p className="text-sm text-gray-600">Use credit line transfer</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="p-2 bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Building2 className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="font-medium">Avalanche Method</h4>
          <p className="text-sm text-gray-600">Target highest interest</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="p-2 bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <PiggyBank className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="font-medium">Snowball Method</h4>
          <p className="text-sm text-gray-600">Start with smallest debts</p>
        </div>
      </div>
    </div>
  );
}
