import Image from 'next/image';

interface MainBannerProps {
  imageSrc: string;
  altText?: string;
}

export const MainBanner: React.FC<MainBannerProps> = ({
  imageSrc,
  altText = 'Banner image',
}) => {
  return (
    <div className="relative h-[800px] w-full sm:h-[400px] md:h-[500px] xl:h-[650px]">
      <Image
        src={imageSrc}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

      <div className="absolute right-10 top-1/2 max-w-lg -translate-y-1/2 transform rounded-[20px] bg-[#bf3a2b]/10 p-10 backdrop-blur-[41px] sm:max-w-xs sm:p-6 md:max-w-md md:p-8">
        <h2 className="text-[45px] font-medium leading-none text-black sm:text-[28px] md:text-[36px]">
          Плёнка запоминает мелочи, даже когда мы всё забыли
        </h2>
        <p className="mt-4 text-lg font-medium text-black opacity-60 sm:text-base md:text-lg">
          Фотографии - наш способ остановить время, вернуть прошлое, сделать его
          осязаемым. Фотография - это не просто снимок, а точка откровения, наше
          напоминание о том, что было, и о тех, кто всегда рядом.
        </p>
      </div>
    </div>
  );
};
