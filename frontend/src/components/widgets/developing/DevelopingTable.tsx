import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table';

interface ServiceTableProps {
  data: {
    type: 'service' | 'header';
    service?: string;
    resolution?: string;
    description?: string;
    price?: string;
    headerText?: string;
  }[];
  showResolution?: boolean;
  showDescription?: boolean;
}

export const DevelopingTable = ({
  data,
  showResolution = false,
  showDescription = false,
}: ServiceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Услуга</TableHead>
            {showResolution && <TableHead>Разрешение</TableHead>}
            {showDescription && <TableHead>Описание</TableHead>}
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {item.type === 'header' ? (
                <TableCell
                  colSpan={
                    showResolution
                      ? showDescription
                        ? 4
                        : 3
                      : showDescription
                        ? 3
                        : 2
                  }
                >
                  <strong className="text-2xl">{item.headerText}</strong>
                </TableCell>
              ) : (
                <>
                  <TableCell>{item.service}</TableCell>
                  {showResolution && <TableCell>{item.resolution}</TableCell>}
                  {showDescription && <TableCell>{item.description}</TableCell>}
                  <TableCell>
                    {item.price && (
                      <div className="flex flex-col">
                        <span>{item.price.split('EXPRESS')[0].trim()}</span>
                        {item.price.includes('EXPRESS') && (
                          <span className="text-red-500">
                            EXPRESS {item.price.split('EXPRESS')[1].trim()}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
