import { paths } from '@/lib/paths';
import { AdBanner } from './AdBanner';

export const ClubBanner: React.FC = () => {
  return (
    <AdBanner
      title={'Вступай в клуб Plenka Place'}
      badgeText={'Подробнее'}
      bgColor="#bf3a2b"
      imageSrc={'/grid/camera.png'}
      href={paths.club}
      mobileImageSrc={'/grid/camera.png'}
    />
  );
};
