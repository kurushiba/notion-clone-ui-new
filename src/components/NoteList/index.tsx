import { NoteItem } from './NoteItem';

export function NoteList() {
  // 展開状態のモック（UI確認時に変更可能）
  const expandedNotes = new Map<number, boolean>();
  // expandedNotes.set(2, true); // タスク一覧を展開する場合

  // 選択中のノートID（UI確認時に変更可能）
  const selectedNoteId = 1;

  return (
    <>
      <div>
        <NoteItem />
      </div>
    </>
  );
}
