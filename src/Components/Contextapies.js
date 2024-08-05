import { useContext } from 'react';
import { DataContext } from './ContextApi';

export const useData = () => {
  return useContext(DataContext);
};

