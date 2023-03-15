import { usersEl, storagesEl } from '../refs';

const containerMarkup = (id, name, className, position) =>
  `<div id=${id} data-name=${name} class=${className} style="top: ${position.top}; left: ${position.left}"></div>`;

export function createContainer(name, type, position) {
  const id = name + type + 'Container';
  const className = type.toLowerCase() + '-container';
  let parentEl = null;
  if (type === 'User') {
    parentEl = usersEl;
  }

  if (type === 'Storage') {
    parentEl = storagesEl;
  }
  parentEl.insertAdjacentHTML(
    'beforeend',
    containerMarkup(id, name, className, position)
  );

  return document.getElementById(id);
}
