import { mapEl, byteCloudList, objectStorageList } from './refs';
import tableSection from '../templates/tableSection.hbs';
import resultTablesItem from '../templates/resultTablesItem.hbs';

export const tableController = {
  section: null,
  streamingQualityArr: [
    '360p',
    '480p',
    '720p HD',
    '1080p Full HD',
    '2K/1440p QHD',
    '4K/2160p Ultra HD',
  ],

  renderTable(users) {
    this.section = createTablesSection();

    const byteCloudList = document.getElementById('ByteCloudList');
    const objectStorageList = document.getElementById('ObjectStorageList');

    users.forEach(user => {
      const byteCloudData = {
        name: nameFormating(user.name),
        latency: user.maxLatency.byteCloud,
        downloadTime: user.maxLatency.byteCloud * 10,
        rating: getRating(user.maxLatency.byteCloud),
        streamingQuality:
          this.streamingQualityArr[getRating(user.maxLatency.byteCloud)],
      };
      const objectStorageData = {
        name: nameFormating(user.name),
        latency: user.maxLatency.objectStorage,
        downloadTime: user.maxLatency.objectStorage * 10,
        rating: getRating(user.maxLatency.objectStorage),
        streamingQuality:
          this.streamingQualityArr[getRating(user.maxLatency.objectStorage)],
      };

      byteCloudData['rating' + getRating(user.maxLatency.byteCloud)] =
        'selected';
      objectStorageData['rating' + getRating(user.maxLatency.objectStorage)] =
        'selected';

      byteCloudList.insertAdjacentHTML(
        'beforeend',
        resultTablesItem(byteCloudData)
      );
      objectStorageList.insertAdjacentHTML(
        'beforeend',
        resultTablesItem(objectStorageData)
      );
    });
  },

  removeTable() {
    this.section.remove();
  },
};

function createTablesSection() {
  mapEl.insertAdjacentHTML('beforeend', tableSection());

  return mapEl.querySelector('.table');
}

function getRating(latency) {
  let rating = 0;

  if (latency < 425) rating = 1;
  if (latency < 340) rating = 2;
  if (latency < 255) rating = 3;
  if (latency < 170) rating = 4;
  if (latency < 85) rating = 5;

  return rating;
}

function nameFormating(name) {
  const splitName = name.split('-');

  const formatWord = splitName[0]
    .split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('');
  let newName = formatWord;

  if (splitName.length > 1) {
    newName = [formatWord, splitName[1]].join(' ');
  }
  return newName;
}
