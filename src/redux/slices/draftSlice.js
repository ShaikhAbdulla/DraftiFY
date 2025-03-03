import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDraftToDB, fetchDraftsFromDB, updateDraftInDB, deleteDraftFromDB } from '../../database/draftService';
import { deleteDraft, fetchDrafts, insertDraft, updateDraftStatus, updateDraftt } from '../../database/db';


export const loadDrafts = createAsyncThunk(
  'drafts/load',
  async (_, { rejectWithValue }) => {
    try {
      const drafts = await new Promise((resolve, reject) => {
        fetchDrafts((results) => {
          if (results) {
            resolve(results); 
          } else {
            reject('Failed to fetch drafts');
          }
        });
      });
      return drafts;
    } catch (error) {
      return rejectWithValue('Failed to load drafts: ' + error);
    }
  }
);

export const addDraft = createAsyncThunk('drafts/add', async (draft) => {
  const draftWithMeta = {
    ...draft,
    date: new Date().toLocaleString(),
    profilePic: draft.profilePic,
  };
   insertDraft(draftWithMeta);
  return draftWithMeta;
});

export const updateDraft = createAsyncThunk('drafts/update', async (draft) => {
  updateDraftt(draft);
  return draft;
});

export const deleteDraftFromDBThunk = createAsyncThunk('drafts/delete', async (id) => {
   deleteDraft(id);
  return id;
});

const draftSlice = createSlice({
  name: 'drafts',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDrafts.fulfilled, (state, action) => {
        
        return action.payload;
      })
      .addCase(addDraft.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateDraft.fulfilled, (state, action) => {
        const index = state.findIndex(draft => draft.id === action.payload.id);
        if (index !== -1) {
          state[index] = { ...state[index], ...action.payload };
        }
      })
      .addCase(deleteDraftFromDBThunk.fulfilled, (state, action) => {
        return state.filter(draft => draft.id !== action.payload);
      });
  },
});

export default draftSlice.reducer;
