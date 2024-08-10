import {create} from 'zustand';
import { createAuthSlice } from './slice/user-slice';

export const useAppStore=create()((...a)=>(
    {

        ...createAuthSlice(...a)
    }
));