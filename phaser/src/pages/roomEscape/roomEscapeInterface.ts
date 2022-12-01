interface CharacterSheet {
  name: string,
  sumnail: string
}

interface ChrFlag {
  downX: number,
  downY: number,
  speed: number,
  position: String,
  msg: Phaser.GameObjects.Text|null,
  msgText: string|undefined,
  msgTimer: number,
  msgEnterFlag: boolean,
  id: string,
  spriteName: string,
  nick: string,
  nickText: Phaser.GameObjects.Text|null,
}

interface CharacterSet {
  chrFlag: ChrFlag,
  character: Phaser.GameObjects.Sprite|null,
  myFlagObject: Phaser.GameObjects.Image|null
}

interface ChatList {
  nick: string;
  content: string;
  date: string;
}

export type {
  CharacterSheet,
  ChrFlag,
  CharacterSet,
  ChatList
};