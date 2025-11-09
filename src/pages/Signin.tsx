import { authRepository } from '../modules/auth/auth.repository';
import { useCurrentUserStore } from '../modules/auth/current-user.state';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/pages/auth.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const signin = async () => {
    const { user, token } = await authRepository.signin(email, password);
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
                  disabled={email === '' || password === ''}
                  onClick={signin}
                  className='home-button'
                  style={{width: '100%'}}
                >
                  ログイン
                </button>
              </div>
              <div className='auth-link-section'>
                登録は
                <Link className='auth-link' to={'/signup'}>
                  こちら
                </Link>
                から
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
