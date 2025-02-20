import './App.css'
import { Card, useAuthenticator } from '@aws-amplify/ui-react'
import { useAIConversation } from './client'
import { AIConversation } from '@aws-amplify/ui-react-ai'

function App() {
  const { user, signOut } = useAuthenticator()
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat')

  return (
    <>
        <AIConversation
        allowAttachments
        avatars={{
          user: {
            username: user.signInDetails?.loginId
          },
          ai: { 
            username : 'AI Assistant Heem'
          }
        }}
        displayText={{
          getMessageTimestampText: (date) => new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            hour12: true,
            timeZone: 'UTC'
          }).format(date),
        }}
          welcomeMessage={
            <Card>
              <p>I am your virtual assistant, ask me anything! </p>
            </Card>
          }
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}

export default App
