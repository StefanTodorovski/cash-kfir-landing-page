import { useState, useCallback } from 'react';
import { submitChatbotResponses } from '../services/api';

export interface ChatbotFormData {
  topic: string;
  responses: { question: string; answer: string }[];
  userInfo: {
    name: string;
    email: string;
    company: string;
  };
}

export const useChatbot = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const submitChatbotData = useCallback(async (data: ChatbotFormData) => {
    setIsProcessing(true);
    
    try {
      const result = await submitChatbotResponses(data);
      
      if (result.success) {
        console.log('Chatbot data submitted successfully:', result.message);
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting chatbot data:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to submit data' 
      };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    submitChatbotData,
    isProcessing,
  };
};
