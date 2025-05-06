import { useState, useEffect } from 'react';
import { X, Check, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CookieConsent() {
  // Define cookie consent state with three types of cookies
  const [consent, setConsent] = useState<{
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preference: boolean;
  }>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preference: false,
  });
  
  // State to control the visibility of the banner
  const [isVisible, setIsVisible] = useState(false);
  // State to control the open/closed state of the customization dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Check if user has already provided consent on component mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      // If no consent found, show the banner
      setIsVisible(true);
    } else {
      // If consent found, parse it and update state
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (e) {
        // If parsing fails, show the banner
        setIsVisible(true);
      }
    }
  }, []);
  
  // Function to save consent to localStorage
  const saveConsent = (newConsent: typeof consent) => {
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setIsVisible(false);
    setIsDialogOpen(false);
  };
  
  // Handler for accepting all cookies
  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preference: true,
    };
    saveConsent(allConsent);
  };
  
  // Handler for accepting only necessary cookies
  const handleAcceptNecessary = () => {
    const necessaryConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preference: false,
    };
    saveConsent(necessaryConsent);
  };
  
  // Handler for saving custom cookie preferences
  const handleSavePreferences = () => {
    saveConsent(consent);
  };
  
  // Handler for cookie preference changes
  const handleConsentChange = (type: keyof typeof consent) => {
    if (type === 'necessary') return; // Cannot toggle necessary cookies
    setConsent({ ...consent, [type]: !consent[type] });
  };
  
  // If banner is not visible, don't render anything
  if (!isVisible) {
    return null;
  }
  
  return (
    <>
      {/* Main Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Polityka ciasteczek (Cookies)</h3>
              <p className="mt-1 text-sm text-gray-500">
                Ta strona używa ciasteczek, aby zapewnić najlepsze doświadczenia. Możesz dostosować swoje preferencje lub zaakceptować wszystkie ciasteczka.{' '}
                <Link href="/cookies" className="underline text-blue-600 hover:text-blue-800">
                  Dowiedz się więcej
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
                className="whitespace-nowrap"
              >
                <Settings className="h-4 w-4 mr-2" />
                Dostosuj
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptNecessary}
                className="whitespace-nowrap"
              >
                Tylko niezbędne
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="whitespace-nowrap bg-blue-600 hover:bg-blue-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Akceptuję wszystkie
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cookie Preferences Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ustawienia ciasteczek</DialogTitle>
            <DialogDescription>
              Dostosuj swoje preferencje dotyczące ciasteczek. Ciasteczka niezbędne są zawsze włączone, ponieważ są konieczne do prawidłowego działania strony.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox id="necessary" checked disabled />
              <div>
                <Label htmlFor="necessary" className="font-medium text-gray-900">
                  Niezbędne ciasteczka
                </Label>
                <p className="text-sm text-gray-500">
                  Te ciasteczka są niezbędne do prawidłowego funkcjonowania strony i nie mogą być wyłączone.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="analytics"
                checked={consent.analytics}
                onCheckedChange={() => handleConsentChange('analytics')}
              />
              <div>
                <Label htmlFor="analytics" className="font-medium text-gray-900">
                  Ciasteczka analityczne
                </Label>
                <p className="text-sm text-gray-500">
                  Pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają z naszej strony.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="marketing"
                checked={consent.marketing}
                onCheckedChange={() => handleConsentChange('marketing')}
              />
              <div>
                <Label htmlFor="marketing" className="font-medium text-gray-900">
                  Ciasteczka marketingowe
                </Label>
                <p className="text-sm text-gray-500">
                  Używane do śledzenia odwiedzających na stronach internetowych w celu wyświetlania odpowiednich reklam.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="preference"
                checked={consent.preference}
                onCheckedChange={() => handleConsentChange('preference')}
              />
              <div>
                <Label htmlFor="preference" className="font-medium text-gray-900">
                  Ciasteczka preferencji
                </Label>
                <p className="text-sm text-gray-500">
                  Umożliwiają stronie zapamiętanie informacji, które zmieniają sposób, w jaki strona wygląda lub działa.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Anuluj
            </Button>
            <Button type="button" onClick={handleSavePreferences}>
              Zapisz preferencje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}