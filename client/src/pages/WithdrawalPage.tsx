import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const WithdrawalPage = () => {
  const [language, setLanguage] = useState<"pl" | "en">("pl"); // Default to Polish
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orderId: "",
    purchaseDate: "",
    reason: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would normally submit to an API endpoint for processing
    console.log("Withdrawal form submitted:", formData);
    
    toast({
      title: language === "pl" ? "Formularz wysłany" : "Form submitted",
      description: language === "pl" 
        ? "Twój formularz odstąpienia od umowy został wysłany. Skontaktujemy się z Tobą wkrótce."
        : "Your withdrawal form has been submitted. We will contact you shortly.",
    });
    
    // Reset the form
    setFormData({
      fullName: "",
      email: "",
      orderId: "",
      purchaseDate: "",
      reason: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>
          {language === "pl" ? "Prawo odstąpienia od umowy" : "Right of Withdrawal"} | Visual English
        </title>
        <meta 
          name="description" 
          content={language === "pl" 
            ? "Informacje o prawie odstąpienia od umowy w Visual English"
            : "Information about the right of withdrawal at Visual English"
          } 
        />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {language === "pl" ? "Prawo odstąpienia od umowy" : "Right of Withdrawal"}
        </h1>
        
        <div className="mb-6 flex justify-center">
          <Tabs value={language} onValueChange={(val) => setLanguage(val as "pl" | "en")}>
            <TabsList>
              <TabsTrigger value="pl">Polski</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {language === "pl" ? (
          <div className="prose prose-blue max-w-none">
            <h2>Informacje o prawie odstąpienia od umowy</h2>
            <p>Zgodnie z przepisami ustawy z dnia 30 maja 2014 r. o prawach konsumenta, masz prawo odstąpić od umowy zawartej na odległość w terminie 14 dni bez podawania przyczyny i bez ponoszenia kosztów.</p>
            
            <h3>Termin do odstąpienia od umowy</h3>
            <p>Termin 14-dniowy do odstąpienia od umowy rozpoczyna się:</p>
            <ul>
              <li>dla umowy o świadczenie usług - od dnia zawarcia umowy;</li>
              <li>dla umowy sprzedaży towaru - od dnia, w którym weszli Państwo w posiadanie rzeczy lub w którym osoba trzecia inna niż przewoźnik i wskazana przez Państwa weszła w posiadanie rzeczy;</li>
              <li>dla umowy obejmującej wiele rzeczy dostarczanych osobno - od dnia, w którym weszli Państwo w posiadanie ostatniej z rzeczy lub w którym osoba trzecia inna niż przewoźnik i wskazana przez Państwa weszła w posiadanie ostatniej z rzeczy.</li>
            </ul>
            
            <h3>Sposób odstąpienia od umowy</h3>
            <p>Aby skorzystać z prawa odstąpienia od umowy, należy poinformować nas o swojej decyzji o odstąpieniu od umowy w drodze jednoznacznego oświadczenia (na przykład pismo wysłane pocztą, faksem lub pocztą elektroniczną). Możesz skorzystać z formularza odstąpienia od umowy dostępnego poniżej, jednak nie jest to obowiązkowe.</p>
            
            <h3>Skutki odstąpienia od umowy</h3>
            <p>W przypadku odstąpienia od umowy zwracamy wszystkie otrzymane od Państwa płatności, w tym koszty dostarczenia rzeczy (z wyjątkiem dodatkowych kosztów wynikających z wybranego przez Państwa sposobu dostarczenia innego niż najtańszy zwykły sposób dostarczenia oferowany przez nas), niezwłocznie, a w każdym przypadku nie później niż 14 dni od dnia, w którym zostaliśmy poinformowani o Państwa decyzji o wykonaniu prawa odstąpienia od umowy.</p>
            <p>Zwrotu płatności dokonamy przy użyciu takich samych sposobów płatności, jakie zostały przez Państwa użyte w pierwotnej transakcji, chyba że wyraźnie zgodziliście się Państwo na inne rozwiązanie; w każdym przypadku nie poniosą Państwo żadnych opłat w związku z tym zwrotem.</p>
            
            <h3>Wyjątki od prawa odstąpienia od umowy</h3>
            <p>Prawo odstąpienia od umowy zawartej na odległość nie przysługuje konsumentowi w odniesieniu do umów:</p>
            <ul>
              <li>o świadczenie usług, jeżeli przedsiębiorca wykonał w pełni usługę za wyraźną zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po spełnieniu świadczenia przez przedsiębiorcę utraci prawo odstąpienia od umowy;</li>
              <li>w której przedmiotem świadczenia jest rzecz nieprefabrykowana, wyprodukowana według specyfikacji konsumenta lub służąca zaspokojeniu jego zindywidualizowanych potrzeb;</li>
              <li>w której przedmiotem świadczenia jest rzecz ulegająca szybkiemu zepsuciu lub mająca krótki termin przydatności do użycia;</li>
              <li>o dostarczanie treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez przedsiębiorcę o utracie prawa odstąpienia od umowy.</li>
            </ul>
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            <h2>Information about the Right of Withdrawal</h2>
            <p>In accordance with the provisions of the Consumer Rights Act of May 30, 2014, you have the right to withdraw from a distance contract within 14 days without giving any reason and without incurring any costs.</p>
            
            <h3>Withdrawal Period</h3>
            <p>The 14-day withdrawal period begins:</p>
            <ul>
              <li>for service contracts - from the day of conclusion of the contract;</li>
              <li>for sales contracts - from the day you came into possession of the goods or on which a third party other than the carrier and indicated by you came into possession of the goods;</li>
              <li>for contracts covering multiple goods delivered separately - from the day on which you came into possession of the last of the goods or on which a third party other than the carrier and indicated by you came into possession of the last of the goods.</li>
            </ul>
            
            <h3>How to Withdraw</h3>
            <p>To exercise your right of withdrawal, you must inform us of your decision to withdraw from the contract by means of an unambiguous statement (e.g., a letter sent by post, fax, or email). You may use the withdrawal form available below, but it is not obligatory.</p>
            
            <h3>Effects of Withdrawal</h3>
            <p>If you withdraw from this contract, we will reimburse all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract.</p>
            <p>We will carry out such reimbursement using the same means of payment as you used for the initial transaction unless you have expressly agreed otherwise; in any event, you will not incur any fees as a result of such reimbursement.</p>
            
            <h3>Exceptions to the Right of Withdrawal</h3>
            <p>The right of withdrawal from a distance contract does not apply to consumers in respect of contracts:</p>
            <ul>
              <li>for the provision of services if the trader has fully performed the service with the consumer's express consent, and the consumer acknowledged that they would lose the right of withdrawal once the contract had been fully performed by the trader;</li>
              <li>for the supply of goods made to the consumer's specifications or clearly personalized;</li>
              <li>for the supply of goods which are liable to deteriorate or expire rapidly;</li>
              <li>for the supply of digital content which is not supplied on a tangible medium if the performance has begun with the consumer's prior express consent and their acknowledgment that they thereby lose their right of withdrawal.</li>
            </ul>
          </div>
        )}
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {language === "pl" ? "Formularz odstąpienia od umowy" : "Withdrawal Form"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {language === "pl" ? "Imię i nazwisko" : "Full Name"}*
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === "pl" ? "Adres e-mail" : "Email Address"}*
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderId">
                  {language === "pl" ? "Numer zamówienia" : "Order ID"}*
                </Label>
                <Input
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">
                  {language === "pl" ? "Data zakupu" : "Purchase Date"}*
                </Label>
                <Input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">
                {language === "pl" ? "Powód odstąpienia (opcjonalnie)" : "Reason for Withdrawal (optional)"}
              </Label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full min-h-[100px] p-3 border rounded-md"
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full md:w-auto">
                {language === "pl" ? "Wyślij formularz" : "Submit Form"}
              </Button>
            </div>
          </form>
          
          <p className="mt-4 text-sm text-gray-600">
            {language === "pl" 
              ? "* Pola wymagane. Złożenie tego formularza rozpocznie proces odstąpienia od umowy zgodnie z obowiązującymi przepisami."
              : "* Required fields. Submitting this form will initiate the withdrawal process in accordance with applicable regulations."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;