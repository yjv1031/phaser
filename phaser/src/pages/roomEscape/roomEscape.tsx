import { useObserver } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import { RoomEscapeStore } from '../../store/roomEscapeStore';

function RoomEscape() {
  const roomEscapeStore = RoomEscapeStore;

  useEffect(() => {
    roomEscapeStore.handleCanvas();
  }, []);

  return useObserver(() => (
    <div id="RoomEscapeGameDiv">
        
    </div>
  ));
}

export default RoomEscape;