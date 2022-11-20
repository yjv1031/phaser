import { todo } from './todo';
import { todo2 } from './todo2';
import { RoomEscapeStore } from './roomEscapeStore';

const combindStore = () => ({ 
    todo,
    todo2,
    RoomEscapeStore
});

export default combindStore;