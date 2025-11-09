import api from '../../lib/api';
import { Note } from './note.entity';

export const noteRepository = {
  /**
   * ノート作成
   */
  async create(params: { title?: string; parentId?: number }): Promise<Note> {
    const response = await api.post('/notes', {
      title: params.title,
      parentId: params.parentId,
    });
    return new Note(response.data);
  },
  /**
   * ノート一覧取得・検索 (親IDとキーワードでフィルタリング可能)
   */
  async find(options?: {
    parentDocumentId?: number;
    keyword?: string;
  }): Promise<Note[]> {
    const params: any = {};
    if (options?.parentDocumentId !== undefined) {
      params.parentId = options.parentDocumentId;
    }
    if (options?.keyword) {
      params.keyword = options.keyword;
    }

    const response = await api.get('/notes', { params });
    console.log(response.data);
    return response.data.notes.map((data: any) => new Note(data));
  },

  /**
   * 単一ノート取得
   */
  async findOne(id: number): Promise<Note | null> {
    try {
      const response = await api.get(`/notes/${id}`);
      return new Note(response.data);
    } catch (error) {
      return null;
    }
  },
  /**
   * ノート更新
   */
  async update(
    id: number,
    note: { title?: string; content?: string }
  ): Promise<Note> {
    const response = await api.patch(`/notes/${id}`, note);
    return new Note(response.data);
  },
  /**
   * ノート削除 (子ノートも再帰的に削除)
   */
  async delete(id: number): Promise<boolean> {
    await api.delete(`/notes/${id}`);
    return true;
  },
};
