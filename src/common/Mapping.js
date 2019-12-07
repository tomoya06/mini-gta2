import { DIRECTION_KEY } from './Constants';

export function keyOfAnimationForCharacter(characterKey, animationKey) {
  return `${characterKey}__${animationKey}`;
}

export function valueOfDirectionKey(directionKey) {
  switch (directionKey) {
    case DIRECTION_KEY.DOWN: return 0;
    case DIRECTION_KEY.LEFT: return 1;
    case DIRECTION_KEY.RIGHT: return 2;
    case DIRECTION_KEY.UP: return 3;
    default: return 0;
  }
}

export function nouse() {}
