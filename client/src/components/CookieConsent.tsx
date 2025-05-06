import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has been given before
    const consentGiven = localStorage.getItem("cookieConsentGiven");
    if (!consentGiven) {
      // If not, show the cookie consent banner
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences") || "{}");
        setPreferences({
          ...preferences,
          ...savedPreferences,
        });
      } catch (e) {
        console.error("Failed to parse saved cookie preferences");
      }
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem("cookieConsentGiven", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setShowBanner(false);
    setOpen(false);
    
    toast({
      title: "Ustawienia plików cookie zapisane",
      description: "Twoje preferencje dotyczące plików cookie zostały zapisane.",
    });
  };

  const acceptAll = () => {
    const allEnabled = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allEnabled);
    localStorage.setItem("cookieConsentGiven", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(allEnabled));
    setShowBanner(false);
    
    toast({
      title: "Wszystkie pliki cookie zaakceptowane",
      description: "Wszystkie kategorie plików cookie zostały zaakceptowane.",
    });
  };

  const rejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem("cookieConsentGiven", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(essentialOnly));
    setShowBanner(false);
    
    toast({
      title: "Tylko niezbędne pliki cookie zaakceptowane",
      description: "Zaakceptowano tylko niezbędne pliki cookie.",
    });
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openSettings = () => {
    setOpen(true);
    setShowBanner(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-md">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
              <div>
                <h2 className="text-lg font-semibold mb-2">Szanujemy Twoją prywatność</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Używamy plików cookie, aby zapewnić najlepsze doświadczenia na naszej stronie, dostosować treści i reklamy oraz analizować ruch na stronie. Przeczytaj naszą{" "}
                  <Link href="/cookies" className="text-blue-600 hover:underline">
                    Politykę Cookies
                  </Link>{" "}
                  i{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Politykę Prywatności
                  </Link>, aby dowiedzieć się więcej.
                </p>
              </div>
              <div className="flex items-end justify-end gap-2 flex-wrap">
                <Button variant="outline" onClick={rejectNonEssential}>
                  Tylko niezbędne
                </Button>
                <Button variant="outline" onClick={openSettings}>
                  Ustawienia
                </Button>
                <Button onClick={acceptAll}>
                  Akceptuj wszystkie
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ustawienia plików cookie</DialogTitle>
            <DialogDescription>
              Wybierz, które rodzaje plików cookie chcesz zaakceptować. Twoja decyzja zostanie zapisana.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Alert>
              <AlertDescription>
                Niezbędne pliki cookie są zawsze włączone, ponieważ są konieczne, aby strona działała prawidłowo.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                />
                <Label htmlFor="necessary" className="text-sm font-medium">
                  Niezbędne pliki cookie
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="functional"
                  checked={preferences.functional}
                  onCheckedChange={() => handlePreferenceChange('functional')}
                />
                <Label htmlFor="functional" className="text-sm font-medium">
                  Funkcjonalne pliki cookie
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={() => handlePreferenceChange('analytics')}
                />
                <Label htmlFor="analytics" className="text-sm font-medium">
                  Analityczne pliki cookie
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={() => handlePreferenceChange('marketing')}
                />
                <Label htmlFor="marketing" className="text-sm font-medium">
                  Marketingowe pliki cookie
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={savePreferences}>
              Zapisz preferencje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;