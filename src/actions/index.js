/** action handler for readable
 * 
 */

import * as constants from '../constants';

export function updateTime(newtime) {
    return {
        type : constants.UPDATE_TIME,
        time : newtime
    }
}

export const resetErrorMessage = () => ({
    type : constants.RESET_ERROR_MESSAGE
});