import {createContext, useState, useEffect} from 'react';
import axiosClient from '../axiosClient';
import axios from 'axios';

export interface ContextType{
  isAuthorized: boolean;
  isLoading: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ContextType>({
  isAuthorized: false,
  isLoading: true,
  setIsAuthorized: () => false
});

const AuthProvider = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
    </>
  )
}

export default AuthProvider
