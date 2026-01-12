import { useNavigate } from "react-router-dom";
import { createConference } from "../api/conferencesApi";
import ConferenceForm from "../components/ConferenceForm";

const ConferenceCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createConference(data);
    navigate("/conferences");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Conference</h1>
      <ConferenceForm
        initialValues={{ name: "" }}
        onSubmit={handleSubmit}
        submitLabel="Create"
      />
    </div>
  );
};

export default ConferenceCreate;