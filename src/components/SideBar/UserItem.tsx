import { FiChevronsLeft, FiLogOut } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { FC } from 'react';
import { Item } from './Item';
import { useCurrentUserStore } from '../../modules/auth/current-user.state';

const UserItem: FC = () => {
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const signout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className='user-item-trigger'
          role='button'
        >
          <div className='user-item-info'>
            <span className='user-item-name'>
              {currentUser!.name} さんのノート
            </span>
          </div>
          <FiChevronsLeft className='user-item-chevron' size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='user-item-dropdown'
        align='start'
        alignOffset={11}
        forceMount
      >
        <div className='user-item-dropdown-content'>
          <p className='user-item-email'>
            {currentUser!.email}
          </p>
          <div className='user-item-info'>
            <div>
              <p className='user-item-name-display'>{currentUser!.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='user-item-logout'
          asChild
        >
          <Item label='ログアウト' icon={FiLogOut} onClick={signout} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
