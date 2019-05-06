/**
 * errorLogger: Utility function to log errors to the console
 * @param { string } errorMessage error message
 * @param { any } error error itself. can be object or array, any type.
 */
export const errorLogger = async (errorMessage, error) => {
    return console.error(`${errorMessage}: ${error}`)
}