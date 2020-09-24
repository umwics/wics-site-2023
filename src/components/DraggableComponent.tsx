import React from "react";
import { Draggable, DraggableId } from "react-beautiful-dnd";

interface Props<P = any> {
    children: React.ReactNode;
    component: React.ElementType<P>;
    componentProps?: P;
    draggableId: DraggableId;
    index: number;
    isDragDisabled?: boolean;
}

const DraggableComponent: React.FC<Props> = ({
    children,
    component: Component,
    componentProps,
    draggableId,
    index,
    isDragDisabled
}: Props) => {
    return (
        <Draggable draggableId={draggableId} index={index} isDragDisabled={isDragDisabled}>
            {(provided, _snapshot) => {
                return (
                    <Component
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...componentProps}
                    >
                        {children}
                    </Component>
                );
            }}
        </Draggable>
    );
};

export default DraggableComponent;
