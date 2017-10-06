/**
 *
 *
 * @copyright 2017 Government of Canada
 * @license MIT
 * @author igboyes
 *
 */

import Request from "superagent";

const accountAPI = {

    get: () => {
        return Request.get("/api/account")
    },

    getSettings: () => {
        return Request.get("/api/account/settings");
    },

    updateSettings: (update) => {
        return Request.patch("/api/account/settings")
            .send(update);
    },

    createAPIKey: (name, permissions) => {
        return Request.post("/api/account/keys")
            .send({
                name,
                permissions
            });
    },

    updateAPIKey: (keyId, permissions) => {
        return Request.patch(`/api/account/keys/${keyId}`)
            .send({
                permissions: permissions
            });
    },

    removeAPIKey: (keyId) => {
        return Request.delete(`/api/account/keys/${keyId}`);
    },

    logout: () => {
        return Request.get("/api/account/logout");
    }
};

export default accountAPI;