import React, { useState } from "react";
import Button from "../Button";

export const PurchaseButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://novu-notifications-seven.vercel.app/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriberId: "1",
            text: "Accumulators Contract Purchased!",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process purchase");
      }
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="primary" onClick={handlePurchase} disabled={isLoading}>
      {isLoading ? "Processing..." : "Purchase Accumulators Contract"}
    </Button>
  );
};

export default PurchaseButton;
