import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ja: {
    'app.title': 'HyMatch',
    'app.subtitle': '理想のアルバイトを見つけよう',
    'tabs.jobs': 'お仕事',
    'tabs.refused': '見送り',
    'tabs.chosen': '応募済み',
    'tabs.profile': 'プロフィール',
    'tabs.settings': '設定',
    'contact.title': 'お問い合わせ',
    'contact.phone': '電話',
    'contact.email': 'メール',
    'profile.incomplete': 'プロフィールが未完成です',
    'profile.complete': 'プロフィールを完成させる',
    'filter.title': 'フィルター',
    'filter.jobType': '職種',
    'filter.wage': '時給',
    'filter.japanese': '日本語レベル',
    'filter.workDays': '勤務日',
    'sort.wage': '時給順',
    'sort.commute': '通勤時間順',
    'sort.date': '投稿日順',
  },
  en: {
    'app.title': 'HyMatch',
    'app.subtitle': 'Find Your Perfect Part-Time Job',
    'tabs.jobs': 'Jobs',
    'tabs.refused': 'Refused',
    'tabs.chosen': 'Chosen',
    'tabs.profile': 'Profile',
    'tabs.settings': 'Settings',
    'contact.title': 'Contact Us',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'profile.incomplete': 'Profile is incomplete',
    'profile.complete': 'Complete Profile',
    'filter.title': 'Filter',
    'filter.jobType': 'Job Type',
    'filter.wage': 'Wage',
    'filter.japanese': 'Japanese Level',
    'filter.workDays': 'Work Days',
    'sort.wage': 'By Wage',
    'sort.commute': 'By Commute',
    'sort.date': 'By Date',
  },
  uz: {
    'app.title': 'HyMatch',
    'app.subtitle': 'Mukammal qisman ish topish',
    'tabs.jobs': 'Ishlar',
    'tabs.refused': 'Rad etilgan',
    'tabs.chosen': 'Tanlangan',
    'tabs.profile': 'Profil',
    'tabs.settings': 'Sozlamalar',
    'contact.title': 'Aloqa',
    'contact.phone': 'Telefon',
    'contact.email': 'Email',
    'profile.incomplete': 'Profil to\'liq emas',
    'profile.complete': 'Profilni to\'ldirish',
    'filter.title': 'Filtr',
    'filter.jobType': 'Ish turi',
    'filter.wage': 'Maosh',
    'filter.japanese': 'Yapon tili darajasi',
    'filter.workDays': 'Ish kunlari',
    'sort.wage': 'Maosh bo\'yicha',
    'sort.commute': 'Yo\'l vaqti bo\'yicha',
    'sort.date': 'Sana bo\'yicha',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}