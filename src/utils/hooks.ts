import {
    TypedUseSelectorHook,
    useSelector as selectorHook
} from 'react-redux';
import { TReduxStore } from '../services/reducers/types';

export const useSelector: TypedUseSelectorHook<TReduxStore> = selectorHook;
