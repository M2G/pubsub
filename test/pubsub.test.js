import Pubsub from '../src/js/index';

const pubsub = new Pubsub();

/*
subscribe
subscribeOnce
unsubscribe
unsubscribes
publish
 */

test('test publish and subscribe', () => {
  pubsub.subscribe('info', data => {
    expect(data).toEqual({
      name: 'foo',
      password: 'bar'
    });
  });

  pubsub.publish('info', {
    name: 'foo',
    password: 'bar'
  });
});

test('test publish and subscribeOnce (simulate two click)', () => {
  const array = [];
  const div = document.createElement('div');
  div.classList.add('wrapper');
  document.body.appendChild(div);

  // subscribeOnce :
  // first click = subscribe and unsubscribe
  // second click = empty (cannot subscribe)
  div.addEventListener('click', () => {
    pubsub.subscribeOnce('info', data => {
      array.push(data);
      expect(array.length).toEqual(1);
    });
  });

  div.click(); // 1 click (subscribe and unsubscribe)
  div.click(); // 2 click (empty)

  pubsub.publish('info', {
    name: 'foo',
    password: 'bar'
  });
});

test('test unsubscribes', () => {
  const div = document.createElement('div');
  div.classList.add('wrapper');
  document.body.appendChild(div);

  div.addEventListener('click', () => {
    pubsub.unsubscribes(); // This event: info does not exist
    expect(pubsub.events).toEqual({});
  });

  div.click();

  pubsub.publish('info', {
    name: 'foo',
    password: 'bar'
  });
});
