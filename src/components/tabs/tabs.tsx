import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientSectionProps } from "../ingredient-section/types";

const Tabs = ({ tabs }: {tabs: TIngredientSectionProps}) => {
    return (
        <div className="d-flex mb-40">
            {tabs.tabs.map((item) => {
                return (
                  <Tab onClick={() => console.log('click on tab')} key={item.id} value={item.id} active={tabs.activeTab === item.id}>{item.title}</Tab>
                )
            })}
        </div>
    );
};

export default Tabs;
