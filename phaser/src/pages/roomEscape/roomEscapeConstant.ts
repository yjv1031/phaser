import {CharacterSheet} from './roomEscapeInterface';

const playerSprite: Array<CharacterSheet> = [
  {
    name: 'lidia',
    sumnail: 'lidia_sum'
  },
  {
    name: 'lidiaRed',
    sumnail: 'lidiaRed_sum'
  },
];

const resourcePath: any = {
  playerSpritePath: 'player',
  objectPath: 'object'
}

export {
  playerSprite,
  resourcePath
};