import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadInitialData,
  setRegions,
  setCategories,
  loadRestaurants,
  setRestaurants,
  loadRestaurant,
  setRestaurant,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('actions', () => {
  let store;

  describe('loadInitialData', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadInitialData());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions([]));
      expect(actions[1]).toEqual(setCategories([]));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    context('without selectedRegion', () => {
      beforeEach(() => {
        store = mockStore({
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('without selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('loadRestaurant', () => {
    context('with selectedRestaurant', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRestaurant: {
            id: 6,
            categoryId: 1,
            name: '한국식 초밥',
            address: '서울 강남구',
            menuItems: [
              {
                id: 18,
                restaurantId: 6,
                name: '밥',
              },
            ],
          },
        });
      });

      it('runs setRestaurant', async () => {
        await store.dispatch(loadRestaurant());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurant([]));
      });
    });

    context('without selectedRestaurant', () => {
      beforeEach(() => {
        store = mockStore({
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurant());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });
});
