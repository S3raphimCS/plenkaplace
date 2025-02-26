import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
  value: number;
  max: number;
}

export const Rating = ({ value, max }: RatingProps) => {
  const fullStars = Math.floor(value);
  const halfStars = value % 1 !== 0 ? 1 : 0;
  const emptyStars = max - fullStars - halfStars;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500" />
        ))}

        {halfStars > 0 && <FaStarHalfAlt className="text-yellow-500" />}

        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={`empty-${index}`} className="text-gray-300" />
        ))}
      </div>

      <span className="text-sm text-gray-500">{value.toFixed(1)}</span>
    </div>
  );
};
