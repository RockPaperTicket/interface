import create from 'zustand';

type AlertStatus = 'error' | 'info' | 'warning' | 'success';

interface State {
  message: string;
  status: AlertStatus;
  isOpen: boolean;
}

interface StateWithMutation extends State {
  openAlert: (message: string, status?: AlertStatus) => void;
}

const initialState: State = {
  message: '',
  status: 'error',
  isOpen: false,
};

let debouncedCallback: any;

export const useAlert = create<StateWithMutation>((set) => ({
  ...initialState,
  openAlert: (message, status) => {
    status = status ?? 'error';
    set((state) => ({ ...state, message, status, isOpen: true }));
    clearTimeout(debouncedCallback);
    debouncedCallback = setTimeout(() => {
      set((state) => ({ ...state, isOpen: false }));
    }, 1000);
  },
}));
