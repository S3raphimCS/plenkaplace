import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/shared/ui/toast';

type ToastType = ReturnType<typeof useToast>;

const handleToast = (
  toast: ToastType['toast'],
  type: 'Информация' | 'Предупреждение' | 'Успех' | 'Ошибка',
  message: string,
  actionText?: string,
  altText?: string,
  onClick?: () => void
) => {
  toast({
    title: type.charAt(0).toUpperCase() + type.slice(1) + '!',
    description: message,
    ...(actionText &&
      altText && {
        action: (
          <ToastAction altText={altText} onClick={onClick}>
            {actionText}
          </ToastAction>
        ),
      }),
  });
};

export const handleInfo = (
  toast: ToastType['toast'],
  message: string,
  actionText?: string,
  altText?: string,
  onClick?: () => void
) => {
  handleToast(toast, 'Информация', message, actionText, altText, onClick);
};

export const handleWarning = (
  toast: ToastType['toast'],
  message: string,
  actionText?: string,
  altText?: string,
  onClick?: () => void
) => {
  handleToast(toast, 'Предупреждение', message, actionText, altText, onClick);
};

export const handleSuccess = (
  toast: ToastType['toast'],
  message: string,
  actionText?: string,
  altText?: string,
  onClick?: () => void
) => {
  handleToast(toast, 'Успех', message, actionText, altText, onClick);
};

export const handleError = (
  toast: ToastType['toast'],
  message: string,
  actionText?: string,
  altText?: string,
  onClick?: () => void
) => {
  handleToast(toast, 'Ошибка', message, actionText, altText, onClick);
};
