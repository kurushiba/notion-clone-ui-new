import { FC } from 'react';
import { Item } from './Item';
import { NoteList } from '../NoteList';
import UserItem from './UserItem';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useNoteStore } from '../../modules/notes/note.state';
import { noteRepository } from '../../modules/notes/note.repository';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSearchButtonClicked: () => void;
};

const SideBar: FC<Props> = ({ onSearchButtonClicked }) => {
  const navigate = useNavigate();
  const noteStore = useNoteStore();

  const createNote = async () => {
    const newNote = await noteRepository.create({});
    noteStore.set([newNote]);
    navigate(`/notes/${newNote.id}`);
  };

  return (
    <>
      <aside className='sidebar'>
        <div>
          <div>
            <UserItem />
            <Item
              label='検索'
              icon={FiSearch}
              onClick={onSearchButtonClicked}
            />
          </div>
          <div className='sidebar-spacer'>
            <NoteList />
            <Item label='ノートを作成' icon={FiPlus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className='sidebar-placeholder'></div>
    </>
  );
};

export default SideBar;
