/**
 * @summary removes a key
 * @param {string} key key of item to remove
 */
function remove(key){
    localStorage.removeItem(key);
}

module.exports = {remove};