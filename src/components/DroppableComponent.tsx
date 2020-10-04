import React from "react";
import {
    Direction,
    DragDropContext,
    Droppable,
    DroppableMode,
    DropResult,
    ResponderProvided
} from "react-beautiful-dnd";

interface Props<P = any> {
    children: React.ReactNode;
    component: React.ElementType<P>;
    componentProps?: P;
    onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
    mode?: DroppableMode;
    direction?: Direction;
    isDropDisabled?: boolean;
}

const DroppableComponent: React.FC<Props> = ({
    children,
    component: Component,
    componentProps,
    onDragEnd,
    mode,
    direction,
    isDropDisabled
}: Props) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId={"1"}
                isDropDisabled={isDropDisabled}
                mode={mode}
                direction={direction}
            >
                {provided => {
                    return (
                        <Component
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...componentProps}
                        >
                            {children}
                            {provided.placeholder}
                        </Component>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

export default DroppableComponent;
