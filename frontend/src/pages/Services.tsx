import { useGlobalStore } from '../stores/globalStore';

export default function Services() {
  const { currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  return (
    <div className="py-32 px-8 lg:px-16 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-6 text-brand-yellow">
        {isFa ? 'خدمات ما' : 'Our Services'}
      </h1>
      <p className="text-brand-gray text-lg leading-relaxed">
        {isFa 
          ? 'از استراتژی تا اجرا، ما هویت دیجیتال مدرن می‌سازیم تا دیده شوید، ارتباط برقرار کنید و اثرگذار باشید.'
          : 'From strategy to execution, we create modern digital presence to reach, communicate and make an impact.'}
      </p>
    </div>
  );
}
