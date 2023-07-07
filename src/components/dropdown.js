import React, { Component } from 'react';

class Dropdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdownIsVisible: false
        };
        this.dropdownRef = React.createRef();
    }

    //挂载和卸载组件时，同步添加/删除事件监听器
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    //处理在Dropdown之外的任意位置的点击，使其在点击后关闭Dropdown
    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ dropdownIsVisible: false });
        }
    };

    //切换Dropdown的可见性
    toggleDropdownVisibility() {
        this.setState(prevState => ({
            dropdownIsVisible: !prevState.dropdownIsVisible
        }));
    }

    //点击更改了当前的选中项
    changeSelected(target) {
        this.props.selectedOnChange(target);
        this.setState({ dropdownIsVisible: false });
    }

    render() {
        const { items, current, elementBackdrop, css} = this.props;
        const { dropdownIsVisible } = this.state;
        //处理整个Dropdown的CSS
        let boxVarCSS = elementBackdrop
            ? 'bg-[rgba(255,255,255,0.2)] backdrop-blur-xl dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200'
            : 'bg-[rgba(255,255,255,0.9)]';
        let boxCSS = 'relative w-20 h-8 text-white z-10 text-center leading-8 rounded-2xl cursor-pointer select-none';
        if (css !== undefined)
            boxCSS = `${css} ${boxCSS} ${boxVarCSS}`;
        else boxCSS = `${boxCSS} ${boxVarCSS}`;

        //Dropdown单个item的CSS
        let itemCSS = 'w-20 h-auto mt-1 text-center leading-8 rounded-2xl cursor-pointer select-none transition-all';
        let itemVisibleCSS = dropdownIsVisible ? '' : 'pointer-events-none opacity-0';
        let itemVarCSS = elementBackdrop
            ? 'bg-[rgba(255,255,255,0.7)] backdrop-blur-xl dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200'
            : 'bg-[rgba(255,255,255,0.9)]';
        itemCSS = `${itemCSS} ${itemVarCSS} ${itemVisibleCSS}`;

        return (
            <div className={boxCSS} ref={this.dropdownRef}>
                <div name="dropdown-text" onClick={() => this.toggleDropdownVisibility()}>
                    {current}
                </div>
                <div name="dropdown-menu" className={itemCSS}>
                    {Object.keys(items).map((index) => (
                        <div key={index} onClick={() => this.changeSelected(items[index]) }>{items[index]}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Dropdown;