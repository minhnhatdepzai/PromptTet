import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserInfo } from '../types';
import { Trophy, Clock, RefreshCcw, Star } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalTimeMs: number;
  userInfo: UserInfo;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalTimeMs, userInfo, onRestart }) => {
  
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(totalTimeMs / 60000);
  const seconds = Math.floor((totalTimeMs % 60000) / 1000);
  const millis = totalTimeMs % 1000;

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center animate-fade-in-up">
      <div className="bg-red-900/90 p-8 md:p-12 rounded-3xl border-4 border-yellow-400 shadow-2xl backdrop-blur-md max-w-2xl w-full relative overflow-hidden">
        
        {/* Decorative corner flowers */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-400/10 rounded-br-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-tl-full translate-x-1/2 translate-y-1/2 blur-xl"></div>

        <div className="mb-6 inline-block bg-yellow-500 p-4 rounded-full shadow-lg shadow-yellow-500/50">
          <Trophy className="w-12 h-12 text-red-900" />
        </div>

        <h1 className="text-3xl md:text-5xl font-tet text-yellow-400 mb-2">Chúc Mừng Năm Mới!</h1>
        <h2 className="text-xl md:text-2xl text-yellow-200 mb-8 font-tet">Xuân Bính Ngọ 2026 - Vạn Sự Như Ý</h2>

        <div className="space-y-6 mb-8">
            <div className="bg-red-800/50 p-4 rounded-xl border border-yellow-500/30">
                <p className="text-yellow-200 text-sm uppercase tracking-widest mb-1">Người chơi</p>
                <p className="text-2xl font-bold text-white">{userInfo.name}</p>
                <p className="text-yellow-400 font-medium">Nhóm: {userInfo.group}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-800/50 p-4 rounded-xl border border-yellow-500/30">
                    <div className="flex flex-col items-center">
                        <Star className="w-6 h-6 text-yellow-400 mb-2" />
                        <span className="text-yellow-200 text-sm">Tổng Điểm</span>
                        <span className="text-4xl font-bold text-white">{score}</span>
                    </div>
                </div>
                <div className="bg-red-800/50 p-4 rounded-xl border border-yellow-500/30">
                    <div className="flex flex-col items-center">
                        <Clock className="w-6 h-6 text-yellow-400 mb-2" />
                        <span className="text-yellow-200 text-sm">Thời gian</span>
                        <span className="text-xl font-bold text-white">
                            {minutes > 0 ? `${minutes}p ` : ''}{seconds}s {millis}ms
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:from-yellow-400 hover:to-yellow-500 transform transition hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" />
          Chơi Lại
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
