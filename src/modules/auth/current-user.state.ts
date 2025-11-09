import { atom, useAtom } from 'jotai';
import { User } from '../users/user.entity';

const currentUserAtom = atom<User | null>(null);

export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return { currentUser, setCurrentUser };
};
