# Chatbot Feature

A floating chatbot widget for the Cash Flow Management landing page that collects user information through a conversational interface.

## Features

- **Floating Design**: Positioned at the bottom-right corner of the page
- **Topic Selection**: Users first select from 6 predefined topics
- **Dynamic Questions**: Each topic has 2-3 tailored follow-up questions
- **Responsive Design**: Adapts to mobile and desktop screens
- **Animation**: Smooth transitions using Framer Motion
- **Matching Design System**: Uses the same colors and styling as the main page

## Available Topics

1. **General contact** - For general inquiries and discussions
2. **Feedback** - For user feedback and suggestions
3. **Become a beta user** - For users interested in beta testing
4. **Demo request** - For scheduling product demonstrations
5. **Technical support** - For technical assistance

## Topic-Based Questions

Each topic has specific follow-up questions, with an email request at the end:

### General contact
- "What would you like to discuss with our team?"
- "What's the best way for us to get in touch with you?"
- "Please provide your email address so we can follow up with you."

### Feedback
- "We'd love to hear your feedback! What would you like to share?"
- "How can we improve our cash flow management solution?"
- "Please provide your email address so we can follow up on your feedback."

### Become a beta user
- "Exciting! Tell us more about your interest in becoming a beta user."
- "What specific features are you most excited to test?"
- "How many transactions does your company typically process monthly?"
- "Please provide your email address so we can send you beta access information."

### Demo request
- "What specific aspects of our cash flow solution interest you most?"
- "What challenges are you currently facing with cash flow management?"
- "When would be the best time to schedule your personalized demo?"
- "Please provide your email address so we can schedule your demo."

### Technical support
- "What technical issue are you experiencing?"
- "Have you tried any troubleshooting steps already?"
- "Please provide your email address so our support team can assist you."

## Backend Integration

The chatbot is ready for backend integration. The data structure sent to the backend includes:

```typescript
interface ChatbotFormData {
  topic: string;
  responses: { question: string; answer: string }[];
  userInfo: {
    name: string;
    email: string;
    company: string;
  };
}
```

### API Endpoint Expected

The chatbot will POST data to `/api/chatbot/submit` with the following payload:

```json
{
  "timestamp": "2025-09-10T12:00:00.000Z",
  "topic": "Demo request",
  "responses": [
    {
      "question": "What specific aspects of our cash flow solution interest you most?",
      "answer": "Automated reporting and real-time analytics"
    },
    {
      "question": "What challenges are you currently facing with cash flow management?",
      "answer": "Manual processes and delayed reporting"
    }
  ],
  "userInfo": {
    "name": "User",
    "email": "user@example.com", 
    "company": "ABC Corp"
  }
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Data received successfully",
  "id": "chatbot_submission_123"
}
```

## Files Created

- `src/features/chatbot/components/Chatbot.tsx` - Main chatbot component
- `src/features/chatbot/index.tsx` - Feature export
- `src/shared/hooks/useChatbot.ts` - Chatbot hook for data submission
- `src/shared/services/api/chatbot.ts` - API service for backend communication

## Usage

The chatbot is automatically included in the main App component and will appear on all pages. No additional setup is required.

## Customization

To modify the topics, edit the `TOPICS` array in `src/features/chatbot/components/Chatbot.tsx`:

```typescript
const TOPICS = [
  'Your custom topic 1',
  'Your custom topic 2',
  // ... add more topics
];
```

To modify questions for each topic, update the `getTopicQuestions` function:

```typescript
const getTopicQuestions = (topic: string): string[] => {
  switch (topic) {
    case 'Your custom topic 1':
      return [
        'Your custom question 1?',
        'Your custom question 2?',
      ];
    // ... add more cases
  }
};
```

## Styling

The chatbot uses the same design system as the rest of the application:
- Primary color: `#00d4ff` (cyan)
- Gradients: `from-[#00d4ff] to-[#0099cc]`
- Consistent with existing modal and button styles
