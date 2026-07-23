import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Users,
  UserPlus,
  Briefcase,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { CandidateContext } from "../context/CandidateContext";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import RecruitmentBoard from "../components/recruitment/RecruitmentBoard";

function Recruitment() {
  const {
  candidates,
  loading,
  moveCandidate,
  hireCandidate,
} = useContext(CandidateContext);

  if (loading) {
    return (
      <AppLayout>
        <LoadingSpinner />
      </AppLayout>
    );
  }

  const applied = candidates.filter(
    (candidate) => candidate.stage === "Applied"
  );

  const interview = candidates.filter(
    (candidate) => candidate.stage === "Interview"
  );

  const hired = candidates.filter(
    (candidate) => candidate.stage === "Hired"
  );

 const handleDragEnd = async (result) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId
  )
    return;

  // If dropped into Hired
  if (destination.droppableId === "Hired") {
    await hireCandidate(draggableId);
    return;
  }

  await moveCandidate(
    draggableId,
    destination.droppableId
  );
};

  return (
    <AppLayout>
      <PageHeader
        title="Recruitment"
        subtitle="Manage candidates, interviews and hiring."
        actions={
          <Link to="/recruitment/add">
            <Button>
              <div className="flex items-center gap-2">
                <UserPlus size={18} />
                Add Candidate
              </div>
            </Button>
          </Link>
        }
      />

      <div className="grid lg:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Candidates"
          value={candidates.length}
          subtitle="Total applicants"
          icon={<Users className="text-blue-600" />}
        />

        <StatCard
          title="Applied"
          value={applied.length}
          subtitle="Awaiting review"
          icon={<Briefcase className="text-indigo-600" />}
        />

        <StatCard
          title="Interviews"
          value={interview.length}
          subtitle="Scheduled"
          icon={<Clock3 className="text-orange-600" />}
        />

        <StatCard
          title="Hired"
          value={hired.length}
          subtitle="Successful hires"
          icon={<CheckCircle2 className="text-green-600" />}
        />

      </div>

      <RecruitmentBoard
        candidates={candidates}
        onDragEnd={handleDragEnd}
      />

    </AppLayout>
  );
}

export default Recruitment;