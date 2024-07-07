import Modal from "react-modal";
import css from "./ImageModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    maxHeight: "700px",
    background: "none",
    padding: "0px",
    borderRadius: "8px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export default function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <img
        className={css.modalImage}
        src={image.urls.regular}
        alt={image.alt_description}
      />
    </Modal>
  );
}
