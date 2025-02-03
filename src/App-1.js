import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {

  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // const [chatHistory, setChatHistory] = useState(() => {
  //   // Load history from local storage when the app starts
  //   const savedHistory = localStorage.getItem("chatHistory");
  //   return savedHistory ? JSON.parse(savedHistory) : [];
  // });

  const [showHeading, setShowHeading] = useState(true); // New state to toggle heading visibility
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility
  const [isFullViewport, setIsFullViewport] = useState(false); // New state to track viewport overflow
  const chatBoxRef = useRef(null);
  const mainContainerRef = useRef(null); // Ref for main container

  useEffect(() => {
    // Save history to local storage whenever it changes
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);



  // Handle Submit (when the user sends a message)
  const handleSubmit = async () => {
    // Reload chat history from local storage
    // const savedHistory = localStorage.getItem("chatHistory");
    // const previousChatHistory = savedHistory ? JSON.parse(savedHistory) : [];
    if (value.trim()) {
      const newHistory = [
        ...chatHistory,
        // ...previousChatHistory,
        { type: "question", text: value },
        { type: "typing", text: "Chatbot is typing..." }, // Add typing indicator
      ];
  
      setChatHistory(newHistory);
      setValue("");
      setShowHeading(false);
      setShowSidebar(true);
  
      try {
        // Prepare FormData
        const formData = new FormData();
        formData.append("human_input", value);
  
        // Make an API call with the input value
        const response = await fetch("http://140.245.27.67:8081/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ human_input: value }), // Convert input to JSON
        });
  
        if (response.ok) {
          const data = await response.json(); // Parse response as JSON
          setChatHistory((prevHistory) =>
            prevHistory.slice(0, -1).concat({ type: "answer", text: data.ai_response || "I could not understand your question." })
          );
        } else {
          throw new Error("Failed to fetch response");
        }
      } catch (error) {
        console.error("Error fetching API:", error);
        setChatHistory((prevHistory) =>
          prevHistory.slice(0, -1).concat({ type: "answer", text: "Sorry, there was an error processing your request." })
        );
      }
    }
  };  
  

  const inputValueChange = (event) => {
    setValue(event.target.value);
  };

  
  // Handle Enter key press to submit the form
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(); // Trigger submit on Enter key press
    }
  };

  // Scroll to the bottom of the chat box when chatHistory changes
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Function to check if content exceeds viewport
  useEffect(() => {
    const checkHeight = () => {
      if (mainContainerRef.current) {
        setIsFullViewport(mainContainerRef.current.scrollHeight > window.innerHeight);
      }
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    
    return () => window.removeEventListener("resize", checkHeight);
  }, [chatHistory]);

  // Get the first question from chat history
  const firstQuestion = chatHistory.find(entry => entry.type === 'question')?.text;


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edits <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
      <section className={`chat-section ${showSidebar ? "afterSidebar-open" : ""}`} ref={chatBoxRef}>
        
      {showSidebar && (
        <div className="wrape-sidebar">
          <div className="history-data-heading">Today</div>
          <div className="history-data-item">{firstQuestion ? firstQuestion : "No questions yet"}</div>
        </div>
      )}

        <div ref={mainContainerRef} className={`main-container ${isFullViewport ? "full-viewport" : ""}`}>
          <div className="top-container">
            
          {showHeading && 
            <h2 className="heading-2">What can I help with?</h2>
          } 
            
            <div className="wrape-quq-ans-box">
            {chatHistory.map((entry, index) => (
              <div key={index} className={entry.type === "question" ? "wrape-que-inputValue" : "wrape-ans-inputValue"}>
                <div className={entry.type === "question" ? "que-inputValue" : "ans-inputValue"}>
                  {entry.type === "answer" && <span className="chatbot-image"><img src="mjunction-logo.png" className="" alt="logo" /></span>}
                  {entry.type === "typing" ? (
                    <span className="typing-indicator">...</span> // Display typing animation or dots
                  ) : (
                    entry.text
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="bottom-container">
            <div className="input-wraper">
              <input type="text" className="form-control" placeholder="Message Chatbot" value={value} onChange={inputValueChange} onKeyPress={handleKeyPress} />
              <div className="wrape-btn">
                <button className="btn submit-btn" onClick={handleSubmit}><i className="arrow right"></i></button>
              </div>
            </div>
            <div className="footer">
              <p>ChatBot can make mistakes. Check important info.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
