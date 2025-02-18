import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const HomePage = ({ onNext }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [numTickets, setNumTickets] = useState(1);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("homePageData"));
    if (savedData) {
      setSelectedPlan(savedData.selectedPlan);
      setNumTickets(savedData.numTickets);
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem(
      "homePageData",
      JSON.stringify({ selectedPlan, numTickets })
    );
  }, [selectedPlan, numTickets]);

  const ticketPlans = [
    { name: "Regular Access", price: 0 },
    { name: "Standard Access", price: 50 },
    { name: "VIP Access", price: 150 },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCancel = () => {
    setSelectedPlan(null);
    setNumTickets(1);
  };

  const handleNext = () => {
    if (selectedPlan) {
      onNext({
        ticketType: selectedPlan.name,
        numTickets: numTickets,
        price: selectedPlan.price * numTickets,
      });
    }
  };

  return (
    <div className="home-page">
      <div className="step-indicator">
        <span className="step active">1</span>
        <span className="step">2</span>
        <span className="step">3</span>
      </div>
      <h1>Event Name: Tech Conference 2023</h1>
      <h2>Select Your Ticket Plan</h2>
      <div className="ticket-plans">
        {ticketPlans.map((plan, index) => (
          <button
            key={index}
            className={`plan-button ${selectedPlan === plan ? "selected" : ""}`}
            onClick={() => handlePlanSelect(plan)}
          >
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">${plan.price}</div>
          </button>
        ))}
      </div>
      <div className="num-tickets">
        <label htmlFor="numTickets">Number of Tickets</label>
        <input
          type="number"
          id="numTickets"
          value={numTickets}
          min="1"
          onChange={(e) => setNumTickets(parseInt(e.target.value))}
        />
      </div>
      <div className="action-buttons">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!selectedPlan}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Prop validation
HomePage.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default HomePage;
