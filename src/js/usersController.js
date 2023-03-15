import { User } from './User';
import { userPosition } from './configMap';
import { usersEl } from './refs';

const allUsersPositionName = Object.keys(userPosition);

export const usersController = {
  users: createUsers(),
  maxUsersCount: allUsersPositionName.length,
  selectedUsers: [],
  allDevicesNum: 0,

  getSelectedUser() {
    const newUsers = [];
    let newDevicesNum = 0;
    this.users.forEach(user => {
      if (user.selected) {
        newUsers.push(user);
        newDevicesNum += user.userCount;
      }
    });
    this.selectedUsers = newUsers;
    this.allDevicesNum = newDevicesNum;
    return this.selectedUsers;
  },

  clearNotSelectedUsers() {
    this.users.forEach(user => {
      if (!user.selected) {
        user.removeUser();
      }
    });
  },

  startUsersAnimation() {
    this.selectedUsers.forEach(user => {
      user.startAnimation();
    });
  },

  changeUsersLatencyDisplay(type, storageType, targetName) {
    this.selectedUsers.forEach(user => {
      if (!targetName || user.container.dataset.name === targetName) {
        let text =
          type === 'latency'
            ? `latency: ${user.maxLatency[storageType]} `
            : `time: ${user.maxLatency[storageType] * 10} sec`;
        user.setUserLatencyDisplay(text);
      }
    });
  },

  removeUsersLatencyDisplay() {
    this.selectedUsers.forEach(user => {
      user.setUserLatencyDisplay('');
    });
  },

  renderUsers() {
    this.users.forEach(user => user.renderUser());
  },

  removeAllUsers() {
    usersEl.innerHTML = '';
  },

  clearAllUsers() {
    this.selectedUsers = [];
    this.allDevicesNum = 0;
    this.users.forEach(user => user.clearUser());
  },
};

function createUsers() {
  const users = [];
  allUsersPositionName.forEach(user => {
    users.push(new User(userPosition[user]));
  });
  return users;
}
