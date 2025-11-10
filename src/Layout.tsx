import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import './styles/layout.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='layout-container'>
      <SideBar />
      <main className='layout-main'>
        <Outlet />
      </main>
      <SearchModal />
    </div>
  );
};

export default Layout;
