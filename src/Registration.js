import React, { useState, useEffect } from 'react';
import './registration.css';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clientID, setClientID] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Восстановить состояние успешной регистрации из локального хранилища при монтировании компонента
    const storedIsRegistered = JSON.parse(localStorage.getItem('isRegistered'));
    if (storedIsRegistered) {
      setIsRegistered(storedIsRegistered);
    }
  }, []);

  useEffect(() => {
    // Сохранить состояние успешной регистрации в локальное хранилище при изменении флага isRegistered
    localStorage.setItem('isRegistered', JSON.stringify(isRegistered));
  }, [isRegistered]);

  const handleLogout = () => {
    // Ваша логика выхода из аккаунта...
    // В данном примере, мы просто устанавливаем флаг isRegistered в false
    setIsRegistered(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

   
    setIsRegistered(true);
  };

  return (
    <div className='registration-container'>
      <h1 className='registP'>Регистрация</h1>
      {isRegistered ? (
        <div className='success-message'>
          <p>Вы успешно зарегистрированы!</p>
          <button  className='logout-button' onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      ) : (
        <form className='registration-form' onSubmit={handleSubmit}>
          <div>
            <label className='regist-label1'>E-mail:</label>
            <input className='regist-input1'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='regist-label2'>Пароль:</label>
            <input className='regist-input2'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='regist-label3'>Имя:</label>
            <input className='regist-input3'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className='regist-label4'>Фамилия:</label>
            <input className='regist-input4'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className='regist-label5'>Client ID:</label>
            <input className='regist-input5'
              type="text"
              value={clientID}
              onChange={(e) => setClientID(e.target.value)}
              required
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
      )}
    </div>
  );
};

export default Registration;



