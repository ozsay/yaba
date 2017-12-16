import { UPDATE_STATS } from '../actions/types';

export default function (state = null, { type, payload }) {
    if (type === UPDATE_STATS) {
        return payload;
    }

    return state;
}
