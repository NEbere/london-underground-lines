// Third party import
import axios from 'axios'

// Local import
// None

/**
 * Make a GET API request with axios
 * @param { string } url : GET request URL
 * @returns { Object } Promise object from the request
 */

export const makeApiRequest = async (url) => {
    return await axios.get(url)
}
