import userReducer from '../services/userServices.js'
import videoReducer from '../services/videoServices.js'
import uiReducer from '../services/uiServices.js'
import searchReducer from '../services/searchService .js'

export const reducers = {
    user: userReducer,
    video: videoReducer,
    ui: uiReducer,
    search: searchReducer,
};
