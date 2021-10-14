import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook
} from 'react-redux';
import { TReduxStore } from '../services/reducers/types';
import { AppDispatch } from '../index';

export const useSelector: TypedUseSelectorHook<TReduxStore> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
