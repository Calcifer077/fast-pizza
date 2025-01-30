import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import AppLayout from './ui/AppLayout';

// Below is a new way of implementing routing using react-router-dom which is different from the one that we have implemented in 'worldwise' application.
// Here, you define routes inside a array giving them path and the element to go to.
// You have to give array of objects.
const router = createBrowserRouter([
  {
    // 'AppLayout' is the parent of all the components in the application. It is called 'Layout route' in react-route-dom'
    element: <AppLayout />,

    // In case there is any type of error below component will run.
    // Why have we mentioned it in 'AppLayout'?
    // Any error that occurs anywhere inside the app will bubble up to the parent route which is 'AppLayout'
    errorElement: <Error />,

    // 'children' is used to define nested routes.
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        // Here, 'loader' is used to fetch data from a API. It will start fetching this data as soon as the page is started rendering.
        // It is different from 'useEffect' as it will fetch data on the start of render not after the page has been rendered like is done in 'useEffect'
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,

        // We have placed the 'errorElement' here so that it doesn't interfere with other ui styling.
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        // Whenever there is a form submission on the below route, 'action' mentioned will be called which will get access to the request made as a 'request' object.
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      // Everthing after ':' is a params.
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

/*
Fetching data using react-router-dom
1. First you create a Loader
2. You provide the loader
3. We provide the data to the page.
*/

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
