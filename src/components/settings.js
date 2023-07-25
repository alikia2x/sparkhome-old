import React from "react";
import {connect} from 'react-redux';
import {updateSettings} from '../actions/settingsActions';
import {useState} from 'react'
import {Switch} from '@headlessui/react'

function MyToggle() {
    const [enabled, setEnabled] = useState(false)

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={` ${enabled ? 'bg-red-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

function Settings(props) {
    return (
        <div>
            <span>{props.settings.bgBlur.toString()}</span>
            {MyToggle()}
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps, {updateSettings})(Settings);