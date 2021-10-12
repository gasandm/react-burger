import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { TReduxStore } from '../services/reducers/types';

export const useSelector: TypedUseSelectorHook<TReduxStore> = selectorHook;
  
  // Хук не даст отправить экшен, который ему не знаком
//   export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 