import {ChrFlag, CharacterSet} from './roomEscapeInterface';

const createCharacter = (gameScene: Phaser.Scene, characterSet: CharacterSet, myFlag:boolean) => {
  //캐릭터 객체 생성
  const spriteName = characterSet.chrFlag.spriteName;
  characterSet.character = gameScene.matter.add.sprite(characterSet.chrFlag.downX, characterSet.chrFlag.downY, spriteName, undefined, {label: 'character'}).setScale(0.7);
  // characterSet.character = gameScene.matter.add.sprite(100, 100, 'lidiaRed', undefined, {label: 'character'}).setScale(1);
  //캐릭터가 앞을 바라보게 설정한다
  characterSet.character.anims.play(String(`${spriteName}3`), true);
  //characterSet.character.anims.stop();

  //말풍선
  characterSet.chrFlag.msg = gameScene.add.text(characterSet.character.x, characterSet.character.y - 40, "", {
    font: "20px Ycomputer-Regular",
    color: "#33ff33",
    backgroundColor: "#000000",
    align: "center"
  });

  //나의 캐릭터일 경우 표시해준다
  if(myFlag) {
    characterSet.myFlagObject = gameScene.add.image(characterSet.character.x, characterSet.character.y + 35, 'myFlag').setScale(0.2);
  }
}

const updateCharacterMove = (characterSet: CharacterSet, myFlag: boolean, scene: Phaser.Scene|null) => {
  if(characterSet && characterSet.character) {
    //캐릭터의 목표 방향과 실제 캐릭터의 위치를 계산하여 무빙한다
    if(Math.abs(characterSet.chrFlag.downY - characterSet.character.y) >= characterSet.chrFlag.speed || Math.abs(characterSet.chrFlag.downX - characterSet.character.x) >= characterSet.chrFlag.speed) {
      const downY = characterSet.chrFlag.downY;
      const downX = characterSet.chrFlag.downX;
      const curY = characterSet.character.y;
      const curX = characterSet.character.x;
      //두점의 거리를 계산한다
      let y = (downY - curY) / Math.sqrt( Math.pow((downY - curY),2) + Math.pow((downX - curX),2) );
      //y = curY < downY ? y : -y;

      let x = (downX - curX) / Math.sqrt( Math.pow((downY - curY),2) + Math.pow((downX - curX),2) );
      //x = curX < downX ? x : -x;

      characterSet.character.y += y * characterSet.chrFlag.speed;
      characterSet.character.x += x * characterSet.chrFlag.speed;
      
      //캐릭터가 바라보고 있는 방향 설정
      // 1 => 위 , 2 => 오른쪽, 3 => 아래, 4 => 왼쪽
      const curP = characterSet.chrFlag.position;
      let characterP = `${characterSet.chrFlag.spriteName}3`;
      if( y < 0 && Math.abs(y) >= Math.abs(x) ) {
        characterP = `${characterSet.chrFlag.spriteName}1`;
      } else if( x > 0 && Math.abs(y) <= Math.abs(x) ) {
        characterP = `${characterSet.chrFlag.spriteName}2`;
      } else if( y > 0 && Math.abs(y) >= Math.abs(x) ) {
        characterP = `${characterSet.chrFlag.spriteName}3`;
      } else {
        characterP = `${characterSet.chrFlag.spriteName}4`;
      }

      //혹여 애니메이션이 작동되지 않는다면 작동시킨다
      if(!characterSet.character.anims.isPlaying) {
        characterSet.character.anims.play(String(characterP), true);
      }

      //캐릭터가 바라보는 방향이 변경된 경우이다
      if(curP != characterP) {
        characterSet.chrFlag.position = characterP;
        characterSet.character.anims.stop();
        characterSet.character.anims.play(String(characterP), true);
      }

      //말풍선이 함께 무빙
      characterSet.chrFlag.msg?.setX(characterSet.character.x);
      characterSet.chrFlag.msg?.setY(characterSet.character.y - 40);

      if(myFlag && characterSet.myFlagObject) {
        characterSet.myFlagObject.setX(characterSet.character.x);
        characterSet.myFlagObject.setY(characterSet.character.y + 35);
      }

      //내 캐릭터일 경우 카메라 조정
      if(myFlag && scene) {
        //const cam = scene.cameras.main;
        //cam.centerOn(characterSet.character.x, characterSet.character.y);
      }
      
    } else {
      //정지되어 있는 상태
      characterSet.character.anims.stop();
    }

    //채팅내용 동기화
    if(characterSet.chrFlag.msgText) {
      if(characterSet.chrFlag.msgTimer > 0) {
        characterSet.chrFlag.msg?.setText(characterSet.chrFlag.msgText);
        characterSet.chrFlag.msgTimer -= 1;
      } else {
        characterSet.chrFlag.msg?.setText("");
        characterSet.chrFlag.msgTimer = 0;
      }
    }
  }
}

export {
  createCharacter,
  updateCharacterMove
};