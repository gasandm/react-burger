export type TTab = {
    id: string;
    title: string;
    ref: React.MutableRefObject<null>;
};

export type TIngredientSectionProps = {
    activeTab: string;
    tabs: TTab[];
}
