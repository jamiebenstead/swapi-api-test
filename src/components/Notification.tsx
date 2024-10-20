import React from "react";
import { ToastNotification } from "@carbon/react";

interface NotificationProps {
  show: boolean;
  quantity: number;
  productName: string;
  onClose: () => void;
}

const Notification = ({
  show,
  quantity,
  productName,
  onClose,
}: NotificationProps) => {
  return (
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            top: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <ToastNotification
            kind="success"
            title="Item added to basket"
            subtitle={`You added ${quantity} of ${productName} to the basket.`}
            onCloseButtonClick={onClose}
          />
        </div>
      )}
    </>
  );
};

export default Notification;
