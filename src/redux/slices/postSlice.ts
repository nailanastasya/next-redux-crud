import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial State
const initialState: any[] = [
  { id: 1, title: "Post 1", description: "Description of Post 1" },
  { id: 2, title: "Post 2", description: "Description of Post 2" },
  { id: 3, title: "Post 3", description: "Description of Post 3" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Menambahkan post baru
    addPost: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newPost = action.payload;
      const newId = state.length > 0 ? state[state.length - 1].id + 1 : 1; // Pastikan ID unik
      state.push({ id: newId, ...newPost }); // Tambahkan ke array
    },

    // Mengupdate post yang ada berdasarkan ID
    updatePost: (state, action: PayloadAction<{ id: number; title: string; description: string }>) => {
      const { id, title, description } = action.payload;
      const postIndex = state.findIndex((post: any) => post.id === id);
      if (postIndex !== -1) {
        state[postIndex].title = title;
        state[postIndex].description = description;
      }
    },

    // Menghapus post berdasarkan ID
    deletePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const index = state.findIndex((post: any) => post.id === postId);
      if (index !== -1) {
        state.splice(index, 1); // Menghapus item berdasarkan index
      }
    },
  },
});

// Ekspor Reducers dan Selector
export const { addPost, updatePost, deletePost } = postsSlice.actions;

export const selectPostById = (state: any, postId: number) =>
  state.posts.find((post: any) => post.id === postId);

export default postsSlice.reducer;
