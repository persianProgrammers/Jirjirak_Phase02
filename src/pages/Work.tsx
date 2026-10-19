import { useGlobalStore } from '../stores/globalStore';

export default function Work() {
  const { currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  return (
    <div className="py-32 px-8 lg:px-16 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-6 text-brand-yellow">
        {isFa ? 'پروژه‌های ما' : 'Our Work'}
      </h1>
      <p className="text-brand-gray text-lg leading-relaxed">
        {isFa 
          ? 'مجموعه‌ای از ایده‌ها، همکاری‌ها و محصولاتی که ساخته‌ایم. هر پروژه دنیایی نو برای کاوش است.'
          : "A collection of ideas, collaborations and products we've built. Each project is a new world to explore."}
      </p>
    </div>
  );
}
