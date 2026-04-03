"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#775A19] uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
            Thirty-Five Years of Heritage
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-6">
            35 Năm Nâng Tầm <br />
            <span className="italic text-[#775A19]">Văn Hóa Ẩm Thực</span> <br />
            Toàn Cầu
          </h1>
          <p className="text-xl text-[#0A1D37]/70 mb-10 max-w-lg font-light leading-relaxed">
            Chuyên Gia Tư Vấn F&B Cao Cấp - Đồng Hành Cùng Doanh Nghiệp Tại Việt Nam & Châu Âu.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#0A1D37] text-white px-8 py-4 rounded-none hover:bg-[#775A19] transition-colors flex items-center gap-2 group">
              KẾT NỐI NGAY 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="border border-[#0A1D37]/20 px-8 py-4 rounded-none hover:bg-white transition-colors">
              TÌM HIỂU THÊM
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] bg-gray-200"
        >
          {/* Replace with real image path */}
          <div className="absolute inset-0 bg-[#0A1D37]/10 z-10" />
          <div className="absolute -bottom-6 -left-6 bg-[#0A1D37] text-white p-8 z-20">
            <div className="text-4xl font-serif">35+</div>
            <div className="text-xs uppercase tracking-widest opacity-60">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
