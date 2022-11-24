import {ChrFlag, CharacterSet} from './roomEscapeInterface';


const serverUrl = 'ws://172.30.1.48:8080/webSocket';
// const serverUrl = 'ws://localhost:8080/webSocket';
let ws: WebSocket|null = null;

//서버에 나의 새로운 캐릭터에 대한 메세지를 전달한다
const callWsCreateCharacter = (setMyCharacterId: Function, resetCharacters: Function, receiveMoveMsg: Function, receiveChatMsg: Function) => {
  if(ws !== null) {
    //연결종료
    ws.close();
  }

  ws = new WebSocket(serverUrl);

  //서버에서 데이터를 전달받았을때 처리
  ws.onmessage = function(msg) {
    const data = JSON.parse(msg.data);
    const flag = data.flag;
    if(flag == 'se') {
      const id = data.msg;
      setMyCharacterId(id);
    } else if(flag == 're') {
      //서버에서 부여받은 메세지 처리
      resetCharacters(data.characterList);
    } else if(flag == 'move') {
      receiveMoveMsg(data);
    } else if(flag == 'msg') {
      receiveChatMsg(data);
    }
  }
}

//캐릭터들 현황에 대한 리셋을 요청한다
const callWsResetList = (data: object) => {
  if(ws !== null) {
    ws.send(JSON.stringify(data));
  }
}

//사용자가 채팅을 입력했을때 전달한다.
const callWsSendChatMsg = (msg: string, id: string, nick: string) => {
  if(ws !== null) {
    const param = {
      flag: 'msg',
      msg: msg,
      id: id,
      nick: nick
    };
    ws.send(JSON.stringify(param));
  }
}

//사용자가 움직였을때 처리
const callWsMoveCharacterMsg = (param: object) => {
  if(ws !== null) {
    ws.send(JSON.stringify(param));
  }
}

export {
  callWsCreateCharacter,
  callWsResetList,
  callWsSendChatMsg,
  callWsMoveCharacterMsg
};