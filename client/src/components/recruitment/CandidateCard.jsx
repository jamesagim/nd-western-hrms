import { Link } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

import {
  Mail,
  Phone,
  Calendar,
  MoreVertical,
} from "lucide-react";

function CandidateCard({
  candidate,
  index,
}) {
  const initials = `${candidate.firstName?.[0] || ""}${
    candidate.lastName?.[0] || ""
  }`.toUpperCase();

  const fullName =
    `${candidate.firstName || ""} ${
      candidate.lastName || ""
    }`.trim();

  return (
    <Draggable
      draggableId={candidate._id}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link
            to={`/recruitment/${candidate._id}`}
            className="block bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}

            <div className="flex justify-between">

              <div className="flex items-center gap-3">

                {candidate.photo ? (
                  <img
                    src={candidate.photo}
                    alt={fullName}
                    className="w-14 h-14 rounded-2xl object-cover border"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold">
                    {initials}
                  </div>
                )}

                <div>

                  <h3 className="font-bold">
                    {fullName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {candidate.position}
                  </p>

                </div>

              </div>

              <MoreVertical
                size={18}
                className="text-slate-400"
              />

            </div>

            {/* Contact */}

            <div className="space-y-2 mt-5 text-sm">

              <div className="flex items-center gap-2">

                <Mail size={14} />

                {candidate.email}

              </div>

              <div className="flex items-center gap-2">

                <Phone size={14} />

                {candidate.phone || "No phone"}

              </div>

              <div className="flex items-center gap-2">

                <Calendar size={14} />

                {candidate.stage}

              </div>

            </div>

            {/* Skills */}

            <div className="flex flex-wrap gap-2 mt-5">

              {(candidate.skills || []).map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </Link>
        </div>
      )}
    </Draggable>
  );
}

export default CandidateCard;