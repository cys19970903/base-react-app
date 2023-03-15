import { useState } from 'react';
import hiddenImg from '@/assets/images/img_login_hidden.webp';
import hiddenImg1 from '@/assets/images/img_login_i18n.webp';
import hiddenImg2 from '@/assets/images/img_login_logo.webp';
import hiddenImg3 from '@/assets/images/img_login_password.webp';
import hiddenImg4 from '@/assets/images/img_login_tel.webp';
import hiddenImg5 from '@/assets/images/img_login_username.webp';
import style from '@/assets/styles/app.module.scss';

function App() {
  const [count, setCount] = useState(0);
	return (
  <div className={style.test}>
    <h3>
      This is custom React app!
      {count}
    </h3>
    <img src={hiddenImg} alt="" />
    <img src={hiddenImg1} alt="" />
    <img src={hiddenImg2} alt="" />
    <img src={hiddenImg3} alt="" />
    <img src={hiddenImg4} alt="" />
    <img src={hiddenImg5} alt="" />
    <button onClick={() => setCount((pre) => pre + 1)}>add</button>
  </div>
);
}

export default App;
