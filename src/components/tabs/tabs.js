import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = (props) => {
    const [current, setCurrent] = React.useState(props.tabs.activeTab);
    return (
        <div className="d-flex mb-40">
            {props.tabs.tabs.map((item) => {
                return (
                  <Tab key={item.id} value={item.id} active={current === item.id} onClick={setCurrent}>{item.title}</Tab>
                )
            })}
        </div>
    );
};

Tabs.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default Tabs;
