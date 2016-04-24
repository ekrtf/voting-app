import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    // emit the application state every time it changes
    store.subscribe(
        // NB optimizing this could emit the diff only rather
        // than the whole application state
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        // emit the application state to any new connection
        socket.emit('state', store.getState().toJS());

        // listen for client actions
        socket.on('action', store.dispatch.bind(store));
    });
}
