import checkMans from '../templates/checkMans.hbs';
import devicesList from '../templates/devicesList.hbs';
import laptopMask from '../image/small_mask.png';
import smartMask from '../image/medium_mask.png';
import phoneMask from '../image/large_mask.png';
import { hbsCountHelper } from './helpers/hbsCountHelper';
import { createContainer } from './helpers/createContainer.js';

export class User {
  constructor(data) {
    this.userCount = 0;
    this.maxLatency = {
      byteCloud: 0,
      objectStorage: 0,
    };
    this.selected = false;
    this.actualStorage = null;
    this.container = null;
    this.name = data.name;
    this.nearestStorage = data.nearestStorage;
    this.position = {
      top: data.top,
      left: data.left,
    };
    this.devices = data.devices;
    this.latency = data.latency;
  }

  renderUser() {
    this.container = createContainer(this.name, 'User', this.position);

    this.container.innerHTML = checkMans({
      name: this.name,
    });

    const radioInputs = this.container.querySelectorAll('.check-man__radio');

    radioInputs.forEach(item =>
      item.addEventListener('change', e => {
        this.userCount = Number(e.currentTarget.value);
        this.selected = true;
        this.renderDevices();
      })
    );
  }

  renderDevices() {
    this.container.innerHTML = devicesList({
      count: hbsCountHelper(this.userCount),
      img: { laptopMask, smartMask, phoneMask },
      devices: this.devices,
    });
  }

  startAnimation() {
    let masks = null;

    masks = this.container.querySelectorAll('.device__mask');
    masks.forEach(mask => {
      mask.classList.remove('is-animated');
      setTimeout(() => {
        const storageName = nameFormating(this.actualStorage);

        const duration = this.latency[storageName][mask.name];

        mask.style.animationDuration = `${duration * 10 + 500}ms`;
        mask.classList.add('is-animated');
      }, 500);
    });
  }

  setUserLatencyDisplay(string) {
    const userLatencyDisplay = this.container.querySelector('.user-latency');
    userLatencyDisplay.textContent = string;
  }

  updateMaxLatency(mainStorageName) {
    const {
      laptop: laptopB,
      smartphone: smartphoneB,
      phone: phoneB,
    } = this.latency[nameFormating(this.actualStorage)];
    const {
      laptop: laptopO,
      smartphone: smartphoneO,
      phone: phoneO,
    } = this.latency[nameFormating(mainStorageName)];

    if ((this.userCount = 1)) {
      this.maxLatency.byteCloud = laptopB;
      this.maxLatency.objectStorage = laptopO;
    }
    if ((this.userCount = 2)) {
      this.maxLatency.byteCloud = Math.max(laptopB, smartphoneB);
      this.maxLatency.objectStorage = Math.max(laptopO, smartphoneO);
    }
    if ((this.userCount = 3)) {
      this.maxLatency.byteCloud = Math.max(laptopB, smartphoneB, phoneB);
      this.maxLatency.objectStorage = Math.max(laptopO, smartphoneO, phoneO);
    }
  }

  removeUser() {
    this.container.remove();
  }
  clearUser() {
    this.userCount = 0;
    this.maxLatency = {
      byteCloud: 0,
      objectStorage: 0,
    };
    this.selected = false;
    this.actualStorage = null;
    this.container = null;
  }
}

function nameFormating(name) {
  const splitName = name.split('-');

  if (splitName.length === 1) return splitName.join('');

  const formatWord = splitName[1]
    .split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('');

  const newName = [splitName[0], formatWord].join('');
  return newName;
}
