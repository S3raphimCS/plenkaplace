'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/shared/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { CartItemModel } from '@/components/entity';
import { toast } from 'sonner';
import { ConfirmDeleteDialog } from '../../product';
import Link from 'next/link';

export const CartItemShort: React.FC<{ item: CartItemModel }> = ({ item }) => {
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
    if (item.product_type?.title === 'Фотоаппарат') {
      return;
    }
    dispatch(updateQuantity({ id: item.id!, quantity: item.quantity + 1 }));
    toast.success(`Количество товара "${item.title}" увеличено на 1`);
  };

  return (
    <div className="flex items-center justify-between border-b px-0 py-6">
      <div className="flex items-start gap-2.5">
        <div className="flex w-[316px] items-center gap-4">
          <div className="relative h-24 w-20">
            <Link href={item.slug!}>
              <Image
                src={item.images?.[0]?.image ?? '/product/default-product.png'}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </Link>
          </div>
          <div className="flex flex-1 items-start gap-4">
            <div className="flex w-[210px] flex-col items-start justify-center gap-2">
              <div className="self-stretch">
                <Link href={item.slug!}>{item.title} </Link>
              </div>
              <Button
                variant="ghost"
                className="flex h-auto items-center gap-1 p-0 hover:bg-transparent"
                size="sm"
                onClick={handleRemove}
              >
                <Trash2 className="h-6 w-6" />
                <span className="font-caption-1-semi">Удалить</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[328px] items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-auto p-0"
            size="sm"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-text-12px-semibold text-black-900 text-center">
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
      </div>

      <ConfirmDeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={confirmRemove}
      />
    </div>
  );
};
