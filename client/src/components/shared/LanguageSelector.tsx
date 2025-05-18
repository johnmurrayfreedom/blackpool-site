import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

// List of supported languages commonly spoken in Blackpool area
const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pl', name: 'Polski (Polish)', flag: '🇵🇱' },
  { code: 'ur', name: 'اردو (Urdu)', flag: '🇵🇰' },
  { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  { code: 'ro', name: 'Română (Romanian)', flag: '🇷🇴' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
  { code: 'pt', name: 'Português (Portuguese)', flag: '🇵🇹' },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  useEffect(() => {
    // Initialize Google Translate
    const addScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
      
      // Define the callback function
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      };
    };

    // Only initialize if not already initialized
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }

    // Clean up
    return () => {
      // No need for cleanup as the script persists until page reload
    };
  }, []);

  const changeLanguage = (language: Language) => {
    setSelectedLanguage(language);
    
    // Use cookie approach for translation
    if (language.code === 'en') {
      // If English, remove translation
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.reload();
      return;
    }
    
    // Set cookie for Google Translate
    document.cookie = `googtrans=/en/${language.code}`;
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 px-0 text-white hover:bg-primary-dark">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Switch language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((language) => (
            <DropdownMenuItem 
              key={language.code}
              onClick={() => changeLanguage(language)}
              className="cursor-pointer"
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// Add this to the window type
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}