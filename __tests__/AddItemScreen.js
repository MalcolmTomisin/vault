import { render, fireEvent } from '@testing-library/react-native';
import AddItemScreen from "../src/screens/AddItemScreen";
import * as reactRedux from 'react-redux';
import GalleryIcon from '../src/components/Gallery';


test('submits valuables', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');


  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  useSelectorMock.mockReturnValue([]);
  let dummyDispatch = jest.fn();
  useDispatchMock.mockReturnValue(dummyDispatch);

    const {  getByTestId, getByText } = render(<AddItemScreen />);

    const nameInput = getByTestId('nameInput');
    const priceInput = getByTestId('priceInput');
    const imageView = getByText('random text mocking image');
    console.log('img', imageView);
    const submitBtn = getByTestId('submit-btn');

    fireEvent.changeText(nameInput, 'Scooby');
    fireEvent.changeText(priceInput, 'zzzz');

    expect(submitBtn).toBeDisabled();
    
})
