import React, { useState } from 'react';
import { UserInfo } from '../types';
import { Sparkles, Scroll } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (info: UserInfo) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !group.trim()) {
      setError('Vui lòng nhập đầy đủ tên và nhóm!');
      return;
    }
    onStart({ name, group });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="bg-red-900/80 p-8 rounded-2xl border-4 border-yellow-500 shadow-2xl backdrop-blur-sm max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <Scroll className="w-16 h-16 text-yellow-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-tet text-yellow-400 mb-2 drop-shadow-md">
          Đố Vui Ngày Tết
        </h1>
        <h2 className="text-2xl font-bold text-yellow-200 mb-6 font-tet">
          Xuân Bính Ngọ 2026
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-yellow-200 mb-1 font-bold">Tên của bạn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-red-50 text-red-900 border-2 border-yellow-600 focus:outline-none focus:border-yellow-400 font-bold"
              placeholder="Nhập tên..."
            />
          </div>
          
          <div className="text-left">
            <label className="block text-yellow-200 mb-1 font-bold">Tên Nhóm/Đội</label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full p-3 rounded-lg bg-red-50 text-red-900 border-2 border-yellow-600 focus:outline-none focus:border-yellow-400 font-bold"
              placeholder="Nhập nhóm..."
            />
          </div>

          {error && <p className="text-red-300 font-bold animate-pulse">{error}</p>}

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-yellow-400 text-red-900 text-xl font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Bắt Đầu Ngay
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
