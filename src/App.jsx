import { useState } from "react";
import HomePage from "./HomePage";
import UserDetailsForm from "./UserDetailsForm";
import TicketDisplay from "./TicketDisplay";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [ticketInfo, setTicketInfo] = useState({});

  const handleHomeNext = (data) => {
    setTicketInfo(data);
    setStep(2);
  };

  const handleFormNext = (data) => {
    setTicketInfo((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleCancel = () => {
    setTicketInfo({});
    setStep(1);
  };

  const handleCreateNewTicket = () => {
    setTicketInfo({});
    setStep(1);
  };

  return (
    <div className="app">
      {step === 1 && <HomePage onNext={handleHomeNext} />}
      {step === 2 && (
        <UserDetailsForm
          ticketInfo={ticketInfo}
          onNext={handleFormNext}
          onCancel={handleCancel}
        />
      )}
      {step === 3 && (
        <TicketDisplay
          ticketInfo={ticketInfo}
          onCreateNewTicket={handleCreateNewTicket}
        />
      )}
    </div>
  );
};

export default App;
