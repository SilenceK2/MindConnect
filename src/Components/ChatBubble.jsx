function ChatBubble({ type, content, id }) {
  return (
    <>
    
      
      <div className={`chat-bubble ${id} ${type}`}>{type}{content}</div>
    </>
  );
}

export default ChatBubble;
