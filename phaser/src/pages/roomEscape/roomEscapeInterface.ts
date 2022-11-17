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
  spriteName: string
}

interface CharacterSet {
  chrFlag: ChrFlag,
  character: Phaser.GameObjects.Sprite|null
}

export type {
  ChrFlag,
  CharacterSet
};