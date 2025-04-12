import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";

// This component simply redirects to the Material Viewer
export default function UnitDetailPage() {
  const [, params] = useRoute("/units/:unitId");
  const [, setLocation] = useLocation();
  const unitId = params?.unitId;
  
  // Redirect to the material viewer
  useEffect(() => {
    if (unitId) {
      setLocation(`/units/${unitId}/materials/0`);
    }
  }, [unitId, setLocation]);
  
  // Return loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-lg">Loading content viewer...</p>
      </div>
    </div>
  );
}