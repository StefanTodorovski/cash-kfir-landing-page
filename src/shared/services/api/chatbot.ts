import { API_CONFIG } from '../../config/environment';

/**
 * Simple API request handler for chatbot requests
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: any; error?: string }> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers as Record<string, string>),
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds

    const response = await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error(`API request failed for ${endpoint}:`, error);

    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Request timeout' };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Chatbot API service
 */
export type ChatbotRequestData = {
  chosenTopic: string;
  question1: string;
  question2: string;
  question3: string;
  question4?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4?: string;
};

export const chatbotService = {
  async submitChatbotRequest(requestData: ChatbotRequestData) {
    // Simple validation
    const requiredFields: (keyof ChatbotRequestData)[] = [
      'chosenTopic',
      'question1',
      'question2', 
      'question3',
      'answer1',
      'answer2',
      'answer3',
    ];
    const missingFields = requiredFields.filter(field => !requestData[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
        status: 400,
      };
    }

    // Convert to match backend naming convention (C# PascalCase)
    const backendData = {
      ChosenTopic: requestData.chosenTopic,
      Question1: requestData.question1,
      Question2: requestData.question2,
      Question3: requestData.question3,
      Question4: requestData.question4 || null,
      Answer1: requestData.answer1,
      Answer2: requestData.answer2,
      Answer3: requestData.answer3,
      Answer4: requestData.answer4 || null,
    };

    return apiRequest('/api/BusinessContact/chatbot-request', {
      method: 'POST',
      body: JSON.stringify(backendData),
    });
  },
};

export default chatbotService;
