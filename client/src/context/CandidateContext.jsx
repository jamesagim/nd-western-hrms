import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CandidateContext = createContext();

const API = "http://localhost:5001/api/candidates";

function CandidateProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Get Candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get(API, config);
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Add Candidate
  const addCandidate = async (formData) => {
    const res = await axios.post(API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setCandidates((prev) => [res.data, ...prev]);
  };

  // Delete Candidate
  const deleteCandidate = async (id) => {
    await axios.delete(`${API}/${id}`, config);

    setCandidates((prev) =>
      prev.filter((c) => c._id !== id)
    );
  };

  // Move Candidate
  const moveCandidate = async (id, stage) => {
    const res = await axios.put(
      `${API}/${id}/move`,
      { stage },
      config
    );

    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate._id === id
          ? res.data
          : candidate
      )
    );
  };

  // Hire Candidate
  const hireCandidate = async (id) => {
    try {
      await axios.post(
        `${API}/${id}/hire`,
        {},
        config
      );

      toast.success("Candidate hired successfully!");

      fetchCandidates();
    } catch (err) {
      console.error(err);
      toast.error("Unable to hire candidate.");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        addCandidate,
        deleteCandidate,
        moveCandidate,
        hireCandidate,
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export default CandidateProvider;