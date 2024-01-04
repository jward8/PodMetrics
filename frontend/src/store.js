import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    podcasts: [],
    selectedPodcast: null,
    episodes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PODCASTS":
            return { ...state, podcasts: action.payload };
        case "SET_SELECTED_PODCAST":
            return { ...state, selectedPodcast: action.payload };
        case "SET_EPISODES":
            return { ...state, episodes: action.payload };
        default:
            return state;
    }
};

const store = createStore(reducer, composeWithDevTools());

export default store;