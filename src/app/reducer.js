import userReducer from '../services/auth/authService.js'
import videoReducer from '../services/video/videoServices'
import uiReducer from '../services/ui/uiServices'
import searchReducer from '../services/search/searchService '

export const reducers = {
    user: userReducer,
    video: videoReducer,
    ui: uiReducer,
    search: searchReducer,
};
