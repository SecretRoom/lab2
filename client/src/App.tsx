import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import * as R from 'ramda'
import useWebSocket from 'react-use-websocket';
import axios from 'axios';


function App() {
  const didUnmount = useRef(false);

  const [data, setData] = useState('')
  const [getData, setGetData] = useState({ text: '', number: 0 })
  const [postData, setPostData] = useState({ text: '', number: 0 })

  const { lastMessage, sendJsonMessage } = useWebSocket<any>(`ws://localhost:5000`, {
    share: true,
    shouldReconnect: () => {
      /*
      useWebSocket will handle unmounting for you, but this is an example of a
      case in which you would not want it to automatically reconnect
    */
      return didUnmount.current === false;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  })

  useEffect(() => {
    if (!R.isNil(lastMessage)) {
      const data = eval(`(${lastMessage?.data})`);
      setData(data?.btn || '')
    }
  }, [lastMessage])

  useEffect(() => {
    sendJsonMessage({ test: 'test' })
  }, [])

  return (
    <div className="App">
      <div className="btns">
        <button onClick={() => {
          sendJsonMessage({ btn: '1' })
        }}>1</button>
        <button onClick={() => {
          sendJsonMessage({ btn: '2' })
        }}>2</button>
        <button onClick={() => {
          sendJsonMessage({ btn: '3' })
        }}>3</button>
        <button onClick={() => {
          sendJsonMessage({ btn: '4' })
        }}>4</button>
      </div>
      <div>
        Была нажата кнопка: {data}
      </div>
      <div className="queries">
        <div className="query">
          <button onClick={() => {
            axios.get('http://localhost:5000').then((res) => {
              setGetData({ text: res.data.items, number: getData.number + 1 })
            })
          }}>get</button>
          {getData.text}{getData.number > 0 && ` * ${getData.number}`}
        </div>
        <div className="query">
        <button onClick={() => {
            axios.post('http://localhost:5000', 'post').then((res) => {
              setPostData({ text: res.data.items, number: postData.number + 1 })
            })
          }}>post</button>
          {postData.text}{postData.number > 0 && ` * ${postData.number}`}
        </div>
      </div>
    </div>
  );
}

export default App;
