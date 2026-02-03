import React, { useState, useRef, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { GameState, UserInfo, ScoreLog } from './types';
import { BG_MUSIC_URL } from './constants';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', group: '' });
  const [score, setScore] = useState(0);
  const [totalTimeMs, setTotalTimeMs] = useState(0);
  
  // Audio state
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(BG_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const startGame = (info: UserInfo) => {
    setUserInfo(info);
    setGameState('playing');
    setScore(0);
    setTotalTimeMs(0);
    
    // Attempt to start music on user interaction
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => {
        console.warn("Autoplay prevented", e);
        setIsMuted(true); // Set to muted if autoplay fails so UI reflects state
      });
    }
  };

  const finishGame = (finalScore: number, finalTime: number, logs: ScoreLog[]) => {
    setScore(finalScore);
    setTotalTimeMs(finalTime);
    setGameState('finished');
  };

  const restartGame = () => {
    setGameState('welcome');
    setScore(0);
    setTotalTimeMs(0);
    setUserInfo({ name: '', group: '' });
  };

  return (
    <div className="min-h-screen bg-red-800 pattern-bg text-white font-sans overflow-x-hidden">
        
        {/* Floating Controls */}
        <div className="fixed top-4 right-4 z-50">
            <button 
                onClick={toggleMusic}
                className="bg-red-900/80 p-3 rounded-full text-yellow-400 border border-yellow-500 shadow-lg hover:bg-red-800 transition-colors"
                title="Bật/Tắt Nhạc"
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
        </div>

        {/* Decorative Header (always visible slightly) */}
        {gameState !== 'welcome' && (
             <div className="w-full text-center pt-6 pb-2">
                 <h2 className="text-yellow-500/30 text-xl font-tet font-bold tracking-widest uppercase select-none">Xuân Bính Ngọ 2026</h2>
             </div>
        )}

        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            {gameState === 'welcome' && <WelcomeScreen onStart={startGame} />}
            {gameState === 'playing' && <QuizScreen onFinish={finishGame} />}
            {gameState === 'finished' && (
            <ResultScreen 
                score={score} 
                totalTimeMs={totalTimeMs} 
                userInfo={userInfo} 
                onRestart={restartGame} 
            />
            )}
        </div>
        
        {/* Footer/Copyright */}
        <div className="fixed bottom-2 w-full text-center text-red-300/40 text-xs pointer-events-none">
            Chúc Mừng Năm Mới 2026 - An Khang Thịnh Vượng
        </div>
    </div>
  );
};

export default App;
