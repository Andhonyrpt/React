import PropTypes from "prop-types";
import Button from "../atoms/Button";
import { BUTTON_SIZES } from "../utils/constants";
import "./ConfirmDialog.css";

export default function ConfirmDialog({ isOpen, title, message, confirmText = "Confirmar", cancelText = "Cancelar", onConfirm, onCancel, type = "danger" }) {

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm?.();
    };

    const handleCancel = () => {
        onCancel?.();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    return (
        <div className="confirm-dialog-overlay" onClick={handleOverlayClick}>
            <div className={`confirm-dialog confirm-dialog--${type}`}>
                <div className="confirm-dialog__header">
                    <div className="confirm-dialog__icon">
                        {type === "danger" && "⚠️"}
                        {type === "warning" && "⚠️"}
                        {type === "info" && "ℹ️"}
                    </div>
                    <h3 className="confirm-dialog__title">{title}</h3>
                </div>

                <div className="confirm-dialog__body">
                    <p className="confirm-dialog__message">{message}</p>
                </div>

                <div className="confirm-dialog__footer">
                    <Button
                        onClick={handleCancel}
                        type="button"
                        variant="secondary"
                        size={BUTTON_SIZES.MEDIUM}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        type="button"
                        variant={type}
                        size={BUTTON_SIZES.MEDIUM}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["danger", "warning", "info"])
};