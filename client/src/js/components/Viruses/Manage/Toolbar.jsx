/**
 * @license
 * The MIT License (MIT)
 * Copyright 2015 Government of Canada
 *
 * @author
 * Ian Boyes
 *
 * @exports VirusToolbar
 */

'use strict';

var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var Icon = require('virtool/js/components/Base/Icon.jsx');
var Flex = require('virtool/js/components/Base/Flex.jsx');
var PushButton = require('virtool/js/components/Base/PushButton.jsx');

/**
 * A toolbar component rendered at the top of the virus manager table. Allows searching of viruses by name and
 * abbreviation. Includes a button for creating a new virus.
 */
var VirusToolbar = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func,
        modifiedOnly: React.PropTypes.bool
    },

    getInitialState: function () {
        // The state showAdd is true when the modal should be visible.
        return {
            flaggedOnly: false,

            canAdd: dispatcher.user.permissions.add_virus,
            canModify: dispatcher.user.permissions.modify_virus
        };
    },

    componentDidMount: function () {
        // Focus on the input field when the component is ready.
        this.refs.input.focus();
        dispatcher.user.on('change', this.onUserChange);
    },

    componentWillUnmount: function () {
        dispatcher.user.off('change', this.onUserChange);
    },

    onUserChange: function () {
        this.setState({
            canAdd: dispatcher.user.permissions.add_virus,
            canModify: dispatcher.user.permissions.modify_virus
        });
    },

    /**
     * Changes state to show the add or export modal form. Triggered by clicking the a menu item.
     *
     * @param eventKey {string} - the event key.
     * @func
     */
    handleSelect: function (eventKey) {

        switch (eventKey) {

            case "add":
                dispatcher.router.setExtra(["add"]);
                break;

            case "import":
                dispatcher.router.setExtra(["import"]);
                break;

            case "export":
                dispatcher.router.setExtra(["export"]);
                break;

        }
    },

    toggleFlaggedOnly: function () {
        this.setState({
            flaggedOnly: !this.state.flaggedOnly
        }, this.handleChange);
    },

    render: function () {

        var menu;

        if (this.state.canAdd || this.state.canModify) {
            var title = <Icon name='menu' />;
            menu = (
                <DropdownButton id="virus-dropdown" title={title} onSelect={this.handleSelect} noCaret pullRight>
                    <MenuItem eventKey="add" disabled={!this.state.canAdd}>
                        <Icon name='new-entry' /> New
                    </MenuItem>
                    <MenuItem eventKey="export" disabled={!this.state.canModify}>
                        <Icon name='export' /> Export
                    </MenuItem>
                    <MenuItem eventKey="import" disabled={!this.state.canAdd}>
                        <Icon name='new-entry' /> Import
                    </MenuItem>
                </DropdownButton>
            );
        }

        return (
            <div style={{marginBottom: '15px'}}>
                <Flex>
                    <Flex.Item grow={2}>
                        <div className='input-group'>
                            <span id='find-addon' className='input-group-addon'>
                                <Icon name='search' /> Find
                            </span>
                            <input
                                ref='input'
                                aria-describedby='find-addon'
                                className='form-control'
                                type='text'
                                placeholder='Name or abbreviation'
                                onChange={this.props.onChange}
                            />
                        </div>
                    </Flex.Item>

                    <Flex.Item shrink={0} pad>
                        <PushButton onClick={this.props.toggleModifiedOnly} active={this.props.modifiedOnly} tip="Modified Only">
                            <Icon name='flag' bsStyle='warning' />
                        </PushButton>
                    </Flex.Item>

                    <Flex.Item shrink={0} pad>
                        {menu}
                    </Flex.Item>
                </Flex>
            </div>
        );
    }

});

module.exports = VirusToolbar;