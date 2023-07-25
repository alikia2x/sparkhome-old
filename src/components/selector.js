import React, {Component} from "react";
import '../style/scrollbar.css';

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorIsVisible: false,
        };
        this.selectorRef = React.createRef();
    }

    //挂载和卸载组件时，同步添加/删除事件监听器
    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    }

    //处理在selector之外的任意位置的点击，使其在点击后关闭selector
    handleClickOutside = (event) => {
        if (
            this.selectorRef.current &&
            !this.selectorRef.current.contains(event.target)
        ) {
            this.setState({selectorIsVisible: false});
        }
    };

    //切换selector的可见性
    toggleselectorVisibility() {
        this.setState((prevState) => ({
            selectorIsVisible: !prevState.selectorIsVisible,
        }));
    }

    //点击更改了当前的选中项
    changeSelected(target) {
        this.props.selectedOnChange(target);
        this.setState({selectorIsVisible: false});
    }

    render() {
        const {items, current, elementBackdrop, css} = this.props;
        const {selectorIsVisible} = this.state;
        // Selector框架的CSS
        let boxCSS =
            "relat w-20 h-8 text-white text-center cursor-pointer select-none";
        if (css !== undefined) boxCSS = `${css} ${boxCSS}`;

        // Selector按钮的CSS
        let btnVarCSS = elementBackdrop
            ? "bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(24,24,24,0.7)] text-slate-100 dark:text-slate-100 backdrop-blur-lg"
            : "bg-[rgba(255,255,255,0.9)]";
        let btnCSS = "rounded-2xl h-8 pt-1";

        // Selector列表的CSS
        let listCSS =
            "w-20 h-auto mt-1 text-center leading-8 rounded-2xl cursor-pointer select-none transition-all overflow-scroll overflow-x-hidden noScrollbar";
        let listVisibleCSS = selectorIsVisible
            ? ""
            : "pointer-events-none opacity-0";
        let listVarCSS = elementBackdrop
            ? "bg-[rgba(255,255,255,0.7)] backdrop-blur-lg dark:bg-[rgba(24,24,24,0.7)] text-slate-700 dark:text-slate-200"
            : "bg-[rgba(255,255,255,0.9)]";
        listCSS = `${listCSS} ${listVarCSS} ${listVisibleCSS}`;

        // Selector单个item的CSS
        let itemCSS = "hover:bg-[rgba(230,230,230,0.9)] dark:hover:bg-[rgba(90,90,90,0.9)]";

        return (
            <div className={boxCSS}>
                <div className={btnCSS + " " + btnVarCSS} ref={this.selectorRef}
                     onClick={() => this.toggleselectorVisibility()}>
                    {current}
                </div>
                <div className={listCSS}
                     style={{maxHeight: 2 * this.props.max_show.toString() + "rem"}}>
                    {Object.keys(items).map((index) => (
                        <div
                            key={index}
                            className={itemCSS}
                            onClick={() => this.changeSelected(items[index])}
                        >
                            {items[index]}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Selector;