import {Map} from 'immutable';

// NB this can be moved to a core module
function setState(state, newState) {
    return state.merge(newState);
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE': return setState(state, action.state);
    }
    return state;
}
