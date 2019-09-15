## PUBSUB

## Usage
```js
import PubSub from '@m2g/pubsub';

const pubsub = new PubSub();

pubsub.subscribe('info', (data) => {
  console.log(data);
});

pubsub.publish('info', {
  name: 'foo',
  password: 'bar'
});
```

## METHODS

### `pubsub.subscribe(eventName, listener([data]))`
### `pubsub.subscribeOnce(eventName, listener([data]))`
### `pubsub.publish(eventName, listener([data]))`
### `pubsub.unsubscribe(eventName, listener)`
### `pubsub.unsubscribes()`

## License
[MIT](https://tldrlegal.com/license/mit-license)