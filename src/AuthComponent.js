import React, { useState, useEffect } from 'react';
import './AuthComponent.css';

const AuthComponent = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // При выходе, устанавливаем isLoggedIn в false и сбрасываем состояния username и password
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    // При монтировании компонента, проверяем состояние аутентификации в локальном хранилище и восстанавливаем его
    const storedAuthState = JSON.parse(localStorage.getItem('authState'));

    if (storedAuthState && storedAuthState.isLoggedIn) {
      setLoggedIn(true);
      setUsername(storedAuthState.username);
    }
  }, []);

  useEffect(() => {
    // При изменении состояния аутентификации, сохраняем его в локальное хранилище
    localStorage.setItem(
      'authState',
      JSON.stringify({ isLoggedIn, username })
    );
  }, [isLoggedIn, username]);

  return (
    <header className='headerAuth'>
      <nav className='navAuth'>
        <ul className='ulauth'>
          {isLoggedIn ? (
            <li className='liauth'>
              <span className='spanauth'>Привет, {username}!</span>
              <button className='buttonauth' onClick={handleLogout}>Выйти</button>
            </li>
          ) : (
            <li className='liauth'>
              <input className='inputauth'
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input className='inputauth'
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='buttonauth' onClick={handleLogin}>Войти</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AuthComponent;

