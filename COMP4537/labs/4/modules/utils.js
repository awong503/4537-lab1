const getDate = () => {
    const dateNow = new Date(Date.now())
    return dateNow[Symbol.toPrimitive]('default');
}
const createMessage = (queryObj, dateString) => {
    const name =  queryObj.name === undefined ? "Guest" : queryObj.name;
    const message = "Hello " + name + ", Here is the server's current date and time: " + dateString
    return message;
}

exports.getDate = getDate;
exports.createMessage = createMessage;