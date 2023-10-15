function SettingsGroup(props) {

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-md mx-4">
            {props.children}
        </div>
    );
}

export default SettingsGroup;