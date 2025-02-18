import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Barcode from "react-barcode";

const TicketDisplay = ({ ticketInfo, onCreateNewTicket }) => {
  const ticketRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Ensure the avatar image is fully loaded before capturing the ticket
  useEffect(() => {
    const img = new Image();
    img.src = ticketInfo.avatarUrl;
    img.onload = () => setIsImageLoaded(true);
  }, [ticketInfo.avatarUrl]);

  const handleDownload = () => {
    if (!isImageLoaded) {
      alert("Please wait for the image to load before downloading.");
      return;
    }

    const ticketElement = ticketRef.current;

    html2canvas(ticketElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ticket.pdf");
    });
  };

  return (
    <div className="ticket-display">
      <h1>Event Name: Tech Conference 2023</h1>
      <div className="step-indicator">
        <span className="step">1</span>
        <span className="step">2</span>
        <span className="step active">3</span>
      </div>
      <h2>Your Conference Ticket</h2>
      <div className="ticket-card" ref={ticketRef}>
        <div className="event-info">
          <h3>Tech Conference 2023</h3>
          <p>Address: 123 Main St, City, Country</p>
          <p>Date: October 30, 2023</p>
        </div>
        <div className="avatar">
          <img
            src={ticketInfo.avatarUrl}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
        <div className="ticket-details">
          <div className="row">
            <div className="field">
              <label>Name</label>
              <p>{ticketInfo.fullName}</p>
            </div>
            <div className="field">
              <label>Email</label>
              <p>{ticketInfo.email}</p>
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>Ticket Type</label>
              <p>{ticketInfo.ticketType}</p>
            </div>
            <div className="field">
              <label>Number of Tickets</label>
              <p>{ticketInfo.numTickets}</p>
            </div>
          </div>
          <div className="row full-width">
            <div className="field">
              <label>Special Request</label>
              <p>{ticketInfo.specialRequest}</p>
            </div>
          </div>
        </div>
        <div className="barcode">
          <Barcode value={ticketInfo.email || "123456789012"} />
        </div>
      </div>
      <div className="action-buttons">
        <button className="create-new-button" onClick={onCreateNewTicket}>
          Create New Ticket
        </button>
        <button className="download-button" onClick={handleDownload}>
          Download Ticket
        </button>
      </div>
    </div>
  );
};

// Prop validation
TicketDisplay.propTypes = {
  ticketInfo: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
    numTickets: PropTypes.number.isRequired,
    specialRequest: PropTypes.string,
  }).isRequired,
  onCreateNewTicket: PropTypes.func.isRequired,
};

export default TicketDisplay;
