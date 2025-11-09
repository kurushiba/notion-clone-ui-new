import Editor from '../components/Editor';
import { TitleInput } from '../components/TitleInput';
import { noteRepository } from '../modules/notes/note.repository';
import { useNoteStore } from '../modules/notes/note.state';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/pages/note-detail.css';

const NoteDetail = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const noteStore = useNoteStore();
  const note = noteStore.getOne(id);

  useEffect(() => {
    fetchOne();
  }, [id]);

  const fetchOne = async () => {
    setIsLoading(true);
    const note = await noteRepository.findOne(id);
    if (note == null) return;
    noteStore.set([note]);
    setIsLoading(false);
  };

  const updateNote = async (
    id: number,
    note: { title?: string; content?: string }
  ) => {
    const updatedNote = await noteRepository.update(id, note);
    if (updatedNote == null) return;
    noteStore.set([updatedNote]);
    return updatedNote;
  };

  if (isLoading) return <div />;
  if (note == null) return <div>note is not existed</div>;

  return (
    <div className='note-detail-container'>
      <div className='note-detail-content'>
        <TitleInput
          initialData={note}
          onTitleChange={(title) => updateNote(id, { title })}
        />
        <Editor
          initialContent={note.content}
          onChange={(content) => updateNote(id, { content })}
        />
      </div>
    </div>
  );
};

export default NoteDetail;
