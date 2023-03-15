import storageBtn from '../templates/storageBtn.hbs';
import { createContainer } from './helpers/createContainer';
import circleImg from '../image/circle_filled.png';
import server from '../image/server.png';
import server_ByteCloud from '../image/server_ByteCloud.png';

const storageImgMarkup = isMain => {
  const img = isMain ? server : server_ByteCloud;
  return `<img src=${img} class="storage__img" alt="">`;
};

export class Storage {
  constructor(data) {
    this.isMain = false;
    this.selected = false;
    this.container = null;
    this.name = data.name;
    this.position = {
      top: data.top,
      left: data.left,
    };
  }

  renderStorageImg() {
    this.container.innerHTML = storageImgMarkup(this.isMain);
  }

  removeStorage() {
    this.container.remove();
  }

  clearStorage() {
    this.isMain = false;
    this.selected = false;
    this.container = null;
  }

  renderStorage() {
    this.container = createContainer(this.name, 'Storage', this.position);
    this.container.innerHTML = storageBtn({
      img: circleImg,
    });
  }
}
