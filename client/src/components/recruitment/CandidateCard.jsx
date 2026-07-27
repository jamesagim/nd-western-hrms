import { Link } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

import {
  Mail,
  Phone,
  Briefcase,
  MoreVertical,
} from "lucide-react";


function CandidateCard({
  candidate,
  index,
}) {


  const fullName =
    `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim();



  const initials =
    `${candidate.firstName?.[0] || ""}${candidate.lastName?.[0] || ""}`
    .toUpperCase();




  return (


    <Draggable

      draggableId={candidate._id}

      index={index}

    >

      {(provided)=>(


        <div

          ref={provided.innerRef}

          {...provided.draggableProps}

          {...provided.dragHandleProps}

        >



          <Link

            to={`/recruitment/${candidate._id}`}

            className="
              block
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-5
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "

          >



            {/* HEADER */}


            <div className="
              flex
              justify-between
              items-start
            ">


              <div className="
                flex
                gap-3
                items-center
              ">



                {
                  candidate.photo

                  ?

                  <img

                    src={candidate.photo}

                    alt={fullName}

                    className="
                      w-14
                      h-14
                      rounded-2xl
                      object-cover
                      border
                    "

                  />

                  :

                  <div

                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-blue-600
                      to-cyan-500
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-lg
                    "

                  >

                    {initials}


                  </div>

                }





                <div>


                  <h3 className="
                    font-bold
                    text-slate-900
                  ">

                    {fullName}

                  </h3>



                  <p className="
                    text-sm
                    text-slate-500
                    mt-1
                  ">

                    {candidate.position}

                  </p>


                </div>



              </div>




              <MoreVertical

                size={18}

                className="
                  text-slate-400
                "

              />


            </div>







            {/* DETAILS */}


            <div className="
              mt-5
              space-y-3
              text-sm
              text-slate-600
            ">



              <div className="
                flex
                gap-2
                items-center
              ">


                <Mail size={15}/>

                <span className="truncate">

                  {candidate.email}

                </span>


              </div>





              <div className="
                flex
                gap-2
                items-center
              ">


                <Phone size={15}/>


                <span>

                  {candidate.phone || "No phone"}

                </span>


              </div>






              <div className="
                flex
                gap-2
                items-center
              ">


                <Briefcase size={15}/>


                <span>

                  {candidate.department}

                </span>


              </div>



            </div>








            {/* SKILLS */}


            <div className="
              flex
              flex-wrap
              gap-2
              mt-5
            ">


              {
                candidate.skills?.slice(0,4).map(

                  skill=>(


                    <span

                      key={skill}

                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-50
                        text-blue-700
                        text-xs
                        font-semibold
                      "

                    >

                      {skill}


                    </span>


                  )

                )
              }



              {
                candidate.skills?.length > 4 && (

                  <span

                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-slate-100
                      text-slate-600
                      text-xs
                    "

                  >

                    +
                    {
                      candidate.skills.length - 4
                    }

                  </span>

                )
              }



            </div>






            {/* FOOTER */}


            <div className="
              mt-5
              pt-4
              border-t
              flex
              justify-between
              items-center
            ">


              <span className="
                text-xs
                text-slate-400
              ">

                Pipeline Stage

              </span>




              <span className="
                text-xs
                font-bold
                text-blue-600
              ">

                {candidate.stage}

              </span>



            </div>



          </Link>



        </div>


      )}

    </Draggable>


  );


}


export default CandidateCard;