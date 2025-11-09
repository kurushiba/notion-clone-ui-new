import { authRepository } from '../modules/auth/auth.repository';
import { useCurrentUserStore } from '../modules/auth/current-user.state';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/pages/auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const signup = async () => {
    const { user, token } = await authRepository.signup(name, email, password);
    localStorage.setItem('token', token);
    setCurrentUser(user);
  };
  if (currentUser != null) return <Navigate replace to='/' />;

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <h2 className='auth-title'>
          Notionクローン
        </h2>
        <div className='auth-form-container'>
          <div className='auth-card'>
            <div className='auth-form'>
              <div>
                <label
                  className='auth-label'
                  htmlFor='username'
                >
                  ユーザー名
                </label>
                <div className='auth-input-container'>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    id='username'
                    name='username'
                    placeholder='ユーザー名'
                    required
                    type='text'
                    className='input-auth'
                  />
                </div>
              </div>
              <div>
                <label
                  className='auth-label'
                  htmlFor='email'
                >
                  メールアドレス
                </label>
                <div className='auth-input-container'>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    name='email'
                    placeholder='メールアドレス'
                    required
                    type='email'
                    className='input-auth'
                  />
                </div>
              </div>
              <div>
                <label
                  className='auth-label'
                  htmlFor='password'
                >
                  パスワード
                </label>
                <div className='auth-input-container'>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    name='password'
                    placeholder='パスワード'
                    required
                    type='password'
                    className='input-auth'
                  />
                </div>
              </div>
              <div>
                <button
                  disabled={name === '' || email === '' || password === ''}
                  onClick={signup}
                  className='home-button'
                  style={{width: '100%'}}
                >
                  登録
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
