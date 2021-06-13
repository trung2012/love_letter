import styled from '@emotion/styled';
import { IDragComponentDragState, IDraggableDragState } from './DraggableCard.types';

export const DraggableCardContainer = styled.div<{
  draggableDragState: IDraggableDragState;
  cardId: string;
  index: number;
  isClientPlayer: boolean;
}>(props => ({
  display:
    props.draggableDragState.isDragging &&
    props.draggableDragState.currentlyDraggingId === props.cardId
      ? 'none'
      : 'block',
  '&-selected': {
    transform: 'translateY(-15%)',
  },
  zIndex: 1,
  ':hover': {
    transform: 'translateY(-2rem)',
  },
}));

export const DragComponentContainer = styled.div<{
  draggableDragState: IDragComponentDragState;
}>(
  {
    position: 'fixed',
    zIndex: 100,
    transform: 'translate(-50%, -50%)',
    cursor: 'grabbing',
  },
  ({ draggableDragState }) => ({
    left: draggableDragState.x,
    top: draggableDragState.y,
  })
);
