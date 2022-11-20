import { useObserver } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import combindStore from '../../store/combindStore';
import { playerSprite } from './roomEscapeConstant';
import {resourcePath} from './roomEscapeConstant';

function RoomEscape() {
  const { RoomEscapeStore } = combindStore();
  const gameReadyFlag = RoomEscapeStore.gameReadyFlag;
  const chatList = RoomEscapeStore.chatList;
  const [selectCharacter, setSelectCharacter] = useState('');
  const [selectNick, setSelectNick] = useState('');

  useEffect(() => {
    //새롭게 생성될 경우 세팅한다
    RoomEscapeStore.insertGameReadyFlag(false, '', '');
    setSelectNick('');
    setSelectCharacter('');
  }, []);

  useEffect(() => {
    console.log('채팅리스트 변경');
  }, [chatList]);

  function insertNickName(e: any) {
    setSelectNick(e.target.value.trim());
  }

  function clickCharacter(name: any) {
    setSelectCharacter(name);
  }

  function createGameCharacter() {
    if(!selectCharacter) {
      alert('캐릭터를 선택하십시오');
    } else if(!selectNick) {
      alert('닉네임을 입력하십시오');
    } else {
      RoomEscapeStore.insertGameReadyFlag(true, selectCharacter, selectNick);
      setSelectNick('');
      setSelectCharacter('');
    }
  }

  return useObserver(() => (
    <div>
      <div id="RoomEscapeWrap" className={`${gameReadyFlag ? '' : 'display_none'}`}>
        <div id="RoomEscapeGameDiv">
        </div>
        <div id="RoomEscapeGameChatArea" className="customscroll">
          {
            chatList.map((item) => {
              return (
                <>
                  <p>
                    {`${item.nick}(${item.date}) :`}<br />
                    {`${item.content}`}
                  </p>
                  <hr />
                </>
              )
            })
          }
        </div>
      </div>

      <div id="RoomEscapeGameReadyArea" className={`${gameReadyFlag ? 'display_none' : ''}`}>
        <div className='RoomEscapeCharacterSelectPopup'>
          <p className='RoomEscapeCharacterSelectPopupQuestion1'>
            원하는 캐릭터를 선택하세요
          </p>
          <div className='RoomEscapeCharacterSelectList customscroll'>
            {
              playerSprite.map((character) => {
                return (
                  <div className={`characterItem ${selectCharacter === character.name ? 'characterSelectBorder' : ''}`} onClick={() => {clickCharacter(`${character.name}`);}}>
                    <img src={`/phaser/resource/${resourcePath.playerSpritePath}/${character.sumnail}.png`} alt={`${character.name}`} />
                  </div>
                );
              })
            }
          </div>
          <p className='RoomEscapeCharacterSelectPopupQuestion2'>
            닉네임을 입력하세요
          </p>
          <div className='RoomEscapeCharacterSelectPopupQuestion2AnswerArea'>
            <input type='text' maxLength={7} className="RoomEscapeCharacterSelectPopupQuestion2input" value={selectNick} onChange={(e) => {insertNickName(e);}}/>
            <button className="RoomEscapeCharacterSelectPopupQuestion2Btn" onClick={() => {createGameCharacter();}}>생성</button>
          </div>
        </div>
      </div>
    </div>
  ));
}

export default RoomEscape;