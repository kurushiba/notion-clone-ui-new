import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { noteRepository } from '../modules/notes/note.repository';
import { useNoteStore } from '../modules/notes/note.state';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/home.css';

export function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const noteStore = useNoteStore();

  const createNote = async () => {
    const newNote = await noteRepository.create({ title });
    noteStore.set([newNote]);
    setTitle('');
    navigate(`/notes/${newNote.id}`);
  };

  return (
    <Card className='home-card'>
      <CardHeader className='home-card-header'>
        <CardTitle className='home-card-title'>
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className='home-card-content'>
        <div className='home-input-container'>
          <input
            className='home-input'
            placeholder='ノートのタイトルを入力'
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button className='home-button' onClick={createNote}>
            <FiPlus size={16} />
            <span>ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
