import { Engine } from 'mini5-engine';
import SceneList from './scenes/index'

if (process.env.REACT_APP_MODE === Engine.MODE_CLIENT) {
	var game = new Engine(SceneList, 'testScene', Engine.MODE_CLIENT, {});
} else {
	var game = new Engine(SceneList, 'testScene', Engine.MODE_LOCAL, {});
}

export default game;