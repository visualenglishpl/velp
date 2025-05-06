import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

interface WithdrawalConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  language?: "pl" | "en";
}

const WithdrawalConsent: React.FC<WithdrawalConsentProps> = ({
  checked,
  onChange,
  language = "pl", // Default to Polish
}) => {
  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="withdrawal-consent" 
          checked={checked} 
          onCheckedChange={onChange}
          className="mt-1"
          required
        />
        <div className="space-y-1">
          <Label 
            htmlFor="withdrawal-consent" 
            className="font-medium text-sm"
          >
            {language === "pl" 
              ? "Wyrażam zgodę na rozpoczęcie świadczenia usługi przed upływem terminu do odstąpienia od umowy" 
              : "I consent to the commencement of service provision before the expiry of the withdrawal period"}
          </Label>
          <p className="text-xs text-gray-500">
            {language === "pl" 
              ? "Zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, wyrażając tę zgodę przyjmuję do wiadomości, że utracę prawo do odstąpienia od umowy z chwilą pełnego wykonania usługi."
              : "In accordance with Article 38(13) of the Consumer Rights Act, by expressing this consent, I acknowledge that I will lose the right to withdraw from the contract upon full performance of the service."}
          </p>
          <p className="text-xs">
            {language === "pl"
              ? <span>Szczegółowe informacje znajdują się w <Link href="/withdrawal" className="text-blue-600 hover:underline">warunkach odstąpienia od umowy</Link>.</span>
              : <span>Detailed information can be found in the <Link href="/withdrawal" className="text-blue-600 hover:underline">withdrawal terms</Link>.</span>
            }
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="terms-consent" 
          checked={checked} 
          onCheckedChange={onChange}
          className="mt-1"
          required
        />
        <div className="space-y-1">
          <Label 
            htmlFor="terms-consent" 
            className="font-medium text-sm"
          >
            {language === "pl" 
              ? "Potwierdzam zapoznanie się z Regulaminem oraz Polityką Prywatności i akceptuję ich postanowienia" 
              : "I confirm that I have read the Terms of Service and Privacy Policy and accept their provisions"}
          </Label>
          <p className="text-xs">
            {language === "pl"
              ? <span>Kliknij, aby przeczytać <Link href="/terms" className="text-blue-600 hover:underline">Regulamin</Link> i <Link href="/privacy" className="text-blue-600 hover:underline">Politykę Prywatności</Link>.</span>
              : <span>Click to read the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</span>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalConsent;