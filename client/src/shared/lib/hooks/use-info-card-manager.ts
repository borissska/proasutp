import { useState, useCallback } from 'react';
import { ROOM_CONFIG } from '../../../entities/room/model/constants';

export interface InfoCardData {
  title: string;
  description: string;
  position: [number, number, number];
  width?: number;
}

// Маппинг имен моделей на данные информационных карточек
const MODEL_INFO_MAP: Record<string, InfoCardData> = {
  'Box': ROOM_CONFIG.BOX.INFO,
  'DistributionBox': ROOM_CONFIG.DISTRIBUTION_BOX.INFO,
  'Boilerhouse': ROOM_CONFIG.BOILERHOUSE.INFO,
  'Notepad': ROOM_CONFIG.NOTEPAD.INFO,
  'Phone': ROOM_CONFIG.PHONE.INFO,
  'WallBox': ROOM_CONFIG.WALL_BOX.INFO,
};

export const useInfoCardManager = () => {
  const [currentCard, setCurrentCard] = useState<InfoCardData | null>(null);

  const showInfoCard = useCallback((modelName: string) => {
    console.log(`📋 showInfoCard called for: ${modelName}`);
    console.log(`📋 Available models:`, Object.keys(MODEL_INFO_MAP));
    
    const cardData = MODEL_INFO_MAP[modelName];
    if (cardData) {
      console.log(`📋 Found card data:`, cardData);
      setCurrentCard((prev) => {
        const newCard = prev?.title === cardData.title ? null : cardData;
        console.log(`📋 Setting card:`, newCard);
        return newCard;
      });
    } else {
      console.warn(`❌ No info card data found for model: ${modelName}`);
      console.log(`📋 Tried to find: "${modelName}" in:`, Object.keys(MODEL_INFO_MAP));
    }
  }, []);

  const hideInfoCard = useCallback(() => {
    console.log(`📋 Hiding info card`);
    setCurrentCard(null);
  }, []);

  return {
    currentCard,
    showInfoCard,
    hideInfoCard,
  };
}; 