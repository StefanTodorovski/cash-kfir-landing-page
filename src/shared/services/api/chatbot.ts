import { ChatbotFormData } from '../../hooks/useChatbot';

export interface ChatbotSubmissionResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const submitChatbotResponses = async (
  data: ChatbotFormData
): Promise<ChatbotSubmissionResponse> => {
  try {
    // TODO: Replace with actual API endpoint when backend is ready
    const endpoint = '/api/chatbot/submit';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        topic: data.topic,
        responses: data.responses,
        userInfo: data.userInfo,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting chatbot data:', error);
    
    // For now, return mock success response for development
    return {
      success: true,
      message: 'Data logged successfully (development mode)',
      id: `chatbot_${Date.now()}`,
    };
  }
};
