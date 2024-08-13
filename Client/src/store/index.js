import {create} from 'zustand';
import { createAuthSlice } from './slice/user-slice';
import { createChatSlice } from './slice/chat-slice';

export const useAppStore=create()((...a)=>(
    {

        ...createAuthSlice(...a),
        ...createChatSlice(...a)
    }
));