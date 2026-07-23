import {
  DragDropContext,
  Droppable,
} from "@hello-pangea/dnd";

import CandidateColumn from "./CandidateColumn";

function RecruitmentBoard({
  candidates,
  onDragEnd,
}) {
  const stages = [
    "Applied",
    "Screening",
    "Interview",
    "Offer",
    "Hired",
  ];

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="grid xl:grid-cols-5 gap-6">

        {stages.map((stage) => (
          <Droppable
            droppableId={stage}
            key={stage}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <CandidateColumn
                  title={stage}
                  candidates={candidates.filter(
                    (candidate) =>
                      candidate.stage === stage
                  )}
                />

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}

      </div>
    </DragDropContext>
  );
}

export default RecruitmentBoard;