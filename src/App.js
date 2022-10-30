import { useState } from "react";
import "./App.css";
import Checkout from "./Checkout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Checkout />
    </div>
  );
}

export default App;