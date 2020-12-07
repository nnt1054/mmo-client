import { Engine } from 'mini5-engine';
import SceneList from './scenes/index'

var game = new Engine(SceneList, 'area03', {});

export default game;
// game.start();