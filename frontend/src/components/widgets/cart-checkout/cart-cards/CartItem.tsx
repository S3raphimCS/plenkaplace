'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/shared/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { CartItemModel, Price } from '@/components/entity';
import { toast } from 'sonner';
import { ConfirmDeleteDialog } from '../../product';
import Link from 'next/link';

export const CartItem: React.FC<{ item: CartItemModel }> = ({ item }) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemove = () => {
    setDialogOpen(true);
  };

  const confirmRemove = () => {
    dispatch(removeFromCart(item.id!));
    toast.success(`Товар "${item.title}" удален из корзины`);
    setDialogOpen(false);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id!, quantity: item.quantity - 1 }));
      toast.success(`Количество товара "${item.title}" уменьшено на 1`);
    } else {
      handleRemove();
    }
  };

  const handleIncrease = () => {
    if (item.product_type?.title === 'Фотоаппарат') return;
    dispatch(updateQuantity({ id: item.id!, quantity: item.quantity + 1 }));
    toast.success(`Количество товара "${item.title}" увеличено на 1`);
  };

  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 border-b py-4 sm:flex-row sm:items-center">
      <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
        <div className="relative h-24 w-20 flex-shrink-0">
          <Link href={item.slug!}>
            <Image
              src={item.images?.[0]?.image || '/product/default-product.png'}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <Link href={item.slug!} className="text-sm font-medium sm:text-base">
            {item.title}
          </Link>
          <Button
            variant="ghost"
            className="text-neutral-04100 flex h-auto items-center gap-1 p-0 text-xs hover:bg-transparent"
            size="sm"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Удалить</span>
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-between gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-4">
        <div className="flex h-8 min-w-[80px] items-center justify-between rounded border px-2">
          <Button
            variant="ghost"
            className="h-auto p-0"
            size="sm"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-center text-sm text-black">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            className="h-auto p-0"
            size="sm"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Price className="text-sm text-black sm:text-base">
          {Number(item.price)}
        </Price>
        <Price className="text-sm text-black sm:text-base">
          {Number(item.total)}
        </Price>
      </div>

      <ConfirmDeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={confirmRemove}
      />
    </div>
  );
};
