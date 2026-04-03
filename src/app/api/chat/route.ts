import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f", 
  baseURL: "https://9router.vuhai.io.vn/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Read the data file
    const dataPath = path.join(process.cwd(), 'chatbot_data.txt');
    const chatbotData = fs.readFileSync(dataPath, 'utf-8');

    // System prompt instruction
    const systemMessage = {
      role: 'system',
      content: `Vai trò: Bạn là AI trợ lý độc quyền cho chuyên gia Nguyễn Văn A.
Chỉ được trả lời những nội dung liên quan tới các thông tin trong Knowledge Base sau:

${chatbotData}

Yêu cầu trả lời:
- Luôn sử dụng định dạng Markdown (tiêu đề, in đậm, danh sách) trong phản hồi.
- Bắt buộc render đúng chuẩn Markdown.
- Luôn chào thân thiện ở câu trả lời đầu tiên.
- Trả lời rõ ràng, ngắn gọn, súc tích.
- Kết thúc bằng lời mời hỏi thêm thông tin.
- Nếu câu hỏi ngoài phạm vi, hãy từ chối nhẹ nhàng và hướng dẫn liên hệ trực tiếp.`
    };

    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: [systemMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ role: "assistant", content: "Xin lỗi, đã có lỗi xảy ra hoặc hệ thống đang quá tải. Vui lòng thử lại sau." }, { status: 500 });
  }
}
