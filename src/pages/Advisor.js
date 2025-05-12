import React, { useState } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';
import { getAIResponse } from '../utils/helpers';

/**
 * Advisor Page
 * AI-powered farming advice assistant
 */
const Advisor = () => {
  const { selectedSector } = useSector();
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hello! I am your AHDB farming assistant. How can I help you today with your farm management?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!currentQuestion.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', message: currentQuestion }]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await getAIResponse(selectedSector, currentQuestion);
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, { type: 'bot', message: response }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message to chat
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        message: 'Sorry, I encountered an error processing your request. Please try again later.' 
      }]);
    } finally {
      // Clear loading state
      setIsLoading(false);
      
      // Clear input field
      setCurrentQuestion('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <SectorSelector />
        
        <div className="bg-green-50 py-3 px-3 rounded-lg mb-4">
          <p className="text-sm text-green-600">
            Asking questions about <strong>{selectedSector === 'cereals' ? 'Cereals & Oilseeds' : 
                                          selectedSector === 'dairy' ? 'Dairy' : 
                                          selectedSector === 'beef' ? 'Beef & Lamb' : 'Pork'}</strong> sector. 
            All advice is based on AHDB guidance.
          </p>
        </div>
      </div>
      
      <div className="flex-1 px-4 overflow-y-auto space-y-4 pb-4">
        {chatHistory.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg px-4 py-2 ${
                msg.type === 'user' 
                  ? 'rounded-br-none bg-green-600 text-white' 
                  : 'rounded-bl-none bg-gray-100 text-gray-700'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-2 flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4 border-neutral-300">
        <div className="flex">
          <input
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none border-neutral-300"
            placeholder="Ask about farming advice..."
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className={`px-4 py-2 rounded-r-lg ${isLoading ? 'bg-gray-400' : 'bg-green-600'} text-white`}
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-700">
          Examples: "When should I apply fertilizer?", "What's the market price for wheat?", "How much rain is expected this week?"
        </div>
      </div>
    </div>
  );
};

export default Advisor;
