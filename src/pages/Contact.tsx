import { useGlobalStore } from '../stores/globalStore';

export default function Contact() {
  const { currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  return (
    <div className="py-32 px-8 lg:px-16 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-6 text-brand-yellow">
        {isFa ? 'تماس با ما' : 'Contact Us'}
      </h1>
      <p className="text-brand-gray text-lg leading-relaxed">
        {isFa 
          ? 'ایده، پروژه یا پیام خود را با ما در میان بگذارید. خوشحال می‌شویم صدایتان را بشنویم.'
          : "Tell us about your idea, project or just say hi. We'd love to hear from you."}
      </p>
    </div>
  );
}
