import React from "react";
import { Icon, Loader } from "../../base";

export const AnalysisItemRightIcon = ({ canModify, onRemove, ready }) => {
    if (ready) {
        if (canModify) {
            return <Icon name="trash" bsStyle="danger" onClick={onRemove} style={{ fontSize: "17px" }} />;
        }

        return null;
    }

    return <Loader size="14px" color="#3c8786" />;
};