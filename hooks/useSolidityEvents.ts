import create from 'zustand';
import { EventLog } from '../contracts/types';

interface State {
  gameStartedEventNotifications: EventLog.EventStructOutput[];
}

interface StateWithMutation extends State {
  setEventNotifications: (payload: EventLog.EventStructOutput[]) => void;
}

const initialState: State = {
  gameStartedEventNotifications: [],
};

export const useSolidityEvents = create<StateWithMutation>((set) => ({
  ...initialState,
  setEventNotifications: (payload) => {
    set((state) => ({ ...state, gameStartedEventNotifications: payload }));
  },
}));
