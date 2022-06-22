import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import Transaction from './Transaction';

const testData = {
  userid: "brayman",
  "date": "2022-06-06T00:00:00.000Z",
  "cardid": "2114b669-3ac9-4754-95af-b02cd3f7321d",
  "cost": "12",
  "payee": "Yammy",
  "tag": "shop",
  "type": "expense",
  "currency": "GEL",
  id: "756661b2-fd5e-4532-9c31-324b1b0bf7ff"
}

test('renders learn react link', async () => {
  render(
      <Transaction transaction={testData} />,{wrapper: MemoryRouter}
  );
  const element = screen.getByText(/shop/i);
  expect(element).toBeInTheDocument();
});
