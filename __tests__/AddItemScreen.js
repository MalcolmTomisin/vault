import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddItemScreen from "../src/screens/AddItemScreen";
import * as reactRedux from 'react-redux';
import GalleryIcon from '../src/components/Gallery';


const createTestProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  ...props,
});

test('submits valuables', async () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  let props = createTestProps({});
  


  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  useSelectorMock.mockReturnValue([]);
  let dummyDispatch = jest.fn();
  useDispatchMock.mockReturnValue(dummyDispatch);

    const {  getByTestId, getByText } = render(<AddItemScreen {...props} />);

    const nameInput = getByTestId('nameInput');
    const priceInput = getByTestId('priceInput');
    const imageView = getByTestId('imageView');
    
    const submitBtn = getByTestId('submit-btn');
    

    fireEvent.changeText(nameInput, 'Scooby');
    fireEvent.changeText(priceInput, 'zzzz');

    fireEvent.press(submitBtn);

    expect(submitBtn).toBeDisabled();

    fireEvent.changeText(priceInput, '2000');

    fireEvent.press(submitBtn);

    expect(submitBtn).toBeEnabled();

    
})
