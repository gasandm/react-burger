import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import styles from "./ingredient-in-constructor.module.scss";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientInConstructor = (props) => {
    const { _id, image, price, name } = props.item;
    const { onDeleteHandler, moveIngredient, index } = props;

    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
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
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
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

IngredientInConstructor.propTypes = {
    item: PropTypes.object.isRequired,
    onDeleteHandler: PropTypes.func.isRequired,
    moveIngredient: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default IngredientInConstructor;
