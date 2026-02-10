// WhatsApp utility functions

export const WHATSAPP_NUMBER = "971567500586";

/**
 * Generate WhatsApp URL with a custom message
 */
export const getWhatsAppUrl = (message?: string) => {
  const defaultMessage = "Hello AIR WINGS TOUR & TRAVEL, I would like to know more about your travel packages.";
  const text = message || defaultMessage;
  const encodedMessage = encodeURIComponent(text);
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
};

/**
 * Generate WhatsApp URL for a specific package enquiry
 */
export const getWhatsAppPackageUrl = (packageTitle: string) => {
  const message = `Hello AIR WINGS TOUR & TRAVEL, I would like to know more about the "${packageTitle}" package.`;
  return getWhatsAppUrl(message);
};

/**
 * Open WhatsApp in a new window/tab
 */
export const openWhatsApp = (message?: string) => {
  window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
};
