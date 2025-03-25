'use client';

interface MapWrapperProps {
  children: React.ReactNode;
}

export const MapWrapper = ({ children }: MapWrapperProps) => {
  return <div className="z-0 h-[300px] w-full md:h-[600px]">{children}</div>;
};
