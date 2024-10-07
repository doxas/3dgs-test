
import { Core } from './canvas';
import './main.css';

window.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
  const core = new Core(canvas);
  core.setResourceDirectory('./resource/');
  await core.load('train.splat');
  core.start();
}, false);
