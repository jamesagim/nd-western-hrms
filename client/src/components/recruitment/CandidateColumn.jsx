import { Droppable } from "@hello-pangea/dnd";
import CandidateCard from "./CandidateCard";

function CandidateColumn({
  title,
  candidates,
}) {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-2xl p-4 min-h-[650px] transition-all duration-300 ${
            snapshot.isDraggingOver
              ? "bg-blue-100 border-2 border-dashed border-blue-500"
              : "bg-slate-100"
          }`}
        >
          <div className="flex justify-between items-center mb-5">

            <h2 className="font-bold text-lg">
              {title}
            </h2>

            <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
              {candidates.length}
            </span>

          </div>

          <div className="space-y-4">

            {candidates.map((candidate, index) => (
              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                index={index}
              />
            ))}

            {provided.placeholder}

          </div>

        </div>
      )}
    </Droppable>
  );
}

export default CandidateColumn;