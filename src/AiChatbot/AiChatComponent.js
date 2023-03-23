import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from "react";
const API_KEY = "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";
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 10 years of experience."
}
const AiChatComponent = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        setIsTyping(true);
        // How it responds, how it talks, etc.
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]);
                setIsTyping(false);
            });
    }
    return (
        <div style={{ height: "100vh" }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                    >
                        {messages.map((message, i) => {
                            console.log(message)
                            return <Message key={i} model={message} />
                        })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default AiChatComponent




// 1. E-commerce Site: As an experienced React.js developer, you could build a more complex e-commerce site that features advanced functionality such as user authentication, product recommendations, and search filters.

// 2. Gym/Health App: Develop a fitness app that tracks users' workouts, provides diet recommendations, and allows them to schedule appointments or classes. This app could be developed with React.js as a front-end framework and integrated with a back-end API to handle data storage and processing.

// 3. Recipe Finder: Develop a recipe search engine that uses machine learning algorithms to recommend recipes to users based on their dietary restrictions and preferences. You could use React to build the front-end of the application and integrate with a machine learning API to power the recommendation engine.

// 4. Collaborative Writing Platform: Build a collaborative writing platform that allows users to work together on writing projects in real-time. You could use React to build a real-time chat interface that enables users to communicate and collaborate seamlessly.

// 5. Finance Tracker: Develop a finance tracker that helps users keep track of their income and expenses, categorize transactions, and generate reports. You could use React to build a custom dashboard that displays charts and graphs and integrates with a financial API to pull transaction data.

// I hope these project ideas are helpful and inspire you to build something great!