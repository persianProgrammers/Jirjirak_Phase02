import React from 'react';

export interface FilterTabItem<T extends string = string> {
  id: T;
  labelEn: string;
  labelFa: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface BaseFilterProps<T extends string = string> {
  items: FilterTabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  isNight: boolean;
  isFa: boolean;
  isDarkBg: boolean;
  className?: string;
  layoutId?: string;
}

export interface FilterModelMeta {
  id: 'model-01' | 'model-05' | 'model-17';
  number: string;
  nameEn: string;
  nameFa: string;
  taglineEn: string;
  taglineFa: string;
  category: 'Architectural' | 'Kinetic' | 'Tactile';
}

export const FILTER_MODELS_CATALOG: FilterModelMeta[] = [
  {
    id: 'model-01',
    number: '01',
    nameEn: 'Sliding Capsule',
    nameFa: 'کپسول لغزان معماری',
    taglineEn: 'Fluid magnetic pill with smooth horizontal edge masks',
    taglineFa: 'کپسول مغناطیسی فلوئید با ماسک محو لبه‌ها و نشانگر متحرک',
    category: 'Architectural',
  },
  {
    id: 'model-05',
    number: '05',
    nameEn: 'Floating Island',
    nameFa: 'جزیره معلق داینامیک',
    taglineEn: 'Dynamic glass island with morphing backdrop aura',
    taglineFa: 'جزیره شیشه‌ای شناور با هاله نوری انعطاف‌پذیر و بلور پس‌زمینه',
    category: 'Kinetic',
  },
  {
    id: 'model-17',
    number: '17',
    nameEn: 'Archival Tab Folders',
    nameFa: 'پوشه‌های پرونده بایگانی',
    taglineEn: 'Layered index tabs that lift up like physical studio files',
    taglineFa: 'زبانه‌های پرونده استودیویی با بالا آمدن فیزیکی کارت فعال',
    category: 'Tactile',
  },
];
