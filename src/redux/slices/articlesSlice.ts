import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AticleType } from "../../articleType";

localStorage.setItem('fovoriteSlugs', JSON.stringify([]))

interface Articles {
  articles: AticleType[];
}

const initialState: Articles = {
  articles: [],
};

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<AticleType[]>) => {
      state.articles = action.payload;
    },
    deleteArticleBySlag: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      state.articles = state.articles.filter((item) => item.slug !== slug);
    },
    createNewArticle: (state, action: PayloadAction<AticleType>) => {
      state.articles = [action.payload, ...state.articles];
    },
    editingArticle: (state, action: PayloadAction<AticleType>) => {
      state.articles = state.articles.map(item=> {
			return item.slug === action.payload.slug ? action.payload : item 
		})
    },
  },
});

export const { setArticles, deleteArticleBySlag, createNewArticle, editingArticle } =
  articleSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default articleSlice.reducer;
