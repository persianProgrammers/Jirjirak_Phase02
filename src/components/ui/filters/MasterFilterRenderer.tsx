import React from 'react';
import { BaseFilterProps } from './types';
import {
  Model01_SlidingCapsule,
  Model05_MagneticIsland,
  Model17_ArchivalIndexFolder,
} from './models/CuratedFilterModels';

export interface MasterFilterRendererProps<T extends string = string> extends BaseFilterProps<T> {
  modelId: string;
}

export function MasterFilterRenderer<T extends string = string>(props: MasterFilterRendererProps<T>) {
  const { modelId } = props;

  switch (modelId) {
    case 'model-01':
      return <Model01_SlidingCapsule {...props} />;
    case 'model-05':
      return <Model05_MagneticIsland {...props} />;
    case 'model-17':
      return <Model17_ArchivalIndexFolder {...props} />;
    default:
      return <Model01_SlidingCapsule {...props} />;
  }
}

export default MasterFilterRenderer;
