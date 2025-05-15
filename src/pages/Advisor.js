// Advisor.js
import React, { useState, useEffect, useRef } from 'react';
import SectorSelector from '../components/common/SectorSelector';
import { useSector } from '../contexts/SectorContext';

/**
 * Simulated AI response generator for prototype
 * Returns farming advice based on sector and question
 */
const getSimulatedResponse = (sector, question) => {
  // Convert question to lowercase for easier matching
  const q = question.toLowerCase();
  
  // Common responses across all sectors
  const commonResponses = {
    greeting: "Hello! I'm your AHDB farming assistant. How can I help you today?",
    thanks: "You're welcome! Is there anything else I can help you with?",
    unclear: "I'm not sure I understand your question. Could you please provide more details?",
    default: "That's an interesting question. While I don't have specific data on this yet, the AHDB website might have resources that could help. Would you like me to suggest some relevant sections to explore?"
  };
  
  // Sector-specific response templates
  const sectorResponses = {
    cereals: {
      fertilizer: "For cereals and oilseeds, the optimal time for fertilizer application depends on crop stage and soil conditions. Based on AHDB guidance, nitrogen application should be split, with the first application at the start of spring growth (typically late February to March) and the second at stem extension (GS30-31). Soil testing is essential before application to determine exact requirements. Would you like more specific information about rates for a particular crop?",
      pests: "Common pests in cereals include aphids, wheat bulb fly, and frit fly. AHDB recommends integrated pest management approaches, focusing on cultural controls first, followed by targeted chemical controls only when necessary. Regular crop walking to monitor pest levels is vital. Have you noticed specific pest symptoms in your crop?",
      prices: "Current cereals market prices show wheat trading at approximately £175-185/tonne for feed wheat and £190-210/tonne for milling wheat, though this varies by region. Oilseed rape is around £350-370/tonne. These are indicative figures based on recent AHDB Market Intelligence reports. Would you like me to explain price trends over recent months?",
      weather: "According to recent AHDB weather forecasts for cereal growing regions, conditions are expected to be variable with moderate rainfall. This could impact late season operations for winter cereals. What specific weather concerns do you have for your crops?"
    },
    dairy: {
      nutrition: "Optimising dairy cow nutrition is crucial for milk production and animal health. AHDB recommends a balanced diet with 16-18% protein for mid-lactation cows, adequate fibre for rumen health, and appropriate mineral supplementation. Regular forage analysis helps fine-tune rations. Would you like specific advice on transitioning cows between different feeding regimes?",
      health: "For dairy cattle health, AHDB promotes a proactive approach focusing on mastitis prevention, lameness reduction, and fertility management. Regular mobility scoring can help identify lameness issues early. The DairyCare initiative provides excellent resources for implementing an effective health plan. What specific health challenges are you experiencing in your herd?",
      prices: "Current milk prices are averaging 32-34p per litre for standard liquid contracts, with manufacturing and organic contracts typically commanding a premium. Market signals suggest moderate stability in the short term, though input costs remain a challenge. Would you like information on how to maximise your milk value through compositional quality?",
      breeding: "AHDB's dairy breeding recommendations focus on balanced breeding goals, considering production, health traits, and longevity. The Profitable Lifetime Index (PLI) helps identify bulls that can improve overall herd performance. Have you considered genomic testing for your replacement heifers?"
    },
    beef: {
      feeding: "Effective feeding strategies for beef cattle depend on the production system. For finishing cattle, AHDB recommends a diet with adequate energy density (typically 11-12 MJ/kg DM) and 14-16% protein for growing animals. Forage quality assessment is essential for planning winter feeding. Are you operating a forage-based or intensive finishing system?",
      health: "AHDB's beef health guidance emphasises preventative measures including vaccination protocols, parasite control and good housing management. Respiratory disease prevention is particularly important in housed cattle. Have you implemented a health plan with your veterinarian?",
      prices: "Current beef market prices show finished cattle at approximately £4.20-£4.40/kg deadweight for R4L steers, with premium breed schemes offering higher returns. Store cattle prices are seasonal but currently robust. Would you like information on production costs and breakeven figures?",
      grazing: "Rotational grazing systems can increase productivity by 20-30% compared to continuous grazing, according to AHDB trials. The recommended approach is to graze swards down to 1500kg DM/ha before moving cattle to fresh pasture at 2500-3000kg DM/ha. Have you considered implementing paddock grazing on your farm?"
    },
    pork: {
      housing: "AHDB guidelines for pig housing emphasise welfare standards and environmental control. For finishing pigs, space allowances of 0.65-0.8m² per pig (depending on weight) optimise welfare and performance. Temperature control is critical, with optimal zones of 18-21°C for finishing pigs. What aspect of housing are you looking to improve?",
      health: "Pig health management should focus on biosecurity, vaccination protocols and disease surveillance. AHDB's Significant Diseases Charter provides guidance on managing common health challenges. Regular veterinary input is essential for developing effective health plans. Are there specific disease concerns in your herd?",
      prices: "The current pig market shows the Standard Pig Price (SPP) at approximately £1.80-£1.90/kg, though this fluctuates weekly. Production costs remain challenging, with feed representing 60-70% of total costs. Would you like analysis of market trends or cost reduction strategies?",
      breeding: "AHDB's breeding recommendations for pig producers focus on selection for prolificacy, growth efficiency and carcase quality. Genetic improvements can deliver significant returns through faster growth and improved feed conversion. Have you reviewed your breeding stock performance recently?"
    }
  };
  
  // Delay function to simulate processing time (returns a promise)
  const simulateTyping = () => {
    return new Promise((resolve) => {
      // Random delay between 1-3 seconds
      const delay = 1000 + Math.random() * 2000;
      setTimeout(resolve, delay);
    });
  };
  
  return simulateTyping().then(() => {
    // Check for greetings
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return commonResponses.greeting;
    }
    
    // Check for thanks
    if (q.includes('thank') || q.includes('thanks') || q.includes('appreciated')) {
      return commonResponses.thanks;
    }
    
    // Parse question for keywords relevant to the selected sector
    const sectorData = sectorResponses[sector] || {};
    
    // Match keywords to appropriate responses
    if (q.includes('fertiliz') || q.includes('nutrient') || q.includes('feed') || q.includes('nutrition')) {
      return sector === 'cereals' ? sectorData.fertilizer : 
             sector === 'dairy' ? sectorData.nutrition : 
             sector === 'beef' ? sectorData.feeding : 
             sector === 'pork' ? sectorData.housing : commonResponses.default;
    }
    
    if (q.includes('pest') || q.includes('disease') || q.includes('health') || q.includes('sick')) {
      return sector === 'cereals' ? sectorData.pests : 
             sectorData.health || commonResponses.default;
    }
    
    if (q.includes('price') || q.includes('market') || q.includes('cost') || q.includes('value')) {
      return sectorData.prices || commonResponses.default;
    }
    
    if (q.includes('weather') || q.includes('rain') || q.includes('forecast') || 
        q.includes('climate') || q.includes('temperature')) {
      return sectorData.weather || 
             "Based on recent AHDB weather outlooks, conditions in farming regions are expected to be variable in the coming week. Specific forecasts for your area would require location data. Is there a particular weather concern you have for your operations?";
    }
    
    if (q.includes('breed') || q.includes('genetics') || q.includes('reproduction')) {
      return sectorData.breeding || 
             "Breeding decisions should align with your farm's overall objectives. AHDB offers resources on genetic selection for different production systems. Would you like more specific guidance for your particular farming goals?";
    }
    
    if (q.includes('grazing') || q.includes('pasture') || q.includes('grass')) {
      return sectorData.grazing || 
             "Effective grazing management can significantly impact farm profitability. AHDB research shows that measuring grass growth and implementing rotational grazing can increase utilisation by up to 30%. Would you like more information about setting up a rotational grazing system?";
    }
    
    // If no specific keywords matched, return a default response
    return commonResponses.default;
  });
};

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
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [fullResponse, setFullResponse] = useState('');
  const chatEndRef = useRef(null);
  
  // Scroll to bottom of chat when history updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);
  
  // Typing animation effect
  useEffect(() => {
    if (isTyping && fullResponse) {
      if (currentResponse.length < fullResponse.length) {
        const timer = setTimeout(() => {
          setCurrentResponse(fullResponse.substring(0, currentResponse.length + 3));
        }, 15);
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        setIsLoading(false);
        setChatHistory(prev => [...prev, { type: 'bot', message: fullResponse }]);
        setFullResponse('');
        setCurrentResponse('');
      }
    }
  }, [isTyping, currentResponse, fullResponse]);

  const sendMessage = async () => {
    if (!currentQuestion.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', message: currentQuestion }]);

    // Set loading state
    setIsLoading(true);

    try {
      // Get simulated AI response
      const response = await getSimulatedResponse(selectedSector, currentQuestion);
      
      // Start typing animation
      setFullResponse(response);
      setCurrentResponse('');
      setIsTyping(true);
    } catch (error) {
      console.error('Error getting AI response:', error);

      // Add error message to chat
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: 'Sorry, I encountered an error processing your request. Please try again later.'
      }]);
      
      setIsLoading(false);
    } finally {
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

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-3/4 bg-gray-100 rounded-lg rounded-bl-none px-4 py-2 text-gray-700">
              {currentResponse}
              <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-blink"></span>
            </div>
          </div>
        )}

        {isLoading && !isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-2 flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
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
