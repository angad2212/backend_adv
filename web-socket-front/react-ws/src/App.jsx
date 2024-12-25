import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080'); //the library 
    // exists in browser, you dont need to import it

    //when it opens, you actually set the variable socket
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMessage(message.data);
    }
    return () => newSocket.close();
  }, [])
  
  if(!socket){
    return <div>
      connecting to socket server...
    </div>
  }

  return (
    <>
      <input onChange={(e)=>{
        setCurrent(e.target.value);
      }}></input>
      <button onClick={()=>{
        socket.send(current);
      }}>send message</button>
      {message}
    </>
  )
}

export default App
