import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  selectedTools: Set<string>;
  isReasoning: boolean;
}

interface AppActions {
  setSelectedTools: (tools: Set<string>) => void;
  setIsReasoning: (isReasoning: boolean) => void;
}

const initialState: AppState = {
  selectedTools: new Set(),
  isReasoning: false,
};

const useStore = create<AppState & AppActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setSelectedTools: (tools) =>
        set((state) => ({ ...state, selectedTools: tools })),
      setIsReasoning: (isReasoning) =>
        set((state) => ({ ...state, isReasoning })),
    }),
    { name: 'tars' },
  ),
);

export default useStore;
