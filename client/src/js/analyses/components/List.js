import React from "react";
import { map, sortBy, forEach } from "lodash-es";
import { connect } from "react-redux";
import { Alert, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routerLocationHasState } from "../../utils";

import { findAnalyses } from "../actions";
import { getCanModify } from "../../samples/selectors";
import { Icon, NoneFound, Flex, FlexItem } from "../../base/index";
import CreateAnalysis from "./Create";
import AnalysisItem from "./Item";
import AnalysesToolbar from "./Toolbar";

export class AnalysesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleFilter = e => {
        this.props.onFilter(this.props.sampleId, e.target.value);
    };

    render() {

        // The content that will be shown below the "New Analysis" form.
        let listContent;

        if (this.props.analyses.length) {
            // The components that detail individual analyses.
            listContent = map(sortBy(this.props.analyses, "created_at").reverse(), (document, index) => (
                <AnalysisItem key={index} {...document} />
            ));
        } else {
            listContent = <NoneFound noun="analyses" noListGroup />;
        }

        let hmmAlert;

        if (!this.props.hmms.status.installed) {
            hmmAlert = (
                <Alert bsStyle="warning">
                    <Flex alignItems="center">
                        <Icon name="info-circle" />
                        <FlexItem pad={5}>
                            <span>The HMM data is not installed. </span>
                            <Link to="/hmm">Install HMMs</Link>
                            <span> to use in further NuV analyses.</span>
                        </FlexItem>
                    </Flex>
                </Alert>
            );
        }

        return (
            <div>
                {hmmAlert}

                <AnalysesToolbar />

                <ListGroup>{listContent}</ListGroup>

                <CreateAnalysis
                    id={this.props.detail.id}
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    onSubmit={this.props.onAnalyze}
                    hasHmm={!!this.props.hmms.status.installed}
                    refIndexes={this.props.indexes}
                    userId={this.props.userId}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  showCreate: routerLocationHasState(state, "createAnalysis"),
    userId: state.account.id,
    sampleId: state.analyses.sampleId,
    detail: state.samples.detail,
    analyses: state.analyses.documents,
    filter: state.analyses.filter,
    indexes: state.analyses.readyIndexes,
    hmms: state.hmms,
    canModify: getCanModify(state)
});

const mapDispatchToProps = dispatch => ({
    onFind: (sampleId, term, page) => {
        dispatch(findAnalyses(sampleId, term, page));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalysesList);
