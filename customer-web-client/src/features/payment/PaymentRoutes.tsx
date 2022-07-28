import { Route, Routes } from 'react-router-dom';

import { CheckoutFormManagement } from './pages/CheckoutFormManagement';
import { PaymentMethodListManagement } from './pages/PaymentMethodListManagement';

export function PaymentRoutes() {
  return (
    <Routes>
      <Route path="methods" element={<PaymentMethodListManagement />} />
      <Route path="checkout" element={<CheckoutFormManagement />} />
    </Routes>
  );
}
