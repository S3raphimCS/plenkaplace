'use client';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/shared/ui/card';

export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          '0'
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, '0'),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
          2,
          '0'
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const countdownData = [
    { value: timeLeft.days, label: 'Дни' },
    { value: timeLeft.hours, label: 'Часы' },
    { value: timeLeft.minutes, label: 'Минуты' },
    { value: timeLeft.seconds, label: 'Секунды' },
  ];

  return (
    <div className="flex gap-2 md:gap-4">
      {countdownData.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <Card className="h-[50px] w-[50px] md:h-[60px] md:w-[60px]">
            <CardContent className="flex items-center justify-center p-2.5 sm:p-2.5 md:p-2.5 lg:p-4 xl:p-4">
              <span className="text-center text-xl font-medium text-[#141718] md:text-[34px]">
                {item.value}
              </span>
            </CardContent>
          </Card>
          <span className="text-center text-xs font-normal text-[#eceaf1] md:text-sm">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
