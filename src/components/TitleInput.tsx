import { Note } from '../modules/notes/note.entity';
import { useState } from 'react';

interface TitleInputProps {
  initialData: Note;
  onTitleChange: (val: string) => void;
}

export function TitleInput({ initialData, onTitleChange }: TitleInputProps) {
  const [value, setValue] = useState(initialData.title ?? '無題');

  const handleInputChange = (value: string) => {
    setValue(value);
    onTitleChange(value);
  };

  return (
    <div className='title-input-container'>
      <textarea
        className='title-input'
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}
