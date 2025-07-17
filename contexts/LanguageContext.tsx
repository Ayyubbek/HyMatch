import { createContext, ReactNode, useContext, useState } from "react";

type Language = "ja" | "en" | "uz";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, { [key: string]: string }> = {
  ja: {
    "app.title": "HyMatch",
    "app.subtitle": "理想のアルバイトを見つけよう",
    "tabs.jobs": "お仕事",
    "tabs.refused": "見送り",
    "tabs.chosen": "応募済み",
    "tabs.profile": "プロフィール",
    "tabs.settings": "設定",
    "contact.title": "お問い合わせ",
    "contact.phone": "電話",
    "contact.email": "メール",
    "profile.incomplete": "プロフィールが未完成です",
    "profile.complete": "プロフィールを完成させる",
    "filter.title": "フィルター",
    "filter.jobType": "職種",
    "filter.wage": "時給",
    "filter.japanese": "日本語レベル",
    "filter.workDays": "勤務日",
    "sort.wage": "時給順",
    "sort.commute": "通勤時間順",
    "sort.date": "投稿日順",
    "job.perDay": "1日あたり",
    "job.japaneseLevel": "日本語レベル:",
    "job.japaneseLevelShort": "JLPT",
    "job.commute": "通勤:",
    "job.location": "勤務地:",
    "job.availableDays": "勤務可能日",
    "job.refuse": "見送り",
    "job.choose": "応募",
    "job.delete": "削除",
    "days.Mon": "月",
    "days.Tue": "火",
    "days.Wed": "水",
    "days.Thu": "木",
    "days.Fri": "金",
    "days.Sat": "土",
    "days.Sun": "日",
    "chosen.empty": "まだ選択された仕事はありません。",
    "refused.empty": "まだ見送りにした仕事はありません。",
    "jobs.empty": "これ以上の仕事はありません。",
    // locations uchun misol:
    "locations.Shibuya, Tokyo": "渋谷、東京",
    "locations.Shinjuku, Tokyo": "新宿、東京",
    "locations.Harajuku, Tokyo": "原宿、東京",
    "locations.Ginza, Tokyo": "銀座、東京",
    "locations.Akihabara, Tokyo": "秋葉原、東京",
    "jobTitles.【Warehouse】Light Work": "【倉庫】軽作業",
    "jobTitles.【Restaurant】Kitchen Assistant":
      "【レストラン】キッチンアシスタント",
    "jobTitles.【Delivery】Food Delivery Driver":
      "【配達】フードデリバリードライバー",
    "jobTitles.【Office】Data Entry Clerk": "【オフィス】データ入力",
    "jobTitles.【Retail】Store Assistant": "【小売】店舗スタッフ",
    "jlpt.N1": "N1",
    "jlpt.N2": "N2",
    "jlpt.N3": "N3",
    "jlpt.N4": "N4",
    "jlpt.N5": "N5",
    "commute.45 minutes": "45分",
    "commute.30 minutes": "30分",
    "commute.20 minutes": "20分",
    "commute.35 minutes": "35分",
    "commute.25 minutes": "25分",
  },
  en: {
    "app.title": "HyMatch",
    "app.subtitle": "Find Your Perfect Part-Time Job",
    "tabs.jobs": "Jobs",
    "tabs.refused": "Refused",
    "tabs.chosen": "Chosen",
    "tabs.profile": "Profile",
    "tabs.settings": "Settings",
    "contact.title": "Contact Us",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "profile.incomplete": "Profile is incomplete",
    "profile.complete": "Complete Profile",
    "filter.title": "Filter",
    "filter.jobType": "Job Type",
    "filter.wage": "Wage",
    "filter.japanese": "Japanese Level",
    "filter.workDays": "Work Days",
    "sort.wage": "By Wage",
    "sort.commute": "By Commute",
    "sort.date": "By Date",
    "job.perDay": "per day",
    "job.japaneseLevel": "Japanese Level:",
    "job.japaneseLevelShort": "JLPT",
    "job.commute": "Commute:",
    "job.location": "Location:",
    "job.availableDays": "Available Days",
    "job.refuse": "Refuse",
    "job.choose": "Choose",
    "job.delete": "Delete",
    "days.Mon": "Mon",
    "days.Tue": "Tue",
    "days.Wed": "Wed",
    "days.Thu": "Thu",
    "days.Fri": "Fri",
    "days.Sat": "Sat",
    "days.Sun": "Sun",
    "chosen.empty": "No jobs have been chosen yet.",
    "refused.empty": "No jobs have been refused yet.",
    "jobs.empty": "No more jobs.",
    "locations.Shibuya, Tokyo": "Shibuya, Tokyo",
    "locations.Shinjuku, Tokyo": "Shinjuku, Tokyo",
    "locations.Harajuku, Tokyo": "Harajuku, Tokyo",
    "locations.Ginza, Tokyo": "Ginza, Tokyo",
    "locations.Akihabara, Tokyo": "Akihabara, Tokyo",
    "jobTitles.【Warehouse】Light Work": "【Warehouse】Light Work",
    "jobTitles.【Restaurant】Kitchen Assistant":
      "【Restaurant】Kitchen Assistant",
    "jobTitles.【Delivery】Food Delivery Driver":
      "【Delivery】Food Delivery Driver",
    "jobTitles.【Office】Data Entry Clerk": "【Office】Data Entry Clerk",
    "jobTitles.【Retail】Store Assistant": "【Retail】Store Assistant",
    "jlpt.N1": "N1",
    "jlpt.N2": "N2",
    "jlpt.N3": "N3",
    "jlpt.N4": "N4",
    "jlpt.N5": "N5",
    "commute.45 minutes": "45 minutes",
    "commute.30 minutes": "30 minutes",
    "commute.20 minutes": "20 minutes",
    "commute.35 minutes": "35 minutes",
    "commute.25 minutes": "25 minutes",
  },
  uz: {
    "app.title": "HyMatch",
    "app.subtitle": "Mukammal qisman ish topish",
    "tabs.jobs": "Ishlar",
    "tabs.refused": "Rad etilgan",
    "tabs.chosen": "Tanlangan",
    "tabs.profile": "Profil",
    "tabs.settings": "Sozlamalar",
    "contact.title": "Aloqa",
    "contact.phone": "Telefon",
    "contact.email": "Email",
    "profile.incomplete": "Profil to'liq emas",
    "profile.complete": "Profilni to'ldirish",
    "filter.title": "Filtr",
    "filter.jobType": "Ish turi",
    "filter.wage": "Maosh",
    "filter.japanese": "Yapon tili darajasi",
    "filter.workDays": "Ish kunlari",
    "sort.wage": "Maosh bo'yicha",
    "sort.commute": "Yo'l vaqti bo'yicha",
    "sort.date": "Sana bo'yicha",
    "job.perDay": "kuniga",
    "job.japaneseLevel": "Yapon tili darajasi:",
    "job.japaneseLevelShort": "JLPT",
    "job.commute": "Yoʻl vaqti:",
    "job.location": "Manzil:",
    "job.availableDays": "Ish kunlari",
    "job.refuse": "Rad etish",
    "job.choose": "Tanlash",
    "job.delete": "Oʻchirish",
    "days.Mon": "Du",
    "days.Tue": "Se",
    "days.Wed": "Chor",
    "days.Thu": "Pa",
    "days.Fri": "Ju",
    "days.Sat": "Sha",
    "days.Sun": "Ya",
    "chosen.empty": "Hali hech qanday ish tanlanmadi.",
    "refused.empty": "Hali hech qanday ish rad etilmadi.",
    "jobs.empty": "Boshqa ishlar yo‘q.",
    "locations.Shibuya, Tokyo": "Shibuya, Tokio",
    "locations.Shinjuku, Tokyo": "Shinjuku, Tokio",
    "locations.Harajuku, Tokyo": "Harajuku, Tokio",
    "locations.Ginza, Tokyo": "Ginza, Tokio",
    "locations.Akihabara, Tokyo": "Akihabara, Tokio",
    "jobTitles.【Warehouse】Light Work": "【Ombor】Yengil ish",
    "jobTitles.【Restaurant】Kitchen Assistant":
      "【Restoran】Oshxona yordamchisi",
    "jobTitles.【Delivery】Food Delivery Driver":
      "【Yetkazib berish】Oziq-ovqat yetkazuvchi",
    "jobTitles.【Office】Data Entry Clerk": "【Ofis】Maʼlumot kirituvchi",
    "jobTitles.【Retail】Store Assistant": "【Doʻkon】Doʻkon yordamchisi",
    "jlpt.N1": "N1",
    "jlpt.N2": "N2",
    "jlpt.N3": "N3",
    "jlpt.N4": "N4",
    "jlpt.N5": "N5",
    "commute.45 minutes": "45 daqiqa",
    "commute.30 minutes": "30 daqiqa",
    "commute.20 minutes": "20 daqiqa",
    "commute.35 minutes": "35 daqiqa",
    "commute.25 minutes": "25 daqiqa",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ja");

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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
