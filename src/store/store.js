import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// CombineReduces - Objeto donde indicamos todos nuestros reducer y usamos para
// pasar como parametro a createStore ya que éste solo recibe un reducer pero de esta
// forma podemos pasarle el reducer que necesitemos en ese momento
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

// CreateStore - fn de Redux para crear nuestro store. En el primer parametro le pasamos
// nuestro objeto anterior y como segundo parametro le pasamos una config para la
// extension Redux de google chrome y dentro de ésta tenemos el middleware thunk
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
