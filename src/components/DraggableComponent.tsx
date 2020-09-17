import React from "react";
import { Draggable, DraggableId } from "react-beautiful-dnd";

interface Props {
    component: React.ElementType;
    draggableId: DraggableId;
    index: number;
    isDragDisabled?: boolean;
}

const DraggableComponent = ({
    component: Component,
    draggableId,
    index,
    isDragDisabled
}: Props) => <P extends unknown>(props: React.PropsWithChildren<P>): React.ReactElement => {
    return (
        <Draggable draggableId={draggableId} index={index} isDragDisabled={isDragDisabled}>
            {(provided, _snapshot) => {
                return (
                    <Component
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...props}
                    >
                        {props.children}
                    </Component>
                );
            }}
        </Draggable>
    );
};

export default DraggableComponent;
