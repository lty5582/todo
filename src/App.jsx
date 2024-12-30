import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState([
    {
      id: Number(new Date()),
      content: "안녕하세요",
    },
  ]);

  // 스톱워치 상태
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 (초 단위)
  const [isRunning, setIsRunning] = useState(false); // 스톱워치 작동 여부
  const stopwatchRef = useRef(null); // 스톱워치 타이머 ID

  const inputRef = useRef(null);

  // 스톱워치 제어 함수
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      stopwatchRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(stopwatchRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(stopwatchRef.current);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const addTodo = () => {
    const newTodo = {
      id: Number(new Date()),
      content: inputRef.current.value,
    };
    if (newTodo.content.trim() === '') return; // 빈 입력 방지
    setTodo((prev) => [...prev, newTodo]);
    inputRef.current.value = ''; // 입력창 초기화
  };

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <>
      <div className="stopwatch">
        <h2></h2>
        <p>{formatTime(elapsedTime)}</p>
        <button onClick={startStopwatch}>시작</button>
        <button onClick={stopStopwatch}>정지</button>
        <button onClick={resetStopwatch}>초기화</button>
      </div>
      <TodoInput inputRef={inputRef} addTodo={addTodo} />
      <TodoList todo={todo} deleteTodo={deleteTodo} />
    </>
  );
}

const TodoInput = ({ inputRef, addTodo }) => {
  return (
    <>
      <input ref={inputRef} placeholder="할 일을 입력하세요" />
      <button onClick={addTodo}>추가</button>
    </>
  );
};

const TodoList = ({ todo, deleteTodo }) => {
  return (
    <ul>
      {todo.map((item) => (
        <Todo key={item.id} todo={item} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};

const Todo = ({ todo, deleteTodo }) => {
  return (
    <li>
      {todo.content}
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  );
};

export default App;