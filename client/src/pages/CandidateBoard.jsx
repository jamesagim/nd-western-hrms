import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Users,
  ClipboardList,
  Briefcase,
} from "lucide-react";

import axios from "axios";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import CandidateColumn from "../components/recruitment/CandidateColumn";

function CandidateBoard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5001/api/candidates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const applied = candidates.filter(
    (c) => c.stage === "Applied"
  );

  const screening = candidates.filter(
    (c) => c.stage === "Screening"
  );

  const interview = candidates.filter(
    (c) => c.stage === "Interview"
  );

  const offer = candidates.filter(
    (c) => c.stage === "Offer"
  );

  const hired = candidates.filter(
    (c) => c.stage === "Hired"
  );

  return (
    <AppLayout>
      <PageHeader
        title="Recruitment"
        subtitle="Track every candidate from application to hiring."
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

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <Card className="p-6">
          <Users className="text-blue-600 mb-3" size={28} />
          <p className="text-slate-500">
            Candidates
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {candidates.length}
          </h2>
        </Card>

        <Card className="p-6">
          <ClipboardList
            className="text-orange-500 mb-3"
            size={28}
          />
          <p className="text-slate-500">
            Applied
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {applied.length}
          </h2>
        </Card>

        <Card className="p-6">
          <Briefcase
            className="text-green-600 mb-3"
            size={28}
          />
          <p className="text-slate-500">
            Interviews
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {interview.length}
          </h2>
        </Card>

        <Card className="p-6">
          <Users
            className="text-purple-600 mb-3"
            size={28}
          />
          <p className="text-slate-500">
            Hired
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {hired.length}
          </h2>
        </Card>

      </div>

      <div className="grid xl:grid-cols-5 gap-6">

        <CandidateColumn
          title="Applied"
          color="bg-slate-100"
          candidates={applied}
        />

        <CandidateColumn
          title="Screening"
          color="bg-blue-100"
          candidates={screening}
        />

        <CandidateColumn
          title="Interview"
          color="bg-yellow-100"
          candidates={interview}
        />

        <CandidateColumn
          title="Offer"
          color="bg-purple-100"
          candidates={offer}
        />

        <CandidateColumn
          title="Hired"
          color="bg-green-100"
          candidates={hired}
        />

      </div>

    </AppLayout>
  );
}

export default CandidateBoard;