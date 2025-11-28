import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIAssistantPageProps {
  onBack: () => void;
  hasAIAccess: boolean;
  onNavigateToSettings?: () => void;
}

export default function AIAssistantPage({ 
  onBack, 
  hasAIAccess,
  onNavigateToSettings 
}: AIAssistantPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !hasAIAccess) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟 AI 回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now(),
        text: '我理解您现在的感受。戒烟是一个挑战，但您已经迈出了重要的第一步。让我们一起制定一个适合您的戒烟计划。首先，请告诉我您每天大约吸多少支烟？',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // 快捷问题
  const quickQuestions = [
    '戒烟初期如何应对烟瘾？',
    '戒烟后身体会有什么变化？',
    '如何避免复吸？',
    '戒烟期间的饮食建议',
  ];

  const handleQuickQuestion = (question: string) => {
    if (!hasAIAccess) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // 模拟 AI 回复
    setTimeout(() => {
      let aiResponse = '';
      if (question.includes('烟瘾')) {
        aiResponse = '戒烟初期的烟瘾是最具挑战的阶段。我建议您采取以下策略：\n\n1. 深呼吸法：当烟瘾来袭时，进行5-10次深呼吸\n2. 转移注意力：喝水、吃口香糖或坚果\n3. 运动：快走或做简单运动\n4. 记录烟瘾：使用我们的烟瘾记录功能\n\n记住，每次烟瘾通常只持续3-5分钟，坚持过去就是胜利！';
      } else if (question.includes('身体')) {
        aiResponse = '戒烟后，您的身体会经历一系列积极的变化：\n\n20分钟：心率和血压下降\n12小时：血液中一氧化碳含量恢复正常\n2-12周：肺功能开始改善\n1-9个月：咳嗽和气短减轻\n1年：心脏病风险降低50%\n\n您现在已经坚持了一段时间，身体正在悄悄变好！';
      } else if (question.includes('复吸')) {
        aiResponse = '避免复吸的关键策略：\n\n1. 远离诱惑：避开吸烟场所和吸烟者\n2. 寻找替代：用健康行为替代吸烟\n3. 保持警惕：压力大时特别注意\n4. 寻求支持：和家人朋友分享您的目标\n5. 记住初心：回顾您戒烟的理由\n\n如果不小心吸了一支，不要自责，立即重新开始！';
      } else {
        aiResponse = '戒烟期间的饮食建议：\n\n多吃：\n• 新鲜水果和蔬菜（富含维生素C）\n• 全谷物和坚果（提供持久能量）\n• 大量饮水（帮助排毒）\n\n避免：\n• 咖啡和酒精（可能触发吸烟欲望）\n• 辛辣刺激食物\n• 高糖食品（血糖波动影响情绪）\n\n均衡饮食能帮助您更轻松地度过戒烟期！';
      }

      const aiMessage: Message = {
        id: Date.now(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ background: '#EFEFEF' }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col" style={{ height: '100vh' }}>
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4"
          style={{ 
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: '#FFFFFF' }} />
          </button>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <span style={{ fontSize: '16px' }}>🤖</span>
            </div>
            <h1 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 'bold' }}>
              AI 戒烟助手
            </h1>
          </div>
          <div className="w-8"></div>
        </div>

        {/* No Access State */}
        {!hasAIAccess ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-6xl mb-6">🔒</div>
              <h3 style={{ color: '#2A2A2A', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                开通AI戒烟军师解锁此功能
              </h3>
              <p style={{ color: '#666666', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                享受24小时智能陪伴<br/>
                个性化戒烟方案和专业指导
              </p>
              <Button
                onClick={onNavigateToSettings}
                className="px-6 py-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  border: 'none',
                }}
              >
                前往开通
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-6xl mb-6">🤖</div>
                  <p style={{ color: '#666666', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
                    您好！我是您的AI戒烟助手<br/>
                    有任何关于戒烟的问题都可以问我
                  </p>
                  
                  {/* Quick Questions */}
                  <div className="w-full space-y-2">
                    <div style={{ color: '#999999', fontSize: '12px', marginBottom: '8px' }}>常见问题</div>
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full p-3 rounded-xl text-left transition-all active:scale-98"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          color: '#6366F1',
                          fontSize: '13px',
                        }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'ai' && (
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}
                        >
                          <span style={{ fontSize: '16px' }}>🤖</span>
                        </div>
                      )}
                      <div
                        className="max-w-[75%] p-3 rounded-2xl"
                        style={{
                          backgroundColor: message.sender === 'user' ? '#6366F1' : '#FFFFFF',
                          color: message.sender === 'user' ? '#FFFFFF' : '#2A2A2A',
                          border: message.sender === 'ai' ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
                        }}
                      >
                        <div style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                          {message.text}
                        </div>
                        <div 
                          style={{ 
                            fontSize: '11px', 
                            marginTop: '4px',
                            color: message.sender === 'user' ? 'rgba(255, 255, 255, 0.7)' : '#999999'
                          }}
                        >
                          {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div 
              className="p-4 border-t"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB'
              }}
            >
              <div className="flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  placeholder="输入您的问题..."
                  style={{
                    flex: 1,
                    backgroundColor: '#F3F4F6',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    color: '#2A2A2A',
                    borderRadius: '12px',
                    padding: '12px 16px',
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
                  style={{
                    background: inputValue.trim() 
                      ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' 
                      : '#E5E7EB',
                    color: '#FFFFFF',
                    border: 'none',
                  }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
