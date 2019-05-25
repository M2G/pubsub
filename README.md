## PUBSUB

## Usage
```js
const pubsub = new PubSub();

pubsub.subscribe('info', (data) => {
    console.log(data);
});

pubsub.publish('info', {
    name: 'foo',
    password: 'bar'
});
```

## API

### `pubsub.subscribe(eventName, listener([data]))`
### `pubsub.subscribeOnce(eventName, listener([data]))`
### `pubsub.publish(eventName, listener([data]))`
### `pubsub.unsubscribe(eventName, listener)`
### `pubsub.unsubscribes()`

## License
[MIT](https://tldrlegal.com/license/mit-license)