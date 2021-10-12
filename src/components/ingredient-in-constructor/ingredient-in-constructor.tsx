import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./ingredient-in-constructor.module.scss";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientInConstructorProps } from "./types";

const IngredientInConstructor = (props: TIngredientInConstructorProps) => {
    const { _id, image, price, name } = props.item;
    const { onDeleteHandler, moveIngredient, index } = props;

    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "ingredientInner",
        item: () => {
            return { _id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "ingredientInner",
        hover: (item: {index:number}, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            // @ts-ignore
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveIngredient(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
            
        }
    });
    drag(drop(ref));

    return (
        <div ref={ref} className={styles.ingredientOuter}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                handleClose={() => {
                    onDeleteHandler(props.item);
                }}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>
    );
};

export default IngredientInConstructor;
