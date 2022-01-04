import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetailPage from '.';
import { ACTION_TYPES } from '../../store/actions';

describe('RestaurantDetailPage', () => {
  const dispatch = jest.fn();

  useSelector.mockImplementation((selector) => selector({
    restaurant: {
      id: '1',
      name: 'Restaurant 1',
      address: 'Address 1',
      menu: [{ id: 1, name: '치즈돈까스' }],
    },
  }));

  useDispatch.mockImplementation(() => dispatch);

  it('loads restaurant\'s name, address and menu', () => {
    const { getByText } = render(<RestaurantDetailPage />);

    expect(dispatch).toBeCalled();

    expect(getByText('김밥천국')).toBeInTheDocument();
    expect(getByText('서울특별시 강남구 역삼동')).toBeInTheDocument();
    expect(getByText('치즈돈까스')).toBeInTheDocument();
  });
});
