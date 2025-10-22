import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChatBubbleIcon
} from '@radix-ui/react-icons';
import { useChatbot } from '../../contexts/ChatbotContext';

const FloatingChatbot = () => {
  const { 
    hasCompletedAssessment, 
    startAssessment 
  } = useChatbot();

  // Show chatbot on first load if assessment not completed
  useEffect(() => {
    if (!hasCompletedAssessment) {
      const timer = setTimeout(() => {
        startAssessment();
      }, 2000); // Show after 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [hasCompletedAssessment, startAssessment]);

  return (
    <>
      {/* Floating Chat Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div className="relative">
          {/* Notification Badge */}
          {!hasCompletedAssessment && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          )}
          
          <Button
            onClick={() => {
              startAssessment();
            }}
            size="lg"
            className="w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
          >
            <ChatBubbleIcon className="w-7 h-7 text-white" />
          </Button>
        </div>
      </div>

    </>
  );
};

export default FloatingChatbot;
