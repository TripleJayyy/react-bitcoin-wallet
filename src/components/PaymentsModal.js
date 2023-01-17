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

    const handleSend = (e) => {
        //stops the page refreshing when the form is submitted
        e.preventDefault();

        const headers = {
            "X-Api-Key": "9c70f13ada074722a74335ca67e198bf",
        };
        const data = {
            bolt11: formData.invoiceToPay,
            out: true,
        };

        axios
            .post("https://legend.lnbits.com/api/v1/payments", data, { headers })
            .then((res) =>
                setPaymentInfo({
                    paymentHash: res.data.paymentHash, 
                    checkingId: res.data.check_id,
                })
            )
            .catch((err) => console.log(err));

        return;
    }

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
            setModalState({ open: false, type: null});
        }}
        >
            X
        </p>

        {/* If it is a send */}
        {modalState.type === "send" && (
            <form>
                <label>paste an invoice</label>
                <input
                    type="text"
                    value={formData.invoiceToPay}
                    onChange={(e) => 
                        setFormData({...formData, invoiceToPay: e.target.value})
                    }
                />
                <button className="button" onClick={(e) => handleSend(e)}>
                    Submit
                </button>
            </form>
        )}

        {/* If it is a send */}
        {modalState.type === "receive" && (
            <form>
                <label>enter amount</label>
                <input
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => 
                        setFormData({...formData, amount: e.target.value })
                    }
                />
                <button className="button" onClick={(e) => handleReceive(e)}>
                    Submit
                </button>
            </form>
        )}
        {/* for displaying a newly created invoice */}
        {paymentInfo.paymentHash && (
            <section>
                <h3>Payment sent</h3>
                <p>Payment hash: {paymentInfo.paymentHash}</p>
                <p>Checking id: {paymentInfo.checkingId}</p>
            </section>
        )}
        {/* If we are displaying the status of our successful payment */}
        {paymentInfo.paymentHash && (
        <section>
            <h3>Payment sent</h3>
            <p>Payment hash: {paymentInfo.paymentHash}</p>
            <p>Checking id: {paymentInfo.checkingId}</p>
        </section>
        )}
    </Modal>
 );
};

export default PaymentsModal;