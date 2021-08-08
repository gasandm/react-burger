import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = (props) => {
    return (
        <div className="d-flex mb-40">
            {props.tabs.tabs.map((item) => {
                return (
                  <Tab key={item.id} value={item.id} active={props.tabs.activeTab === item.id}>{item.title}</Tab>
                )
            })}
        </div>
    );
};

Tabs.propTypes = { tabs: PropTypes.object.isRequired };

export default Tabs;
