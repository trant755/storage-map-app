export const conectionController = {
  selectedUsers: [],
  mainStorageName: '',
  storagesName: [],
  ByteCloudArc: [],
  ObjectStorageArc: [],

  analysisReceivedInformation(users, storages) {
    this.selectedUsers = users;
    storages.forEach(storage => {
      if (storage.isMain) this.mainStorageName = storage.name;
      this.storagesName.push(storage.name);
    });

    this.selectedUsers.forEach(user => {
      let imgNameNoDevice = `arc_${this.mainStorageName}_${user.name}_`;

      this.ObjectStorageArc = [
        ...this.ObjectStorageArc,
        ...getImgNames(user.userCount, imgNameNoDevice),
      ];

      user.actualStorage = user.nearestStorage.find(name =>
        this.storagesName.includes(name)
      );

      imgNameNoDevice = `arc_${user.actualStorage}_${user.name}_`;

      this.ByteCloudArc = [
        ...this.ByteCloudArc,
        ...getImgNames(user.userCount, imgNameNoDevice),
      ];

      user.updateMaxLatency(this.mainStorageName);
    });
  },

  getByteCloudArcImg(img) {
    const ByteCloudArcImg = this.ByteCloudArc.map(
      name => `url(${img[name]})`
    ).join(', ');

    return ByteCloudArcImg;
  },

  getObjectStorageArcImg(img) {
    this.selectedUsers.forEach(user => {
      user.actualStorage = this.mainStorageName;
    });

    const ObjectStorageArcImg = this.ObjectStorageArc.map(
      name => `url(${img[name]})`
    ).join(', ');

    return ObjectStorageArcImg;
  },

  clearController() {
    this.selectedUsers = [];
    this.mainStorageName = '';
    this.storagesName = [];
    this.ByteCloudArc = [];
    this.ObjectStorageArc = [];
  },
};

function getImgNames(userCount, nameNoDevice) {
  let imgNames = [];

  if (userCount >= 1) {
    imgNames.push(nameNoDevice + 'small');
  }
  if (userCount >= 2) {
    imgNames.push(nameNoDevice + 'medium');
  }
  if (userCount >= 3) {
    imgNames.push(nameNoDevice + 'large');
  }

  return imgNames;
}
