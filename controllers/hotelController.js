const { get } = require('../config/axios');

const lists = async (req, res) => {
    const getList = await get();
    console.log(getList, 'list');

    if (getList) {
        return res.status(200).json({
            message: 'hotel listing',
            data: getList
        })
    } else {
        return res.status(500).json({
            message: 'unable to get listing',
        })
    }
}

module.exports = {
    lists
}