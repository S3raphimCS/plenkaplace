import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/shared/ui/table';

interface DevelopingDescriptionBlockProps {
  title: string;
  items: { description: string; price?: string }[];
}

export const DevelopingDescriptionBlock = ({
  title,
  items,
}: DevelopingDescriptionBlockProps) => {
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <Table>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {item.price ? (
                <>
                  <TableCell className="w-3/4">{item.description}</TableCell>
                  <TableCell className="w-1/4 text-right">
                    {item.price || 'БЕСПЛАТНО'}
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={2} className="text-left">
                  {item.description}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
