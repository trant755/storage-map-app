import { Storage } from './Storage';
import { storagePosition } from './configMap';
import { storagesEl } from './refs';

const allStoragesPositionName = Object.keys(storagePosition);

export const storagesController = {
  storages: createStorages(),
  maxStoragesCount: allStoragesPositionName.length,
  selectedStorages: [],

  renderStorages() {
    this.storages.forEach(storage => {
      storage.renderStorage();
      const storBtn = storage.container.querySelector('.storage__btn');

      storBtn.addEventListener('click', () => {
        if (this.selectedStorages.length < 1) storage.isMain = true;
        this.selectedStorages.push(storage);

        storage.selected = true;
        storage.renderStorageImg();
      });
    });
  },

  removeAllStorages() {
    storagesEl.innerHTML = '';
  },

  clearAllStorages() {
    this.selectedStorages = [];

    this.storages.forEach(storage => storage.clearStorage());
  },

  clearNotSelectedStorages() {
    this.storages.forEach(storage => {
      if (!storage.selected) {
        storage.removeStorage();
      }
    });
  },
};

function createStorages() {
  const storages = [];
  allStoragesPositionName.forEach(storage => {
    storages.push(new Storage(storagePosition[storage]));
  });
  return storages;
}
