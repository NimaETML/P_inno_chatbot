<template>
  <div class="chat-container">
    <div class="chat-box">
      <div v-for="(message, index) in chatMessages" :key="index" :class="message.sender">
        <p>{{ message.text }}</p>
      </div>
    </div>
    <div class="type-and-send">
      <input
      type="text"
      v-model="userMessage"
      @keydown.enter="sendMessage"
      placeholder="Type your message..."
    />
    <button @click="sendMessage">Send</button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

// Define an interface for a chatbot response
interface ChatbotResponse {
  keywords: string[];
  response: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default defineComponent({
  name: 'Chatbot',
  setup() {
    const chatMessages = ref<Message[]>([]);
    const userMessage = ref<string>('');
    const responses = ref<ChatbotResponse[]>([]); // Array to store responses from the JSON file

    // Function to send the user's message and get bot response
    const sendMessage = () => {
      if (userMessage.value.trim() === '') return;

      // User's message
      chatMessages.value.push({
        sender: 'user',
        text: userMessage.value,
      });

      // Get chatbot's response
      const botResponse = getBotResponse(userMessage.value);
      chatMessages.value.push({
        sender: 'bot',
        text: botResponse,
      });

      userMessage.value = ''; // Clear the input field
    };

    // Function to get the bot's response based on the user's message
    const getBotResponse = (message: string): string => {
      const lowerCaseMessage = message.toLowerCase().split(/\s+/); // Split the message into words

      // Check all responses to find one that matches the keywords
      for (const response of responses.value) {
        if (response.keywords.every(keyword => lowerCaseMessage.includes(keyword))) {
          return response.response; // If all keywords are present, return the response
        }
      }

      // If no response matches, return the default response (no keywords required)
      const defaultResponse = responses.value.find(res => res.keywords.length === 0);
      return defaultResponse ? defaultResponse.response : "I don't understand.";
    };

    // Load the external JSON file with bot responses
    const loadResponses = async () => {
      try {
        const response = await fetch('./src/data/responses.json'); // Path to the file in the public folder
        const data = await response.json();
        responses.value = data.responses; // Store the loaded responses in the ref
      } catch (error) {
        console.error('Error loading responses:', error);
      }
    };

    // Load the responses data when the component is mounted
    onMounted(() => {
      loadResponses();
    });

    return {
      chatMessages,
      userMessage,
      sendMessage,
    };
  },
});
</script>

<style scoped>
.chat-container {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.type-and-send {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
}
.chat-box {
  width: 100%;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.chat-box .user {
  align-self: flex-end;
  background-color: #e0ffe0;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
}

.chat-box .bot {
  align-self: flex-start;
  background-color: #e0f7ff;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
}

input {
  padding: 10px;
  width: 140%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
