import './App.css';
import AiChatComponent from './AiChatbot/AiChatComponent';
import { useState } from 'react';
import { BsFillChatTextFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
function App() {
  const [botActive, setBotActive] = useState(false)
  return (
    <>
      < div style={{ height: "100vh" }}>
        {botActive ?
          <div className='chat-sec'>
            <AiChatComponent />
            <AiOutlineCloseCircle className='close-btn'
              onClick={() => setBotActive(false)}
            />
          </div>
          :
          <BsFillChatTextFill
            className='chat_icon'
            onClick={() => setBotActive(true)} />}
      </div>
    </>
  );
}

export default App;
