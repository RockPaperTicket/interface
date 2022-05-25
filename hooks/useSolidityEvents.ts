import create from 'zustand';
import { EventLog } from '../contracts/types';

export type NotificationWithTime = {
  event: EventLog.EventStructOutput;
  timeStarted: string;
};
interface State {
  gameStartedEventNotifications: NotificationWithTime[];
}

interface StateWithMutation extends State {
  setEventNotifications: (payload: NotificationWithTime[]) => void;
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
