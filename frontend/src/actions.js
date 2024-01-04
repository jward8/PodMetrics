export const SET_PODCASTS = 'SET_PODCASTS';

export const setPodcasts = (podcasts) => { 
    return { 
        type: SET_PODCASTS, 
        payload: podcasts 
    };
}