import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";
import { InfoIcon } from "lucide-react";

interface WithdrawalConsentProps {
  onChange: (checked: boolean) => void;
  value: boolean;
}

const WithdrawalConsent = ({ onChange, value }: WithdrawalConsentProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-start space-x-3">
        <Checkbox 
          id="withdrawal-consent" 
          checked={value}
          onCheckedChange={(checked) => {
            if (typeof checked === 'boolean') {
              onChange(checked);
              if (!checked) {
                setShowAlert(true);
              } else {
                setShowAlert(false);
              }
            }
          }}
          className="mt-1"
        />
        <div>
          <Label htmlFor="withdrawal-consent" className="font-medium text-gray-900 text-sm">
            Zgadzam się na natychmiastowy dostęp do treści cyfrowych i przyjmuję do wiadomości, że tracę prawo do odstąpienia od umowy po rozpoczęciu dostępu.
            <span className="block mt-1 text-gray-500 text-xs">
              (I agree to immediate access to digital content and acknowledge that I lose my right of withdrawal after access begins.)
            </span>
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            <Link href="/withdrawal" className="text-blue-600 hover:underline inline-flex items-center">
              <InfoIcon className="h-3 w-3 mr-1" />
              Dowiedz się więcej o prawie odstąpienia
            </Link>
          </p>
        </div>
      </div>
      
      {showAlert && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            Zgoda na natychmiastowy dostęp jest wymagana. Zgodnie z prawem polskim (Ustawa o prawach konsumenta), bez tej zgody nie możemy udzielić natychmiastowego dostępu do treści cyfrowych.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WithdrawalConsent;