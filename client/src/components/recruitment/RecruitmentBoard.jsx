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
    {
      name: "Applied",
      color: "bg-blue-100 text-blue-700",
    },

    {
      name: "Screening",
      color: "bg-purple-100 text-purple-700",
    },

    {
      name: "Interview",
      color: "bg-orange-100 text-orange-700",
    },

    {
      name: "Offer",
      color: "bg-yellow-100 text-yellow-700",
    },

    {
      name: "Hired",
      color: "bg-green-100 text-green-700",
    },
  ];



  return (

    <DragDropContext
      onDragEnd={onDragEnd}
    >

      <div className="
        grid
        xl:grid-cols-5
        gap-6
      ">


        {stages.map((stage)=>(
          

          <Droppable

            droppableId={stage.name}

            key={stage.name}

          >

            {(provided,snapshot)=>(


              <div

                ref={provided.innerRef}

                {...provided.droppableProps}

              >


                <CandidateColumn

                  title={stage.name}

                  badgeStyle={stage.color}

                  candidates={
                    candidates.filter(
                      candidate =>
                      candidate.stage === stage.name
                    )
                  }

                  isDraggingOver={
                    snapshot.isDraggingOver
                  }

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