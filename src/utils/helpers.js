import { SECTOR_COLORS } from './constants';

/**
 * Get market data for a specific sector
 * @param {string} sector - The agricultural sector
 * @returns {Array} Array of market data objects
 */
export const getMarketData = (sector) => {
  switch(sector) {
    case 'cereals':
      return [
        { item: 'Feed Wheat', price: '£188/tonne', trend: '↑ 2.5%' },
        { item: 'Milling Wheat', price: '£215/tonne', trend: '↑ 3.2%' },
        { item: 'Feed Barley', price: '£162/tonne', trend: '↓ 1.8%' },
        { item: 'Oilseed Rape', price: '£405/tonne', trend: '↑ 4.5%' }
      ];
    case 'dairy':
      return [
        { item: 'Farmgate Milk', price: '36.5p/litre', trend: '↓ 0.8p' },
        { item: 'Organic Milk', price: '48.2p/litre', trend: '↑ 0.3p' },
        { item: 'Cheddar Mild', price: '£3,450/tonne', trend: '→ 0%' },
        { item: 'Butter', price: '£4,100/tonne', trend: '↑ 2.2%' }
      ];
    case 'beef':
      return [
        { item: 'R4L Steers', price: '455p/kg', trend: '↑ 5p' },
        { item: 'R4L Heifers', price: '452p/kg', trend: '↑ 3p' },
        { item: 'Cull Cows', price: '320p/kg', trend: '↑ 8p' },
        { item: 'Store Cattle', price: '£1,250/head', trend: '↓ 2.5%' }
      ];
    case 'pork':
      return [
        { item: 'SPP', price: '162p/kg', trend: '↓ 2p' },
        { item: 'Cull Sows', price: '105p/kg', trend: '↑ 3p' },
        { item: '7kg Weaner', price: '£38.50/head', trend: '↑ 0.5%' },
        { item: '30kg Store', price: '£62.00/head', trend: '→ 0%' }
      ];
    default:
      return [];
  }
};

/**
 * Get market insights for a specific sector
 * @param {string} sector - The agricultural sector
 * @returns {Array} Array of market insight objects
 */
export const getMarketInsights = (sector) => {
  switch(sector) {
    case 'cereals':
      return [
        { location: 'East of England', note: 'Premium wheat demand strong', status: 'Prices rising' },
        { location: 'South West', note: 'High transport costs affecting margins', status: 'Average returns' },
        { location: 'International', note: 'Black Sea exports increasing', status: 'Watch futures' }
      ];
    case 'dairy':
      return [
        { location: 'Liquid Market', note: 'Retail competition intensifying', status: 'Prices stable' },
        { location: 'Manufacturing', note: 'Cheese demand improving', status: 'Positive outlook' },
        { location: 'Export Market', note: 'EU trade showing recovery', status: 'Monitor closely' }
      ];
    case 'beef':
      return [
        { location: 'Deadweight', note: 'Tight supplies supporting prices', status: 'Strong position' },
        { location: 'Auction Markets', note: 'Finished cattle numbers down 5%', status: 'Prices rising' },
        { location: 'Retail', note: 'Premium mince demand improving', status: 'Mixed outlook' }
      ];
    case 'pork':
      return [
        { location: 'Processing', note: 'EU imports competitive', status: 'Price pressure' },
        { location: 'Butchers', note: 'Local sourcing premium strong', status: 'Opportunity' },
        { location: 'Export Market', note: 'Asian markets showing interest', status: 'Potential growth' }
      ];
    default:
      return [];
  }
};

/**
 * Simulate image analysis based on selected sector
 * @param {string} sector - The agricultural sector
 * @returns {Promise} Promise that resolves to analysis results
 */
export const simulateImageAnalysis = (sector) => {
  return new Promise((resolve) => {
    // Reduced timeout here as the steps in FieldCheck.js now add delay
    setTimeout(() => {
      const results = {
        cereals: {
          cropHealth: 'Moderate Concern',
          possibleIssues: ['Early signs of yellow rust detected', 'Some lodging risk present'],
          recommendations: [
            'Consider T2 fungicide application within 5-7 days',
            'Monitor nitrogen levels - current crop suggests adequate uptake',
            'Check AHDB Recommended Lists for yellow rust resistance ratings'
          ]
        },
        dairy: {
          cropHealth: 'Healthy',
          possibleIssues: ['Some potential for reduced protein content'],
          recommendations: [
            'Optimal time for first silage cut approaching',
            'Consider soil testing for next rotation planning',
            'Review AHDB Grass Growth model for your region'
          ]
        },
        beef: {
          cropHealth: 'Healthy',
          possibleIssues: ['Minor clover content reduction'],
          recommendations: [
            'Good grazing conditions present',
            'Consider rotational grazing to maximise utilisation',
            'Check AHDB Better Returns Programme for grazing management'
          ]
        },
        pork: {
          cropHealth: 'Healthy',
          possibleIssues: ['Some compaction visible in feeding areas'],
          recommendations: [
            'Consider rotating outdoor pig paddocks',
            'Good forage growth conditions',
            'Check AHDB guidance on outdoor pig management'
          ]
        }
      };

      resolve(results[sector]);
    }, 500); // Reduced simulated delay
  });
};

/**
 * Get AI assistant response based on sector and question
 * @param {string} sector - The agricultural sector
 * @param {string} question - The user's question
 * @returns {Promise} Promise that resolves to AI response
 */
export const getAIResponse = (sector, question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let response;
      question = question.toLowerCase();

      if (question.includes('fertiliser') || question.includes('fertilizer')) {
        if (sector === 'cereals') {
          response = 'For your winter wheat at this growth stage, I recommend following AHDB RB209 guidance with 180-220 kg N/ha split across 3 applications. Consider sulphur application (50-75 kg SO₃/ha) if soil indices suggest deficiency.';
        } else if (sector === 'dairy') {
          response = 'For your grassland, AHDB recommends 250-300 kg N/ha/year for intensive grazing, split across multiple applications. The next application should be timed 2-3 weeks before your expected growth peak.';
        } else {
          response = 'Based on AHDB guidance for your farm type, I recommend reviewing the Nutrient Management Guide (RB209) for specific recommendations tailored to your soil type and previous cropping.';
        }
      } else if (question.includes('rain') || question.includes('weather')) {
        response = 'Based on Met Office forecasts for your region, expect unsettled conditions with 15-20mm rainfall over the next 5 days. There\'s a potential spray window on Thursday morning. AHDB weather intelligence suggests monitoring soil moisture levels.';
      } else if (question.includes('market') || question.includes('price')) {
        if (sector === 'cereals') {
          response = 'Current AHDB reported feed wheat prices are £185-195/tonne, a 3% increase from last month. Milling premium is currently £25-30/tonne. Forward contracts for harvest 2025 are showing £175-185/tonne.';
        } else if (sector === 'dairy') {
          response = 'AHDB Milk Price Index shows current farmgate prices averaging 36.5p per litre, down 0.8p from last month. Commodity markets suggest stable prices for the next quarter.';
        } else if (sector === 'beef') {
          response = 'AHDB reports GB deadweight cattle prices at 450-460p/kg for R4L steers, up 5p on the week. The current 5-year average is 420p/kg. Calf prices at markets are showing seasonal strength.';
        } else if (sector === 'pork') {
          response = 'AHDB pig price reporting shows the SPP at 160-165p/kg, down 2p on the week but 15p above year-earlier levels. EU prices are currently 10-12p/kg below UK levels.';
        }
      } else {
        response = 'Thank you for your question. AHDB has extensive resources on this topic. Based on your farm profile and current conditions in your region, I recommend checking the AHDB Knowledge Library or Evidence for Farming Initiative. Would you like more specific advice about crop protection, livestock management, or market information?';
      }

      resolve(response);
    }, 1000);
  });
};

/**
 * Get status colour classes based on trend or status text
 * @param {string} text - Trend or status text
 * @returns {string} Tailwind CSS classes
 */
export const getStatusColorClasses = (text) => {
  if (text.includes('↑') || text.includes('rising') || text.includes('strong') || text.includes('Positive')) {
    return 'bg-green-50 text-green-600';
  } else if (text.includes('↓') || text.includes('pressure') || text.includes('down')) {
    return 'bg-amber-50 text-amber-900';
  } else {
    return 'bg-blue-50 text-blue-500';
  }
};

/**
 * Get publication name based on sector and index
 * @param {string} sector - The agricultural sector
 * @param {number} index - Publication index
 * @returns {string} Publication name
 */
export const getPublicationName = (sector, index) => {
  switch(sector) {
    case 'cereals':
      return index === 1 ? 'Wheat Growth Guide' :
             index === 2 ? 'Recommended Lists 2025/26' :
             `Arable Publication ${index}`;
    case 'dairy':
      return index === 1 ? 'Forage for Knowledge' :
             index === 2 ? 'Mastitis Control Plan' :
             `Dairy Publication ${index}`;
    case 'beef':
      return index === 1 ? 'Better Returns Programme' :
             index === 2 ? 'Beef & Lamb Selection' :
             `Beef & Lamb Publication ${index}`;
    case 'pork':
      return index === 1 ? 'Pig Health & Performance' :
             index === 2 ? 'Practical Pig Guide' :
             `Pork Publication ${index}`;
    default:
      return `Publication ${index}`;
  }
};
