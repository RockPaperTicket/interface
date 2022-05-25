import create from 'zustand';
import { EventLog } from '../contracts/types';

interface State {
  openEvents: EventLog.EventStructOutput[];
  registeredEvents: EventLog.EventStructOutput[];
  createdEvents: EventLog.EventStructOutput[];
}

interface StateWithMutation extends State {
  setOpenEvents: (payload: EventLog.EventStructOutput[]) => void;
  setRegisteredEvents: (payload: EventLog.EventStructOutput[]) => void;
  setCreatedEvents: (payload: EventLog.EventStructOutput[]) => void;
}

const initialState: State = {
  openEvents: [],
  registeredEvents: [],
  createdEvents: [],
};

export const useEventLogs = create<StateWithMutation>((set) => ({
  ...initialState,
  setOpenEvents: (payload) => {
    set((state) => ({ ...state, openEvents: payload }));
  },
  setRegisteredEvents: (payload) => {
    set((state) => ({ ...state, registeredEvents: payload }));
  },
  setCreatedEvents: (payload) => {
    set((state) => ({ ...state, createdEvents: payload }));
  },
}));
