import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConferences, updateConference } from "../api/conferencesApi";
import ConferenceForm from "../components/ConferenceForm";

const ConferenceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    getConferences().then((data) => {
      const conf = data.find((c) => c.id === parseInt(id));
      setInitialValues(conf);
    });
  }, [id]);

  const handleSubmit = async (data) => {
    await updateConference(id, data);
    navigate("/conferences");
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Conference</h1>
      <ConferenceForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </div>
  );
};

export default ConferenceEdit;