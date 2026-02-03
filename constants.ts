import { Question } from './types';

// Points configuration based on milliseconds
export const SCORING_RULES = [
  { maxTime: 1000, points: 5 },
  { maxTime: 2000, points: 4 },
  { maxTime: 3000, points: 3 },
  { maxTime: 4000, points: 2 },
  { maxTime: 5000, points: 1 },
];

export const DEFAULT_POINTS_OVER_LIMIT = 1; // Or 0 if strict, but prompt says "5s -> 1 point", implying gradual drop. Let's keep 1 as min for correct answer.

// Tet Theme Music (Public Domain or Royalty Free placeholder)
// Using a festive sound effect loop or track. 
export const BG_MUSIC_URL = "https://cdn.pixabay.com/audio/2023/01/24/audio_54a329ec60.mp3"; // "Chinese New Year" style upbeat track

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tết Nguyên Đán của người Việt được xác định chủ yếu dựa trên loại lịch nào?",
    options: [
      { id: 'A', text: "Dương lịch" },
      { id: 'B', text: "Âm lịch" },
      { id: 'C', text: "Âm – dương lịch" },
      { id: 'D', text: "Lịch thiên văn phương Tây" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 2,
    text: "Ý nghĩa sâu xa của bánh chưng trong ngày Tết Việt Nam là gì?",
    options: [
      { id: 'A', text: "Thể hiện sự sung túc, đủ đầy" },
      { id: 'B', text: "Tưởng nhớ tổ tiên" },
      { id: 'C', text: "Tượng trưng cho trời đất và nền văn minh nông nghiệp" },
      { id: 'D', text: "Biểu trưng cho sự đoàn tụ gia đình" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 3,
    text: "Vì sao người Việt thường kiêng quét nhà trong ngày mùng 1 Tết?",
    options: [
      { id: 'A', text: "Sợ làm mất không khí ngày Tết" },
      { id: 'B', text: "Tránh xui xẻo trong năm mới" },
      { id: 'C', text: "Quan niệm quét đi tài lộc và may mắn" },
      { id: 'D', text: "Do phong tục từ Trung Hoa truyền sang" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 4,
    text: "Phong tục “xông đất” quan trọng nhất ở yếu tố nào của người được chọn?",
    options: [
      { id: 'A', text: "Tuổi tác cao" },
      { id: 'B', text: "Giàu có" },
      { id: 'C', text: "Hợp tuổi, tính tình và vía tốt" },
      { id: 'D', text: "Quan hệ thân thiết với gia chủ" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 5,
    text: "Mâm ngũ quả ngày Tết truyền thống của người Việt KHÔNG mang ý nghĩa nào sau đây?",
    options: [
      { id: 'A', text: "Cầu mong đủ đầy, no ấm" },
      { id: 'B', text: "Thể hiện đạo hiếu với tổ tiên" },
      { id: 'C', text: "Tượng trưng cho ngũ hành" },
      { id: 'D', text: "Dùng để trang trí cho đẹp ngày Tết" },
    ],
    correctAnswer: 'D',
  },
  {
    id: 6,
    text: "Tại sao số lượng quả trên mâm ngũ quả thường là số lẻ?",
    options: [
      { id: 'A', text: "Dễ sắp xếp, cân đối" },
      { id: 'B', text: "Theo quan niệm số lẻ tượng trưng cho sự sinh sôi" },
      { id: 'C', text: "Tránh trùng số ngày Tết" },
      { id: 'D', text: "Do quy định trong sách cổ" },
    ],
    correctAnswer: 'B',
  },
  {
    id: 7,
    text: "Trong văn hoá Tết, lì xì ban đầu mang ý nghĩa chính nào?",
    options: [
      { id: 'A', text: "Cho tiền để tiêu Tết" },
      { id: 'B', text: "Mua may bán rủi" },
      { id: 'C', text: "Chúc phúc, xua đuổi điều xấu cho trẻ em" },
      { id: 'D', text: "Thể hiện sự giàu có của người lớn" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 8,
    text: "Vì sao hoa đào thường gắn với Tết ở miền Bắc hơn miền Nam?",
    options: [
      { id: 'A', text: "Hoa đào chỉ sống được ở miền Bắc" },
      { id: 'B', text: "Do yếu tố khí hậu lạnh và quan niệm trừ tà" },
      { id: 'C', text: "Vì ảnh hưởng từ văn hoá Trung Quốc" },
      { id: 'D', text: "Do màu sắc hợp với Tết" },
    ],
    correctAnswer: 'B',
  },
  {
    id: 9,
    text: "Tên gọi “Tết Nguyên Đán” có ý nghĩa đúng nhất là gì?",
    options: [
      { id: 'A', text: "Ngày lễ lớn nhất trong năm" },
      { id: 'B', text: "Ngày đầu tiên của mùa xuân" },
      { id: 'C', text: "Buổi sáng đầu tiên của năm mới" },
      { id: 'D', text: "Ngày sum họp gia đình" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 10,
    text: "Trong 3 ngày Tết truyền thống, thứ tự thăm viếng phổ biến là:",
    options: [
      { id: 'A', text: "Mùng 1 thầy – mùng 2 bạn – mùng 3 cha mẹ" },
      { id: 'B', text: "Mùng 1 gia đình – mùng 2 họ hàng – mùng 3 thầy" },
      { id: 'C', text: "Mùng 1 cha mẹ – mùng 2 thầy – mùng 3 bạn" },
      { id: 'D', text: "Mùng 1 thầy – mùng 2 cha mẹ – mùng 3 bạn" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 11,
    text: "Phong tục dựng cây nêu ngày Tết mang ý nghĩa chính nào?",
    options: [
      { id: 'A', text: "Trang trí sân nhà" },
      { id: 'B', text: "Đánh dấu lãnh thổ" },
      { id: 'C', text: "Xua đuổi tà ma, bảo vệ gia đình" },
      { id: 'D', text: "Tưởng nhớ tổ tiên" },
    ],
    correctAnswer: 'C',
  },
  {
    id: 12,
    text: "Điểm khác biệt cốt lõi giữa Tết cổ truyền Việt Nam và Tết phương Tây là gì?",
    options: [
      { id: 'A', text: "Thời gian tổ chức" },
      { id: 'B', text: "Các món ăn truyền thống" },
      { id: 'C', text: "Ý nghĩa tâm linh và gắn kết gia đình" },
      { id: 'D', text: "Hình thức trang trí" },
    ],
    correctAnswer: 'C',
  },
];
