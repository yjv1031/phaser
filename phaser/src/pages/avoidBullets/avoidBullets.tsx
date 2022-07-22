import { useObserver } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import { AvoidBulletsStore } from '../../store/avoidBulletsStore';

function AvoidBullets() {
  const avoidBulletsStore = AvoidBulletsStore;

  useEffect(() => {
    avoidBulletsStore.handleCanvas();
  }, []);

  return useObserver(() => (
    <div id="AvoidBulletsGameDiv">
        
    </div>
  ));
}

export default AvoidBullets;