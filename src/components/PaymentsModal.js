import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./PaymentsModal.css";

const customStyles = {
 content: {
   top: "20%",
   left: "40%",
   right: "40%",
   bottom: "auto",
 },
};

const PaymentsModal = ({ modalState, setModalState }) => {
    const [formData, setFormData] = useState({
        amount: 0,
        invoiceToPay: "",
    });

    const [invoice, setInvoice] = useState("");

    const [paymentInfo, setPaymentInfo] = useState({
        paymentHash: "",
        checkingId: "",
    });

    const handleSend = () => {};

    const handleReceive = () => {};

 return (
   <Modal
     isOpen={modalState.open}
     style={customStyles}
     contentLabel="Example Modal"
     appElement={document.getElementById("root")}
   >
     <p
       className="close-button"
       onClick={() => {
         setModalState({ open: false, type: null });
       }}
     >
       X
     </p>
     <p>Here's our modal!</p>
   </Modal>
 );
};

export default PaymentsModal;