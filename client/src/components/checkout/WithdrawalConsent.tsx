import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'wouter';

interface WithdrawalConsentProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const WithdrawalConsent: React.FC<WithdrawalConsentProps> = ({ checked, onChange }) => {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="withdrawal-consent" 
          checked={checked}
          onCheckedChange={onChange}
          className="mt-1"
        />
        <div className="text-sm">
          <label
            htmlFor="withdrawal-consent"
            className="font-medium text-gray-700 cursor-pointer"
          >
            I have read and agree to the Terms and Conditions
          </label>
          <p className="text-gray-500 mt-1">
            I acknowledge that I am purchasing digital content and understand my{' '}
            <Link href="/withdrawal" className="text-primary underline">
              right of withdrawal
            </Link>
            . By checking this box, I agree to the{' '}
            <Link href="/terms" className="text-primary underline">
              terms of service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalConsent;