import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, ScoreLog } from '../types';
import { QUESTIONS, SCORING_RULES, DEFAULT_POINTS_OVER_LIMIT } from '../constants';
import { Clock, Zap } from 'lucide-react';

interface QuizScreenProps {
  onFinish: (score: number, totalTime: number, logs: ScoreLog[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onFinish }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalTimeMs, setTotalTimeMs] = useState(0);
  const [logs, setLogs] = useState<ScoreLog[]>([]);
  
  // Timer state
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const timerRef = useRef<number | null>(null);

  const currentQuestion = QUESTIONS[currentQIndex];

  // Start timer for new question
  useEffect(() => {
    setStartTime(Date.now());
    setElapsedMs(0);
    setIsAnswered(false);

    timerRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - (startTime || Date.now()));
    }, 37); // Update approx 30fps

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQIndex]);

  // Fix startTime when effect runs
  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQIndex]);


  const handleAnswer = useCallback((optionId: string) => {
    if (isAnswered) return;
    
    // Stop timer visually
    if (timerRef.current) clearInterval(timerRef.current);
    
    const now = Date.now();
    const timeTaken = now - startTime;
    setIsAnswered(true);

    let pointsEarned = 0;
    const isCorrect = optionId === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Calculate points based on time
      const rule = SCORING_RULES.find(r => timeTaken <= r.maxTime);
      pointsEarned = rule ? rule.points : DEFAULT_POINTS_OVER_LIMIT;
    }

    // Update state
    setScore(prev => prev + pointsEarned);
    setTotalTimeMs(prev => prev + timeTaken);
    setLogs(prev => [...prev, {
      questionId: currentQuestion.id,
      timeTaken,
      points: pointsEarned
    }]);

    // Delay before next question to show feedback
    setTimeout(() => {
      if (currentQIndex < QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        // Game Over
        onFinish(score + pointsEarned, totalTimeMs + timeTaken, [...logs, {
            questionId: currentQuestion.id,
            timeTaken,
            points: pointsEarned
        }]);
      }
    }, 500); // Short delay to see selection
  }, [currentQIndex, currentQuestion, isAnswered, startTime, onFinish, score, totalTimeMs, logs]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const millis = ms % 1000;
    return `${seconds}.${millis.toString().padStart(3, '0')}s`;
  };

  // Calculate current potential points based on ticking timer
  const currentPotentialPoints = (() => {
    if (isAnswered) return 0;
    const rule = SCORING_RULES.find(r => elapsedMs <= r.maxTime);
    return rule ? rule.points : DEFAULT_POINTS_OVER_LIMIT;
  })();

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* HUD */}
      <div className="flex justify-between items-center mb-6 bg-red-900/60 p-4 rounded-xl border-2 border-yellow-500/50 backdrop-blur-md text-yellow-100">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">Câu {currentQIndex + 1}/{QUESTIONS.length}</span>
        </div>
        <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 text-2xl font-mono font-bold text-yellow-300">
                <Clock className="w-5 h-5" />
                {formatTime(elapsedMs)}
            </div>
            <div className="text-xs text-yellow-200/70">
                Điểm hiện tại: {currentPotentialPoints}
            </div>
        </div>
       
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-2xl text-yellow-400">{score}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-red-50 p-6 md:p-8 rounded-2xl shadow-2xl border-b-8 border-red-900 mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-red-900 mb-6 leading-relaxed">
          {currentQuestion.text}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={isAnswered}
              className={`
                relative overflow-hidden p-4 rounded-xl text-left border-2 transition-all duration-200
                ${isAnswered 
                    ? opt.id === currentQuestion.correctAnswer
                        ? 'bg-green-500 border-green-700 text-white scale-105'
                        : 'bg-gray-200 border-gray-300 text-gray-500 opacity-50'
                    : 'bg-white border-yellow-500 hover:bg-yellow-50 hover:border-yellow-600 hover:shadow-lg active:scale-95 text-red-900'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`
                  flex items-center justify-center w-8 h-8 rounded-full font-bold
                  ${isAnswered && opt.id === currentQuestion.correctAnswer ? 'bg-white text-green-600' : 'bg-red-100 text-red-800'}
                `}>
                  {opt.id}
                </span>
                <span className="font-medium text-lg">{opt.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
