import express from 'express';
import path from 'path';
import morgan from 'morgan';
import SocketIO from 'socket.io';
import makeStore from './store';

const DIST  = path.join(__dirname, '../../client/dist');
const INDEX = path.join(__dirname, '../../client/dist/index.html');
const DATA  = path.join(__dirname, '../data/entries.json');

class Server {
    constructor() {
        this.port = process.env.port || 8000;
        this.ip   = process.env.ip   || 'localhost';

        this.server = express();
        this.store  = makeStore();
        this.io     = new SocketIO();
    }

    init() {
        this.openSocket();
        this.createRoutes();

        this.server.use(express.static(DIST));
        this.server.use(morgan('combined'));

        this.store.dispatch({ type: 'SET_ENTRIES', entries: require(DATA) });
        this.store.dispatch({type: 'NEXT'});
    }

    openSocket() {
        this.io.attach(8090);

        this.store.subscribe(() => {
            this.io.emit('state', this.store.getState().toJS());
        });

        this.io.on('connection', (socket) => {
            socket.emit('state', this.store.getState().toJS());
            socket.on('action', this.store.dispatch.bind(this.store));
        });
    }

    createRoutes() {
        this.server.get('/', (req, res) => { res.sendFile(INDEX) });
    }

    start() {
        this.server.listen(this.port, this.ip, () => {
            console.log(`Server running on ${ this.ip }:${ this.port }`);
        });
    }
}

let app = new Server();
app.init();
app.start();
