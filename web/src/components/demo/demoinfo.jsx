import { useState } from "react";
import './demoinfo.css';

function DemoInfo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="demo-container">
      <i className="fa-solid fa-circle-info"></i>
      <h2>Esto es una demo, pulsa Start journey para empezar</h2>
      <button onClick={() => setVisible(false)}>
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
}

export default DemoInfo;