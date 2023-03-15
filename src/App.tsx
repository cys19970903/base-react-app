import { useState } from 'react';
import style from '@/assets/styles/app.module.scss';

function App() {
  const [count, setCount] = useState(0);
	return (
  <div className={style.testColor}>
    <h3>
      This is custom React app!
      {count}
    </h3>
    <button onClick={() => setCount((pre) => pre + 1)}>add</button>
  </div>
);
}

export default App;
