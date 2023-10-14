import { createContext } from 'react';

export const SettingsContext = createContext(new Map<string, any>());
export const SettingsDispatchContext = createContext(null);
