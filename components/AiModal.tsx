import React, { useState } from 'react';
import { X, Sparkles, Loader2, Send } from 'lucide-react';
import { askAssistant, generateReport } from '../services/geminiService';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageData: any;
  pageTitle: string;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose, pageData, pageTitle }) => {
  const [mode, setMode] = useState<'chat' | 'report'>('report');
  const [loading, setLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([]);
  const [inputValue, setInputValue] = useState('');

  React.useEffect(() => {
    if (isOpen && mode === 'report' && !reportContent) {
      handleGenerateReport();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, mode]);

  const handleGenerateReport = async () => {
    setLoading(true);
    const dataStr = JSON.stringify(pageData);
    const result = await generateReport(dataStr, pageTitle);
    setReportContent(result);
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const newMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setLoading(true);
    
    const dataStr = JSON.stringify(pageData);
    const response = await askAssistant(newMessage.content, dataStr);
    
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-aqua-900 border border-aqua-700 w-full max-w-2xl rounded-2xl shadow-2xl shadow-aqua-500/10 flex flex-col max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-aqua-700 bg-aqua-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-aqua-500/20 rounded-lg">
              <Sparkles className="text-aqua-500 h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AquaAI Assistant</h2>
              <p className="text-aqua-400 text-xs">Powered by Gemini 2.5</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-aqua-900/50">
          <div className="flex gap-4 mb-6 justify-center">
             <button 
                onClick={() => setMode('report')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'report' ? 'bg-aqua-500 text-aqua-900' : 'bg-aqua-800 text-gray-400'}`}
             >
               Auto-Report
             </button>
             <button 
                onClick={() => setMode('chat')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'chat' ? 'bg-aqua-500 text-aqua-900' : 'bg-aqua-800 text-gray-400'}`}
             >
               Ask Question
             </button>
          </div>

          {mode === 'report' ? (
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-aqua-400">
                  <Loader2 className="animate-spin h-10 w-10 mb-4" />
                  <p>Analyzing {pageTitle} data...</p>
                </div>
              ) : (
                <div 
                    className="prose prose-invert max-w-none prose-p:text-gray-300 prose-strong:text-aqua-400 prose-li:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: reportContent || '' }} 
                />
              )}
               {!loading && (
                <div className="mt-6 flex justify-end">
                  <button onClick={handleGenerateReport} className="text-sm text-aqua-500 hover:underline flex items-center gap-1">
                    <Sparkles size={14}/> Regenerate Analysis
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full min-h-[300px]">
                <div className="flex-1 space-y-4 mb-4">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">
                            <p>Ask me anything about the {pageTitle} data.</p>
                            <p className="text-xs mt-2">"What is the total revenue?"</p>
                            <p className="text-xs">"Which warehouse needs attention?"</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-aqua-700 text-white rounded-br-none' : 'bg-aqua-800 text-gray-200 rounded-bl-none'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-aqua-800 p-3 rounded-lg rounded-bl-none">
                                <Loader2 className="animate-spin h-4 w-4 text-aqua-500" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 mt-auto pt-4 border-t border-aqua-800">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your question..."
                        className="flex-1 bg-aqua-950 border border-aqua-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-aqua-500"
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || loading}
                        className="bg-aqua-500 text-aqua-900 p-2 rounded-lg hover:bg-aqua-400 disabled:opacity-50"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiModal;