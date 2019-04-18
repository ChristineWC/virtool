import { get } from "lodash-es";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLinkedJob } from "../../../jobs/actions";
import { getHasRawFilesOnly } from "../../selectors";
import SampleFilesCache from "./Cache";
import SampleFilesMessage from "./LegacyAlert";
import SampleFilesRaw from "./Raw";

const SampleDetailFiles = ({ onGetJob, jobId }) => {
    useEffect(() => {
        if (jobId) {
            onGetJob(jobId);
        }
    }, [jobId]);

    return (
        <div>
            <SampleFilesMessage />
            <SampleFilesRaw />
            <SampleFilesCache />
        </div>
    );
};

const mapStateToProps = state => {
    let jobId;

    if (!getHasRawFilesOnly(state)) {
        jobId = get(state, "samples.detail.update_job.id");
    }

    return {
        jobId
    };
};

const mapDispatchToProps = dispatch => ({
    onGetJob: jobId => {
        dispatch(getLinkedJob(jobId));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SampleDetailFiles);
