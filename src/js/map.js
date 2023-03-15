import { mapEl, stepTitle, stepBtn, mapArc } from './refs.js';
import { usersController } from './usersController.js';
import { storagesController } from './storagesControler.js';
import { conectionController } from './conectionController.js';
import img from '../image/*.png';
import { tableController } from './tableController.js';

function renderMap() {
  stepTitle.textContent =
    'Where are your users? Choose the number for every region.';
  stepBtn.textContent = '';
  stepBtn.removeEventListener('click', startAnimation);
  choosingUserLocation();
}

function choosingUserLocation() {
  mapEl.addEventListener('change', userStepHandler);
  usersController.renderUsers();
}

function choosingStorageLocation() {
  usersController.clearNotSelectedUsers();
  stepBtn.removeEventListener('click', choosingStorageLocation);
  mapEl.removeEventListener('change', userStepHandler);

  mapEl.addEventListener('click', storageStepHandler);
  stepBtn.textContent = '';

  storagesController.renderStorages();
}

function startAnimation() {
  storagesController.clearNotSelectedStorages();
  mapEl.removeEventListener('click', storageStepHandler);

  stepBtn.textContent = '';

  conectionController.analysisReceivedInformation(
    usersController.selectedUsers,
    storagesController.selectedStorages
  );

  animationListenerHandler();
}

function renderResultsTable() {
  usersController.removeAllUsers();
  storagesController.removeAllStorages();
  renderConectionArc('none');
  stepBtn.removeEventListener('click', startAnimation);

  tableController.renderTable(usersController.selectedUsers);

  usersController.clearAllUsers();
  storagesController.clearAllStorages();
  conectionController.clearController();

  stepTitle.textContent = 'Do you want to';
  stepBtn.textContent = 'start again?';

  stepBtn.addEventListener('click', function handler() {
    stepBtn.removeEventListener('click', startAnimation);

    tableController.removeTable();
    renderMap();
    this.removeEventListener('click', handler);
  });
}

function userStepHandler() {
  const selected = usersController.getSelectedUser();
  const maxUsers = usersController.maxUsersCount;

  userStepSetBtn(selected);

  stepBtn.addEventListener('click', choosingStorageLocation);

  if (selected.length === maxUsers) {
    choosingStorageLocation();
  }
}

function storageStepHandler() {
  const selected = storagesController.selectedStorages;
  const maxStorages = storagesController.maxStoragesCount;

  storageStepSetBtn(selected);

  stepBtn.addEventListener('click', startAnimation);

  if (selected.length === maxStorages) {
    startAnimation();
  }
}

function animationListenerHandler() {
  renderConectionArc(conectionController.getByteCloudArcImg(img));
  usersController.startUsersAnimation();
  usersController.changeUsersLatencyDisplay('latency', 'byteCloud');

  let animationCounter = 0;
  let animationStage = 'byteCloud';

  mapEl.onanimationend = e => {
    animationCounter += 1;
    const animationTargetName =
      e.target.closest('.user-container').dataset.name;

    if (animationStage === 'byteCloud') {
      usersController.changeUsersLatencyDisplay(
        'time',
        'byteCloud',
        animationTargetName
      );
    }
    if (animationStage === 'objectStorage') {
      usersController.changeUsersLatencyDisplay(
        'time',
        'objectStorage',
        animationTargetName
      );
    }
    if (animationCounter === usersController.allDevicesNum) {
      if (animationStage === 'byteCloud') {
        setTimeout(() => {
          renderConectionArc(conectionController.getObjectStorageArcImg(img));

          animationStage = 'objectStorage';
          usersController.startUsersAnimation();
          usersController.changeUsersLatencyDisplay('latency', 'objectStorage');
        }, 1000);
      }
      if (animationStage === 'objectStorage') {
        setTimeout(() => {
          usersController.removeUsersLatencyDisplay();
          renderResultsTable();
        }, 1000);
      }
      animationCounter = 0;
    }
  };
}

function userStepSetBtn(selected) {
  if (selected.length < 1) return;
  stepBtn.textContent = 'Next';
}

function storageStepSetBtn(selected) {
  if (selected.length < 1) return;
  stepTitle.textContent =
    'Choose minimum two additionals spots for ByteCloud and press';
  stepBtn.textContent = 'Start';
  stepBtn.disabled = false;

  if (selected.length > 2) return;
  stepBtn.disabled = true;
}

function renderConectionArc(imgUrl) {
  mapArc.style.backgroundImage = imgUrl;
}

renderMap();
