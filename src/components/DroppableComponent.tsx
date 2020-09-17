import React from "react";
import {
    Direction,
    DragDropContext,
    Droppable,
    DroppableMode,
    DropResult,
    ResponderProvided
} from "react-beautiful-dnd";

interface Props {
    component: React.ElementType;
    onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
    mode?: DroppableMode;
    direction?: Direction;
    isDropDisabled?: boolean;
}

const DroppableComponent = ({
    component: Component,
    onDragEnd,
    mode,
    direction,
    isDropDisabled
}: Props) => <P extends unknown>(props: React.PropsWithChildren<P>): React.ReactElement => {
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
                        <Component ref={provided.innerRef} {...provided.droppableProps} {...props}>
                            {props.children}
                            {provided.placeholder}
                        </Component>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

export default DroppableComponent;
