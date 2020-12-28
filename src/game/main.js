import { Engine } from 'mini5-engine';
import SceneList from './scenes/index'

var game = new Engine(SceneList, 'testScene', {}, null, process.env.REACT_APP_MODE);

export default game;
// game.start();