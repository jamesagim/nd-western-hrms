import CandidateCard from "./CandidateCard";


function CandidateColumn({

  title,

  candidates,

  badgeStyle,

  isDraggingOver,

}) {


  return (

    <div

      className={`
        rounded-3xl
        p-5
        min-h-[650px]
        transition-all

        ${
          isDraggingOver

          ?

          "bg-blue-50 border-2 border-blue-400"

          :

          "bg-slate-100"

        }

      `}

    >


      <div className="
        flex
        items-center
        justify-between
        mb-5
      ">


        <h2 className="
          font-bold
          text-lg
        ">

          {title}

        </h2>



        <span

          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
            ${badgeStyle}
          `}

        >

          {candidates.length}

        </span>


      </div>





      <div className="
        space-y-4
      ">


        {
          candidates.map(
            (candidate,index)=>(


              <CandidateCard

                key={candidate._id}

                candidate={candidate}

                index={index}

              />


            )

          )
        }


      </div>


    </div>


  );


}


export default CandidateColumn;