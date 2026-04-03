"use client";
import { motion } from "framer-motion";
import { Settings, Utensils, Users } from "lucide-react";

const services = [
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Tư Vấn Vận Hành",
    desc: "Tối ưu hóa quy trình quản lý, kiểm soát chi phí và nâng cao hiệu suất làm việc cho doanh nghiệp F&B.",
    tag: "OPERATIONAL EXCELLENCE"
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "Phát Triển Menu & Concept",
    desc: "Sáng tạo thực đơn độc bản, kết hợp tinh tế giữa nguyên liệu địa phương và kỹ thuật nấu nướng hiện đại.",
    tag: "CREATIVE CONCEPT"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Đào Tạo Nhân Sự Cao Cấp",
    desc: "Xây dựng đội ngũ kế thừa với tư duy dịch vụ chuẩn quốc tế và kỹ năng chuyên môn thượng thừa.",
    tag: "HUMAN LEADERSHIP"
  }
];

export default function Services() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl font-serif mb-4">Dịch Vụ Tư Vấn</h2>
        <p className="text-[#0A1D37]/60 max-w-2xl mx-auto">
          Giải pháp chiến lược dựa trên kinh nghiệm thực chiến và am hiểu thị trường sâu sắc.
        </p>
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {services.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-12 bg-[#FCF9F8] hover:bg-[#0A1D37] hover:text-white transition-all duration-500 group"
          >
            <div className="text-[#775A19] mb-8 group-hover:text-white transition-colors">{item.icon}</div>
            <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
            <p className="opacity-70 mb-8 font-light leading-relaxed">{item.desc}</p>
            <div className="text-[10px] tracking-[0.2em] font-bold opacity-40 group-hover:opacity-100 uppercase">
              {item.tag}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
