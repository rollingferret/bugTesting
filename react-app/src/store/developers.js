const ADD_DEV = 'developers/ADD_DEV';
const EDIT_DEV = 'developers/EDIT_DEV';
const REMOVE_DEV = 'developers/REMOVE_DEV';
const LOAD_DEVS = 'developers/LOAD_DEVS'

const loadAllDevs = (devs) => ({
    type: LOAD_DEVS,
    devs
})

const addDev = (dev) => ({
    type: ADD_DEV,
    dev
})

const editDev = (dev) => ({
    type: EDIT_DEV,
    dev
})

const remDev = (dev) => ({
    type: REMOVE_DEV,
    dev
})

//add dev
export const addNewDev = (name, icon, bio, city, state, skills) => async dispatch => {
    const response = await fetch(`/api/developers/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon, bio, city, state, skills })
    });
        
        const newDev = await response.json();
        if (newDev?.errors) return newDev
        dispatch(addDev(newDev))
        return newDev
    

}
// edit dev
export const updateDev = (id, name, icon, bio, city, state, skills) => async dispatch => {
    const response = await fetch(`/api/developers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, icon, bio, city, state, skills })
    });
    if (response.ok) {
        const editDeveloper = await response.json()
        if (editDeveloper?.errors) return editDeveloper
        dispatch(editDev(editDeveloper))
        return editDeveloper
    }
}

// get all
export const allDevs = () => async dispatch => {
    const response = await fetch(`/api/developers/`, { method: 'GET' });
    if (response.ok) {
        const devList = await response.json();
        dispatch(loadAllDevs(devList['developers']));
        return devList['developers'];
    }
    // return response;
};

export const deleteDev = (dev) => async dispatch => {
    const response = await fetch(`/api/developers/${dev.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const delDeveloper = await response.json();
        dispatch(remDev(dev))
        return delDeveloper
    }

}


//DEVS REDUCER

const initialState = {}

const devReducer = (state = initialState, action) => {
    let newState = { ...state }

    switch (action.type) {
        case LOAD_DEVS:
            action.devs.forEach(dev => {
                newState[dev.id] = dev;
            })
            return newState;

        case ADD_DEV:
            newState[action.dev.id] = action.dev;
            return newState;

        case EDIT_DEV:
            newState[action.dev.id] = action.dev;
            return newState
        case REMOVE_DEV:
            delete newState[action.dev.id]
            return newState
        default:
            return state;

    }

}

export default devReducer;
