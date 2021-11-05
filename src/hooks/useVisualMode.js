import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replaceCurrentMode = false) => {
    setMode(newMode);
    setHistory(prev => {
      const prevState = [...prev]
      replaceCurrentMode && prevState.pop()
      return [...prevState, newMode]
    })
  };

  const back = function() {
    if(history.length > 1)
    {const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    };
  }

  return { mode, transition, back };
}